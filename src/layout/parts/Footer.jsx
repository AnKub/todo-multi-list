import React from "react";
import "../../styles/layoutStyle/footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">LOGOM</div>
      <div className="footer-columns">
        <div className="footer-column">
          <h4>About Us</h4>
          <ul>
            <li>Our Story</li>
            <li>Team</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Resources</h4>
          <ul>
            <li>Help Center</li>
            <li>Community</li>
            <li>FAQ</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Follow Us</h4>
          <ul>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
