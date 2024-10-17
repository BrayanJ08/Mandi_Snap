import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import "../components.css/footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <p>
            <a href="/faq">FAQ</a>
          </p>
          <p>
            <a href="/payment-options">Opciones de pago</a>
          </p>
          <p>
            <a href="/privacy-policy">Politica de privacidad</a>
          </p>
          <p>
            <a href="/about-us">Sobre nosotros</a>
          </p>
        </div>
        <div className="social-icons">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} color="white" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} color="white" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 MANDI SNAP. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
