// Create footer element
let footer = document.createElement("footer");
footer.className = "footer-content";


// Footer Container
let footer_container = document.createElement("div");
footer_container.className = "footer-container";

// Logo Section
let footer_logo = document.createElement("div");
footer_logo.id = "footer-logo";

// Navigation Links
let footer_links = document.createElement("div");
footer_links.id = "footer-links";

// Contact Information
let contact_info = document.createElement("div");
contact_info.id = "contact-info";

// Social Media Links
let footer_social = document.createElement("div");
footer_social.id = "footer-social";

// Append sections to the container
footer_container.appendChild(footer_logo);
footer_container.appendChild(footer_links);
footer_container.appendChild(contact_info);
footer_container.appendChild(footer_social);

// Footer Bottom Section
let footer_bottom = document.createElement("div");
footer_bottom.className = "footer-bottom";
footer_bottom.innerHTML = `<p>&copy; 2025 Online Shop. All Rights Reserved.</p>`;

// Append container and bottom to footer
footer.appendChild(footer_container);
footer.appendChild(footer_bottom);

// Logo Section Content
const logo_img = document.createElement("img");
logo_img.src = "../header image/logo.webp";
logo_img.alt = "Logo";
logo_img.className = "logo-img";
footer_logo.appendChild(logo_img);

const logo_text = document.createElement("p");
logo_text.textContent = "Your one-stop shop for amazing products.";
logo_text.className = "logo-text";
footer_logo.appendChild(logo_text);

// Links Section Content
const links_heading = document.createElement("h4");
links_heading.textContent = "Quick Links";
links_heading.className = "links-heading";
footer_links.appendChild(links_heading);

const ul = document.createElement("ul");
const links = [
  { text: "Men's Clothing", href: "#cat1" },
  { text: "Jewelery", href: "#cat2" },
  { text: "Electronics", href: "#cat3" },
  { text: "Women's Clothing", href: "#cat4" },
];
links.forEach((link) => {
  const li = document.createElement("li");
  li.className = "footer-link-item";

  const a = document.createElement("a");
  a.href = link.href;
  a.textContent = link.text;
  a.className = "footer-link";

  li.appendChild(a);
  ul.appendChild(li);
});
footer_links.appendChild(ul);

// Contact Section Content
const contact_heading = document.createElement("h4");
contact_heading.textContent = "Contact Us";
contact_heading.className = "contact-heading";
contact_info.appendChild(contact_heading);

const contact_details = [
  { text: "Email: support@example.com" },
  { text: "Phone: +1 234 567 890" },
  { text: "Address: 123 Main Street, Cairo, Egypt" },
];
contact_details.forEach((detail) => {
  const p = document.createElement("p");
  p.textContent = detail.text;
  p.className = "contact-detail";
  contact_info.appendChild(p);
});

// Social Media Section Content
const social_heading = document.createElement("h4");
social_heading.textContent = "Follow Us";
social_heading.className = "social-heading";
footer_social.appendChild(social_heading);

const social_links = [
  { href: "#", icon_src: "../footer image/facebook.png", alt: "Facebook" },
  { href: "#", icon_src: "../footer image/twitter.webp", alt: "Twitter" },
  { href: "#", icon_src: "../footer image/insta.png", alt: "Instagram" },
  { href: "#", icon_src: "../footer image/linkedin.png", alt: "LinkedIn" },
];
social_links.forEach((link) => {
  const a = document.createElement("a");
  a.href = link.href;
  a.className = "social-link";

  const img = document.createElement("img");
  img.src = link.icon_src;
  img.alt = link.alt;
  img.className = "social-icon";
  a.appendChild(img);

  footer_social.appendChild(a);
});

// Append footer to the body
document.body.appendChild(footer);

// Style Footer
const footer_style = document.createElement("style");
footer_style.textContent = `
.footer-content {
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  color: #fff;
  padding: 40px 0;
  font-size: 15px;
}
.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  gap: 20px;
}
.footer-bottom {
  text-align: center;
  margin-top: 30px;
  border-top: 1px solid #7f8c8d;
  padding-top: 20px;
  font-size: 14px;
}
.footer-bottom p {
  margin: 0;
  color: #dcdde1;
}
.logo-img {
  height: 60px;
  margin-bottom: 15px;
  border-radius: 10px;
}
.logo-text {
  font-size: 14px;
  color: #dcdde1;
}
.links-heading {
  font-size: 18px;
  margin-bottom: 15px;
  color: #ecf0f1;
}
.footer-link-item {
  margin: 10px 0;
}
.footer-link {
  color: #f39c12;
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-link:hover {
  color: #f1c40f;
  text-decoration: underline;
}
.contact-heading {
  font-size: 18px;
  margin-bottom: 15px;
  color: #ecf0f1;
}
.contact-detail {
  margin: 5px 0;
  color: #dcdde1;
}
.social-heading {
  font-size: 18px;
  margin-bottom: 15px;
  color: #ecf0f1;
}
.social-link {
  margin-right: 10px;
}
.social-icon {
  width: 40px;
  height: 40px;
  object-fit: cover;
}
`;
document.head.appendChild(footer_style);
