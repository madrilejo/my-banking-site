/**
 * ==========================================================================
 * HIGH-PERFORMANCE SCROLL ANIMATION MANAGER
 * ==========================================================================
 * 
 * This uses the modern browser API: "IntersectionObserver". 
 * Rather than listening to every pixel change of a scroll wheel (which slows down modern screens), 
 * it leverages native browser background threads to inform us when elements intersect the viewport.
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Configure the thresholds for triggering animations
  const observerOptions = {
    root: null,          // Use the main viewport window as the scanning container box
    threshold: 0.15      // Fire the function the exact millisecond 15% of the target element enters the screen
  };

  // 2. Define what happens when monitored objects cross into view
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      
      // Check if item is intersecting the active viewport frame
      if (entry.isIntersecting) {
        
        // Inject the active CSS class layout to begin our visual fade/slide-up transition
        entry.target.classList.add("is-visible");
        
        // Optimization: Once the object is fully visible, remove tracking completely 
        // to free up standard memory cycles for the user's browser.
        observer.unobserve(entry.target); 
      }
    });
  }, observerOptions);

  // 3. Collect elements stamped with the 'reveal' token and assign them to the background track engine
  const hiddenElements = document.querySelectorAll(".reveal");
  
  // Hand each element down directly to our intersection detector setup
  hiddenElements.forEach(element => observer.observe(element));
});


/**
 * ==========================================================================
 * MINI LANDING PROMO POPUP LOGIC
 * ==========================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("promoPopup");
  const closeBtn = document.getElementById("closePopupBtn");

  // 1. Wait 3 seconds (3000ms) after load, then display the popup smoothly
  setTimeout(() => {
    if (popup) {
      popup.classList.add("show-popup");
    }
  }, 3000);

  // 2. Hide the popup immediately when clicking the close (X) button
  if (closeBtn && popup) {
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("show-popup");
    });

    // 3. Optional: Hide the popup if the user clicks anywhere on the dark overlay background
    popup.addEventListener("click", (event) => {
      if (event.target === popup) {
        popup.classList.remove("show-popup");
      }
    });
  }
});
