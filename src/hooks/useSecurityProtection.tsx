import { useEffect, useState } from 'react';

export const useSecurityProtection = () => {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable specific key combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) // Ctrl+Shift+C
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Detect DevTools opening
    const detectDevTools = () => {
      const threshold = 160;
      
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        setIsDevToolsOpen(true);
        setIsBlocked(true);
        document.body.innerHTML = `
          <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #1a1a1a;
            color: #ff4444;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            font-family: monospace;
            font-size: 24px;
            text-align: center;
          ">
            <div>
              <h1>Access Denied</h1>
              <p>Developer tools are not allowed on this platform.</p>
              <p>Please close developer tools and refresh the page.</p>
            </div>
          </div>
        `;
      }
    };

    // Check for common extension patterns
    const detectExtensions = () => {
      // Check for common extension DOM modifications
      const suspiciousElements = document.querySelectorAll([
        '[id*="extension"]',
        '[class*="extension"]',
        '[id*="chrome-extension"]',
        '[class*="chrome-extension"]'
      ].join(','));

      if (suspiciousElements.length > 0) {
        setIsBlocked(true);
      }
    };

    // Disable text selection and drag
    const disableSelection = () => {
      document.onselectstart = () => false;
      document.ondragstart = () => false;
    };

    // Monitor console usage
    const detectConsoleUsage = () => {
      const originalConsole = window.console;
      window.console = {
        ...originalConsole,
        log: () => {
          setIsBlocked(true);
        },
        warn: () => {
          setIsBlocked(true);
        },
        error: () => {
          setIsBlocked(true);
        }
      };
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', detectDevTools);
    
    // Initial checks
    disableSelection();
    detectExtensions();
    detectConsoleUsage();
    
    // Periodic checks
    const interval = setInterval(() => {
      detectDevTools();
      detectExtensions();
    }, 500);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', detectDevTools);
      clearInterval(interval);
    };
  }, []);

  return { isDevToolsOpen, isBlocked };
};