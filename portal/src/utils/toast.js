// Simple toast utility: showToast(message, type = 'error', duration = 4000)
export function showToast(message, type = 'error', duration = 4000) {
  if (!message) return;

  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toast.style.opacity = 0;

  container.appendChild(toast);

  // Fade in
  requestAnimationFrame(() => {
    toast.classList.add('visible');
    toast.style.transition = 'opacity 320ms cubic-bezier(.4,0,.2,1)';
    toast.style.opacity = 1;
  });

  const remove = () => {
    // Fade out
    toast.style.opacity = 0;
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    toast.classList.remove('visible');
  };

  setTimeout(remove, duration);
  toast.addEventListener('click', remove);
  return toast;
}

export default showToast;
