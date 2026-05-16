// Product Page Bridge: enables backend-driven product details via ?id=...
(function(){
    const API_BASE = 'http://localhost:3000/api';
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    
    // Enhanced error handling and retry mechanism
    const API_CONFIG = {
        retries: 3,
        retryDelay: 1000,
        timeout: 10000
    };

    // Enhanced fetch with retry logic
    async function fetchWithRetry(url, options = {}, retries = API_CONFIG.retries) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
            
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return response;
        } catch (error) {
            if (retries > 0 && (error.name === 'AbortError' || error.message.includes('Failed to fetch'))) {
                await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
                return fetchWithRetry(url, options, retries - 1);
            }
            throw error;
        }
    }

    // Enhanced API call wrapper
    async function apiCall(endpoint, options = {}) {
        try {
            const token = localStorage.getItem('token');
            if (token && !options.headers) {
                options.headers = { 'Authorization': `Bearer ${token}` };
            }
            
            const response = await fetchWithRetry(`${API_BASE}${endpoint}`, options);
            return await response.json();
        } catch (error) {
            console.error(`API call failed for ${endpoint}:`, error);
            throw error;
        }
    }

    if (!productId) return; // use the static content if no id provided

    const formatINR = (n) => `₹${Number(n||0).toLocaleString()}`;

    const toast = (msg, type = 'info') => {
        const t = document.createElement('div');
        t.className = `toast toast-${type}`;
        t.textContent = msg;
        t.style.cssText = `
            position: fixed; 
            right: 20px; 
            top: 20px; 
            background: linear-gradient(135deg, var(--va-primary), var(--va-primary-2));
            color: #0b1220; 
            padding: 12px 16px; 
            border-radius: 10px; 
            font-weight: 700; 
            box-shadow: 0 12px 30px rgba(0,0,0,.3);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(t);
        setTimeout(() => {
            t.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => t.remove(), 300);
        }, 3000);
    };

    const addLocal = (product) => {
        try {
            const cart = JSON.parse(localStorage.getItem('va_cart')||'[]');
            const i = cart.findIndex(x => x.productId === product._id);
            if (i > -1) cart[i].quantity += 1; 
            else cart.push({ productId: product._id, quantity: 1, product });
            localStorage.setItem('va_cart', JSON.stringify(cart));
            toast('Added to cart', 'success');
        } catch (error) {
            console.error('Failed to add to local cart:', error);
            toast('Failed to add to cart', 'error');
        }
    };

    const wireButtons = (product) => {
        const addBtn = document.getElementById('addCart');
        const buyBtn = document.getElementById('buyNow');
        
        if (!addBtn || !buyBtn) {
            console.warn('Required buttons not found:', { addBtn: !!addBtn, buyBtn: !!buyBtn });
            return;
        }
        
        // Add loading states
        addBtn.addEventListener('click', async () => {
            // Add loading state
            addBtn.classList.add('loading');
            addBtn.textContent = 'Adding...';
            
            try {
                const token = localStorage.getItem('token');
                if (!token) { 
                    addLocal(product); 
                    return; 
                }
                
                const result = await apiCall('/cart/add', {
                    method: 'POST',
                    headers: { 'Content-Type':'application/json' },
                    body: JSON.stringify({ productId: product._id, quantity: 1 })
                });
                
                if (result.cart) {
                    toast('Added to cart', 'success');
                } else {
                    addLocal(product);
                }
            } catch (error) {
                console.warn('Backend cart add failed, using local storage:', error);
                addLocal(product);
            } finally {
                // Remove loading state
                addBtn.classList.remove('loading');
                addBtn.textContent = 'ADD TO CART';
            }
        });
        
        buyBtn.addEventListener('click', () => { 
            addBtn.click(); 
            toast('Proceed to checkout from cart', 'info'); 
        });
    };

    // Load product data from backend
    const loadProduct = async () => {
        try {
            const product = await apiCall(`/products/${encodeURIComponent(productId)}`);
            updateProductDisplay(product);
            wireButtons(product);
        } catch (error) {
            console.warn('Failed to load product from backend:', error);
            // Fallback to static content
        }
    };

    const updateProductDisplay = (product) => {
        // Update title
        const titleEl = document.querySelector('.pro-right h4');
        if (titleEl) titleEl.textContent = product.name;
        
        // Update image
        const imgEl = document.querySelector('.pro-left img');
        if (imgEl) imgEl.src = product.image;
        
        // Update pricing list if present
        const list = document.querySelector('.pro-right ul');
        if (list) {
            const lis = Array.from(list.querySelectorAll('li'));
            if (lis[0]) lis[0].textContent = `Deal Price: ${formatINR(product.price)}`;
            if (lis[1]) lis[1].textContent = `Offer Price: ${formatINR(Math.round(product.price*1.05))}`;
            if (lis[2]) lis[2].textContent = `MRP: ${formatINR(product.originalPrice)} (Inclusive of all taxes)`;
            if (lis[3]) lis[3].textContent = `You Save: ${Math.max(0, Math.round(((product.originalPrice||product.price)-product.price)/(product.originalPrice||product.price)*100))}%`;
            if (lis[4]) lis[4].textContent = `EMIs from ${formatINR(Math.max(1, Math.round(product.price/20)))} / month · FREE Shipping!`;
        }
    };

    // Add CSS animations for toast
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .toast-success {
            background: linear-gradient(135deg, #10b981, #059669) !important;
        }
        .toast-error {
            background: linear-gradient(135deg, #ef4444, #dc2626) !important;
        }
        .toast-warning {
            background: linear-gradient(135deg, #f59e0b, #d97706) !important;
        }
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    // Initialize
    loadProduct();
})();






                });

                if (res.ok) toast('Added to cart'); else addLocal(product);

            } catch { addLocal(product); }

        };

        buyBtn.onclick = () => { addBtn.click(); toast('Proceed to checkout from cart'); };

    };



    fetch(`${API_BASE}/products/${encodeURIComponent(productId)}`)

        .then(r => r.ok ? r.json() : Promise.reject())

        .then(product => {

            // Update title

            const titleEl = document.querySelector('.pro-right h4');

            if (titleEl) titleEl.textContent = product.name;

            // Update image

            const imgEl = document.querySelector('.pro-left img');

            if (imgEl) imgEl.src = product.image;

            // Update pricing list if present

            const list = document.querySelector('.pro-right ul');

            if (list) {

                const lis = Array.from(list.querySelectorAll('li'));

                if (lis[0]) lis[0].textContent = `Deal Price: ${formatINR(product.price)}`;

                if (lis[1]) lis[1].textContent = `Offer Price: ${formatINR(Math.round(product.price*1.05))}`;

                if (lis[2]) lis[2].textContent = `MRP: ${formatINR(product.originalPrice)} (Inclusive of all taxes)`;

                if (lis[3]) lis[3].textContent = `You Save: ${Math.max(0, Math.round(((product.originalPrice||product.price)-product.price)/(product.originalPrice||product.price)*100))}%`;

                if (lis[4]) lis[4].textContent = `EMIs from ${formatINR(Math.max(1, Math.round(product.price/20)))} / month · FREE Shipping!`;

            }

            wireButtons(product);

        })

        .catch(()=>{});

})();












                });

                if (res.ok) toast('Added to cart'); else addLocal(product);

            } catch { addLocal(product); }

        };

        buyBtn.onclick = () => { addBtn.click(); toast('Proceed to checkout from cart'); };

    };



    fetch(`${API_BASE}/products/${encodeURIComponent(productId)}`)

        .then(r => r.ok ? r.json() : Promise.reject())

        .then(product => {

            // Update title

            const titleEl = document.querySelector('.pro-right h4');

            if (titleEl) titleEl.textContent = product.name;

            // Update image

            const imgEl = document.querySelector('.pro-left img');

            if (imgEl) imgEl.src = product.image;

            // Update pricing list if present

            const list = document.querySelector('.pro-right ul');

            if (list) {

                const lis = Array.from(list.querySelectorAll('li'));

                if (lis[0]) lis[0].textContent = `Deal Price: ${formatINR(product.price)}`;

                if (lis[1]) lis[1].textContent = `Offer Price: ${formatINR(Math.round(product.price*1.05))}`;

                if (lis[2]) lis[2].textContent = `MRP: ${formatINR(product.originalPrice)} (Inclusive of all taxes)`;

                if (lis[3]) lis[3].textContent = `You Save: ${Math.max(0, Math.round(((product.originalPrice||product.price)-product.price)/(product.originalPrice||product.price)*100))}%`;

                if (lis[4]) lis[4].textContent = `EMIs from ${formatINR(Math.max(1, Math.round(product.price/20)))} / month · FREE Shipping!`;

            }

            wireButtons(product);

        })

        .catch(()=>{});

})();










