import { useEffect } from 'react';

export const useSecurityProtection = () => {
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

    // Disable text selection and drag
    const disableSelection = () => {
      document.onselectstart = () => false;
      document.ondragstart = () => false;
    };

    // Note: Do NOT override console methods to avoid hiding real errors


    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    
    // Apply protections
    disableSelection();


    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { isBlocked: false }; // Never block the site, just prevent actions
};