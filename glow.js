// Mouse follow glow effect - desktop only
document.addEventListener('DOMContentLoaded', function() {
  // Only create mouse glow on desktop screens
  if (window.innerWidth > 768) {
    // Create the mouse glow element
    const mouseGlow = document.createElement('div');
    mouseGlow.className = 'mouse-glow';
    document.body.appendChild(mouseGlow);
    
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    
    // Track mouse position
    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    // Smooth animation using requestAnimationFrame
    function animateGlow() {
      // Smooth interpolation for trailing effect
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      
      // Position the glow element (using transform for better performance)
      mouseGlow.style.left = glowX + 'px';
      mouseGlow.style.top = glowY + 'px';
      
      requestAnimationFrame(animateGlow);
    }
    
    // Start the animation
    animateGlow();
    
    // Handle window resize
    window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
        mouseGlow.style.display = 'none';
      } else {
        mouseGlow.style.display = 'block';
      }
    });
    
    // Show the glow after a brief delay
    setTimeout(() => {
      mouseGlow.style.opacity = '1';
    }, 100);
  }
}); 