// glossy-toast.js

// Default configuration for Glossy Toast notifications
export const DEFAULT_TOAST_OPTIONS = {
    position: 'bottom-right',
    type: 'info',
    duration: 5000,
    width: 'normal'
};

// Available position options
export const ToastPosition = {
    BottomRight: 'bottom-right',
    BottomLeft: 'bottom-left',
    TopRight: 'top-right',
    TopLeft: 'top-left',
    BottomCenter: 'bottom-center',
    TopCenter: 'top-center'
};

// Available toast types
export const ToastType = {
    Info: 'info',
    Error: 'error',
    Success: 'success'
};

// Available width options
export const ToastWidth = {
    Normal: 'normal',
    Wide: 'wide',
    ExtraWide: 'extra-wide'
};

/**
 * Displays a glossy toast notification with customizable options
 * @param {string} message - The message to display in the toast
 * @param {Object} [options] - Optional configuration
 * @param {string} [options.position] - Position of toast (see ToastPosition)
 * @param {string} [options.type] - Type of toast (see ToastType)
 * @param {number} [options.duration] - Duration in milliseconds
 * @param {string} [options.width] - Width of toast (see ToastWidth)
 */
export function ShowGlossyToast(message, options = {}) {
    const { position, type, duration, width } = { ...DEFAULT_TOAST_OPTIONS, ...options };

    const toast = document.createElement("div");
    toast.className = `glossy-toast ${type} ${width}`;
    toast.textContent = message;

    const containerId = `glossy-toast-container-${position}`;
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement("div");
        container.id = containerId;
        container.className = `glossy-toast-container ${position}`;
        document.body.appendChild(container);
    }

    container.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);

    let timeoutId;
    let remaining = duration;
    let startTime = Date.now();

    const startTimer = () => {
        timeoutId = setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 300);
        }, remaining);
    };

    const pauseTimer = () => {
        clearTimeout(timeoutId);
        const elapsed = Date.now() - startTime;
        remaining -= elapsed;
    };

    toast.addEventListener("mouseenter", pauseTimer);
    toast.addEventListener("mouseleave", () => {
        startTime = Date.now();
        startTimer();
    });

    toast.addEventListener("click", () => {
        clearTimeout(timeoutId);
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    });

    startTimer();
}