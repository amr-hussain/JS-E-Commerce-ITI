//////////////////////////header
// List of background images
const backgrounds = [
    `../header image/Landing page.webp`,  
    `../header image/3.jpg`,
    `../header image/4.jpg`,
    `../header image/6.jpg `
  ];
  
  
  const header = document.getElementById('header');
  
  // Initialize current background index
  let currentIndex = 0;
  
  // Function to change background smoothly
  function changeBackground() {
    currentIndex = (currentIndex + 1) % backgrounds.length; // Increment index and loop back to start
    header.style.transition = 'background-image 1s ease-in-out'; // Add transition for smooth effect
    header.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
  }
  
  // Call changeBackground every 5 seconds
  setInterval(changeBackground, 5000);
  
  // Call changeBackground immediately to set the first background
  changeBackground();
  
  