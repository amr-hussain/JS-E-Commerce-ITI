
/////////////////////////////////footer
// Footer Logo Section

const footerLogo = document.getElementById('footer-logo');
const logoImg = document.createElement('img');
logoImg.src = '../header image/logo.webp';
logoImg.alt = 'Logo';
logoImg.style.height = '60px';
logoImg.style.marginBottom = '15px';
logoImg.style.borderRadius = '10px';
footerLogo.appendChild(logoImg);

const logoText = document.createElement('p');
logoText.textContent = 'Your one-stop shop for amazing products.';
logoText.style.fontSize = '14px';
logoText.style.color = '#dcdde1';
footerLogo.appendChild(logoText);

// Footer Links Section
const footerLinks = document.getElementById('footer-links');

const linksHeading = document.createElement('h4');
linksHeading.textContent = 'Quick Links';
linksHeading.style.fontSize = '18px';
linksHeading.style.marginBottom = '15px';
linksHeading.style.color = '#ecf0f1';
footerLinks.appendChild(linksHeading);

const ul = document.createElement('ul');

const links = [
  { text: "Men's Clothing", href: "#cat1" },
  { text: "Jewelery", href: "#cat2" },
  { text: "Electronics", href: "#cat3" },
  { text: "Women's Clothing", href: "#cat4" }
];

links.forEach(link => {
  const li = document.createElement('li');
  li.style.margin = '10px 0';

  const a = document.createElement('a');
  a.href = link.href;
  a.textContent = link.text;
  a.style.color = '#f39c12';
  a.style.textDecoration = 'none';
  a.style.transition = 'color 0.3s ease';
  
  a.addEventListener('mouseover', () => {
    a.style.color = '#f1c40f';
    a.style.textDecoration = 'underline';
  });
  
  a.addEventListener('mouseout', () => {
    a.style.color = '#f39c12';
    a.style.textDecoration = 'none';
  });

  li.appendChild(a);
  ul.appendChild(li);
});

footerLinks.appendChild(ul);

// Footer Contact Section
const footerContact = document.getElementById('footer-contact');

const contactHeading = document.createElement('h4');
contactHeading.textContent = 'Contact Us';
contactHeading.style.fontSize = '18px';
contactHeading.style.marginBottom = '15px';
contactHeading.style.color = '#ecf0f1';
footerContact.appendChild(contactHeading);

const email = document.createElement('p');
email.textContent = 'Email: support@example.com';
email.style.margin = '5px 0';
email.style.color = '#dcdde1';
footerContact.appendChild(email);

const phone = document.createElement('p');
phone.textContent = 'Phone: +1 234 567 890';
phone.style.margin = '5px 0';
phone.style.color = '#dcdde1';
footerContact.appendChild(phone);

const address = document.createElement('p');
address.textContent = 'Address: 123 Main Street, Cairo, Egypt';
address.style.margin = '5px 0';
address.style.color = '#dcdde1';
footerContact.appendChild(address);

// Footer Social Media Section
const footerSocial = document.getElementById('footer-social');

const socialHeading = document.createElement('h4');
socialHeading.textContent = 'Follow Us';
socialHeading.style.fontSize = '18px';
socialHeading.style.marginBottom = '15px';
socialHeading.style.color = '#ecf0f1';
footerSocial.appendChild(socialHeading);

const socialLinks = [
  { href: '#', iconSrc: '../footer image/facebook.png', alt: 'Facebook' },
  { href: '#', iconSrc: '../footer image/twitter.webp', alt: 'Twitter' },
  { href: '#', iconSrc: '../footer image/insta.png', alt: 'Instagram' },
  { href: '#', iconSrc: '../footer image/linkedin.png', alt: 'LinkedIn' }
];

socialLinks.forEach(link => {
  const a = document.createElement('a');
  a.href = link.href;
  a.style.marginRight = '10px';

  const img = document.createElement('img');
  img.src = link.iconSrc;
  img.alt = link.alt;
  img.style.width = '40px';
  img.style.height = '40px';
  img.style.objectFit = 'cover';

  a.appendChild(img);
  footerSocial.appendChild(a);
});


