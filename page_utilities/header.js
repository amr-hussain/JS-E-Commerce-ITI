// Create and append the header element
const header = document.createElement('div');
header.id = 'header'; // Assign an ID to the header element
document.body.appendChild(header); // Add the header to the top of the body

// Create a child div inside the header
const imageContainer = document.createElement('div');
imageContainer.id = 'image-container';
header.appendChild(imageContainer); 

// Create an img element for the background image
const headerImage = document.createElement('img');
headerImage.id = 'header-image';
headerImage.alt = 'Header Background'; // Optional: for accessibility
imageContainer.appendChild(headerImage);

// List of background images
const backgrounds = [
    'https://m.media-amazon.com/images/I/7130x7c9NmL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71VcGrxQRBL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg',
    "https://m.media-amazon.com/images/I/71jvQBBGUeL._SX3000_.jpg",
    'https://m.media-amazon.com/images/I/71DQMiLiGZL._SX3000_.jpg',
];

// Initialize current background index
let current_index = 0;

// Function to change background smoothly
function change_background() {
  current_index = (current_index + 1) % backgrounds.length; 
  headerImage.style.transition = 'opacity 1s ease-in-out';
  headerImage.style.opacity = 0; // Fade out
  setTimeout(() => {
    headerImage.src = backgrounds[current_index];
    headerImage.style.opacity = 1; // Fade in
  }, 700);
}

// Call change_background every 6 seconds
setInterval(change_background, 5000);

// Call change_background immediately to set the first background
headerImage.src = backgrounds[current_index];

// Create and append a style element for the header styles
let header_style = document.createElement('style');
header_style.textContent = `
#header {
  padding-top: 100px;
  position: relative;
  width: 100%;
  height: 40vh; /* Dynamically adjust height to 60% of viewport */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

#image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

#header-image {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  object-position: top; 
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1; /* Push the image behind any content in the header */
  opacity: 1;
  transition: opacity 1s ease-in-out;
}

#header::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(230, 173, 173, 0.2), rgba(70, 41, 41, 0.2));
  z-index: 0;
}
`;
document.head.appendChild(header_style);
