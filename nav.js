document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.menu-toggle');
  const sideMenu = document.getElementById('sideMenu');
  const closeMenu = document.getElementById('closeMenu');
  const overlay = document.getElementById('menuOverlay');
  const mobileProjectsToggle = document.getElementById('mobileProjectsToggle');
  const mobileProjectsDropdown = document.getElementById('mobileProjectsDropdown');

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
    
    // Close mobile dropdown when closing side menu
    if (mobileProjectsDropdown) {
      mobileProjectsDropdown.classList.remove('open');
    }
  }
  function toggleMobileProjectsDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (mobileProjectsDropdown) {
      mobileProjectsDropdown.classList.toggle('open');
    }
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
  // Mobile Projects dropdown toggle
  if (mobileProjectsToggle) {
    mobileProjectsToggle.addEventListener('click', toggleMobileProjectsDropdown);
  }
  // Close menu when clicking a direct link in the side menu (but not dropdown toggle)
  if (sideMenu) {
    sideMenu.querySelectorAll('a').forEach(link => {
      // Don't close menu when clicking the Projects toggle
      if (link.id !== 'mobileProjectsToggle') {
        link.addEventListener('click', closeSideMenu);
      }
    });
  }
  // Close dropdown when clicking outside of it within the side menu
  if (sideMenu) {
    sideMenu.addEventListener('click', function(e) {
      if (mobileProjectsDropdown && 
          !mobileProjectsDropdown.contains(e.target) && 
          mobileProjectsDropdown.classList.contains('open')) {
        mobileProjectsDropdown.classList.remove('open');
      }
    });
  }
}); 