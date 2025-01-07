// Create and append the header element
const header = document.createElement('div');
header.id = 'header'; // Assign an ID to the header element
document.body.appendChild(header); // Add the header to the top of the body

// List of background images
const backgrounds = [
    'https://m.media-amazon.com/images/I/7130x7c9NmL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/81KkrQWEHIL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/71VcGrxQRBL._SX3000_.jpg',
    'https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg',
];

// Initialize current background index
let current_index = 0;

// Function to change background smoothly
function change_background() {
  current_index = (current_index + 1) % backgrounds.length; // Increment index and loop back to start
  header.style.transition = 'background-image 1s ease-in-out'; // Add transition for smooth effect
  header.style.backgroundImage = `url('${backgrounds[current_index]}')`;
}

// Call change_background every 5 seconds
setInterval(change_background, 6000);

// Call change_background immediately to set the first background
change_background();

// Create and append a style element for the header styles
let header_style = document.createElement('style');
header_style.textContent = `
/* Header styles */

#header {
  background-size: cover;
  background-position: center;
  height: 100vh;
  color: rgb(255, 247, 247);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  position: relative;
  background-repeat: no-repeat;
}


#header h1, #header p {
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

#header h1 {
  font-size: 3rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
}

#header p {
  font-size: 1.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin-bottom: 2rem;
}

#header form {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  margin-top: 1rem;
}

#header form input {
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 5px 0 0 5px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgb(14, 13, 13);
  transition: border-color 0.3s ease;
}

#header form input:focus {
  border-color: white;
}

#header form button {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: #351c4d;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#header form button:hover {
  background-color: #9a87c9;
}
`;
document.head.appendChild(header_style);
