document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.getElementById('sideMenu');
  const closeMenu = document.getElementById('closeMenu');
  const overlay = document.getElementById('menuOverlay');

  function openMenu() {
    if (sideMenu) {
      sideMenu.style.display = 'flex';
      sideMenu.classList.add('open');
    }
    if (overlay) {
      overlay.classList.add('open');
    }
    document.body.style.overflow = 'hidden';
  }
  function closeSideMenu() {
    if (sideMenu) {
      sideMenu.classList.remove('open');
      // Add a small delay to allow the transition to complete before hiding
      setTimeout(() => {
        if (!sideMenu.classList.contains('open')) {
          sideMenu.style.display = 'none';
        }
      }, 300);
    }
    if (overlay) {
      overlay.classList.remove('open');
    }
    document.body.style.overflow = '';
  }
  if (menuToggle) {
    menuToggle.addEventListener('click', openMenu);
  }
  if (closeMenu) {
    closeMenu.addEventListener('click', closeSideMenu);
  }
  if (overlay) {
    overlay.addEventListener('click', closeSideMenu);
  }
  // Close menu when clicking a link in the side menu
  if (sideMenu) {
    sideMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeSideMenu);
    });
  }
}); 