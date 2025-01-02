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
    } else if (path.includes('schedule.html')) {
        if (typeof initSchedule === 'undefined') {
            loadScript('schedule.js', () => {
                if (typeof initSchedule === 'function') {
                    initSchedule();
                }
            });
        } else {
            initSchedule();
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