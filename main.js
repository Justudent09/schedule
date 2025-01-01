const swup = new Swup({
    cache: false
});

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    document.body.appendChild(script);
}

function unloadCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('auth.html')) {
        if (typeof unloadAuthAnimation === 'function') {
            unloadAuthAnimation();
        }
    } else {
        if (typeof unloadBannerAnimation === 'function') {
            unloadBannerAnimation();
        }
    }
}

function initializePage() {
    const path = window.location.pathname;
    if (path.includes('auth.html')) {
        if (typeof initAuth === 'undefined') {
            loadScript('auth.js', () => {
                if (typeof initAuth === 'function') {
                    initAuth();
                }
            });
        } else {
            initAuth();
        }
    } else {
        if (typeof initBanner === 'undefined') {
            loadScript('banner.js', () => {
                if (typeof initBanner === 'function') {
                    initBanner();
                }
            });
        } else {
            initBanner();
        }
    }
}

swup.hooks.before('content:replace', () => {
    unloadCurrentPage();
});

swup.hooks.on('page:view', () => {
    initializePage();
});

document.addEventListener('DOMContentLoaded', initializePage);