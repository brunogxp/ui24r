// Service Worker registration and PWA functionality
let deferredPrompt;
let isConnected = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after a short delay
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
    
    // Load saved IP address
    const savedIP = localStorage.getItem('ui24r_ip');
    if (savedIP) {
        document.getElementById('ipAddress').value = savedIP;
    }
    
    // Load saved port
    const savedPort = localStorage.getItem('ui24r_port');
    if (savedPort) {
        document.getElementById('port').value = savedPort;
    }
    
    // Auto-connect if we have saved settings
    if (savedIP) {
        setTimeout(() => {
            connectToMixer();
        }, 2000);
    }
    
    // Register service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
    
    // Handle install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallPrompt();
    });
    
    // Handle app installed
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        hideInstallPrompt();
    });
    
    // Handle touch events for control bar
    let touchStartY = 0;
    let controlBarVisible = false;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchmove', (e) => {
        const touchY = e.touches[0].clientY;
        const deltaY = touchY - touchStartY;
        
        // Show control bar when swiping down from top
        if (touchStartY < 50 && deltaY > 30 && !controlBarVisible) {
            showControlBar();
        }
        // Hide control bar when swiping up
        else if (deltaY < -30 && controlBarVisible) {
            hideControlBar();
        }
    });
    
    // Auto-hide control bar after 3 seconds
    let controlBarTimeout;
    function showControlBar() {
        const controlBar = document.getElementById('controlBar');
        controlBar.classList.add('visible');
        controlBarVisible = true;
        
        clearTimeout(controlBarTimeout);
        controlBarTimeout = setTimeout(() => {
            hideControlBar();
        }, 3000);
    }
    
    function hideControlBar() {
        const controlBar = document.getElementById('controlBar');
        controlBar.classList.remove('visible');
        controlBarVisible = false;
        clearTimeout(controlBarTimeout);
    }
    
    // Make functions globally available
    window.showControlBar = showControlBar;
    window.hideControlBar = hideControlBar;
});

// Connect to the mixer
function connectToMixer() {
    const ipAddress = document.getElementById('ipAddress').value.trim();
    const port = document.getElementById('port').value.trim();
    
    if (!ipAddress) {
        alert('Por favor, insira o endereço IP da mesa de som.');
        return;
    }
    
    // Validate IP address format
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ipAddress)) {
        alert('Por favor, insira um endereço IP válido (ex: 192.168.4.132).');
        return;
    }
    
    // Save settings
    localStorage.setItem('ui24r_ip', ipAddress);
    if (port) {
        localStorage.setItem('ui24r_port', port);
    }
    
    // Build URL
    let url = `http://${ipAddress}`;
    if (port && port !== '80') {
        url += `:${port}`;
    }
    
    // Show webview container
    document.getElementById('configPanel').style.display = 'none';
    document.getElementById('webviewContainer').classList.add('active');
    
    // Load the mixer interface
    const webview = document.getElementById('webview');
    webview.src = url;
    
    // Update status
    updateConnectionStatus('Conectando...', false);
    
    // Monitor connection
    webview.onload = function() {
        updateConnectionStatus('Conectado', true);
        isConnected = true;
        
        // Try to enter fullscreen after successful connection
        setTimeout(() => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.log('Fullscreen request failed:', err);
                });
            }
        }, 1000);
    };
    
    webview.onerror = function() {
        updateConnectionStatus('Erro de Conexão', false);
        isConnected = false;
    };
}

// Update connection status
function updateConnectionStatus(text, connected) {
    const statusText = document.getElementById('statusText');
    const statusDot = document.getElementById('statusDot');
    
    statusText.textContent = text;
    
    if (connected) {
        statusDot.classList.add('connected');
    } else {
        statusDot.classList.remove('connected');
    }
}

// Refresh the mixer interface
function refreshMixer() {
    const webview = document.getElementById('webview');
    if (webview.src && webview.src !== 'about:blank') {
        webview.src = webview.src;
        updateConnectionStatus('Recarregando...', false);
    }
}

// Toggle fullscreen mode
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Show configuration panel
function showConfig() {
    document.getElementById('webviewContainer').classList.remove('active');
    document.getElementById('configPanel').style.display = 'block';
    
    // Exit fullscreen when showing config
    if (document.fullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// Install app functionality
function showInstallPrompt() {
    // Only show if not already installed
    if (!window.matchMedia('(display-mode: standalone)').matches) {
        setTimeout(() => {
            document.getElementById('installPrompt').classList.add('show');
        }, 5000); // Show after 5 seconds
    }
}

function hideInstallPrompt() {
    document.getElementById('installPrompt').classList.remove('show');
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
            hideInstallPrompt();
        });
    }
}

function dismissInstall() {
    hideInstallPrompt();
    // Don't show again for this session
    sessionStorage.setItem('installDismissed', 'true');
}

// Handle orientation changes
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Refresh the webview to handle orientation change
        if (isConnected) {
            const webview = document.getElementById('webview');
            if (webview.src && webview.src !== 'about:blank') {
                webview.style.height = window.innerHeight + 'px';
            }
        }
    }, 500);
});

// Handle back button on Android
window.addEventListener('popstate', function(event) {
    if (document.getElementById('webviewContainer').classList.contains('active')) {
        event.preventDefault();
        showConfig();
    }
});

// Prevent zoom on double tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Handle keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // F11 for fullscreen
    if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
    }
    
    // Escape to show config
    if (event.key === 'Escape' && document.getElementById('webviewContainer').classList.contains('active')) {
        showConfig();
    }
    
    // F5 to refresh
    if (event.key === 'F5') {
        event.preventDefault();
        refreshMixer();
    }
});

