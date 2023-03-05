import React from "react";
import "./index.scss";
import twitterLogo from "./../../Pictures/twitter.png";
import facebookLogo from "./../../Pictures/facebook.png";
import instagramLogo from "./../../Pictures/instagram.png";
import youtubeLogo from "./../../Pictures/youtube.png";
import flag from "./../../Pictures/nationalFlag.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-container-left">
          <span className="follow-text"> Follow us on: </span>
          <div className="footer-logos-container">
            <div className="footer-container-logo">
              <a href="https://www.twitter.com/">
                <img src={twitterLogo} alt="Twitter Logo" className="logo" />
              </a>
            </div>
            <div className="footer-container-logo">
              <a href="https://www.facebook.com/">
                <img src={facebookLogo} alt="Facebook Logo" className="logo" />
              </a>
            </div>
            <div className="footer-container-logo">
              <a href="https://www.instagram.com/">
                <img
                  src={instagramLogo}
                  alt="Instagram Logo"
                  className="logo"
                />
              </a>
            </div>
            <div className="footer-container-logo">
              <a href="https://www.youtube.com/">
                <img src={youtubeLogo} alt="Youtube Logo" className="logo" />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-container-center">
          <div className="footer-container-flag">
            <img src={flag} alt="National Flag" className="flag" />
          </div>
        </div>
        <div className="footer-container-right">
          <div className="footer-container-right-links">
            <a
              className="footer-link"
              href="https://en.wikipedia.org/wiki/Veyshnoria"
            >
              About Veyshnoria
            </a>
            <a
              className="footer-link"
              href="https://en.wikipedia.org/wiki/Veyshnoria"
            >
              Contact Us
            </a>
            <a
              className="footer-link"
              href="https://en.wikipedia.org/wiki/Veyshnoria"
            >
              Privacy Policy
            </a>
            <a
              className="footer-link"
              href="https://en.wikipedia.org/wiki/Veyshnoria"
            >
              Terms of Use
            </a>
            <a
              className="footer-link"
              href="https://en.wikipedia.org/wiki/Veyshnoria"
            >
              {" "}
              Legal basis
            </a>
            <a
              className="footer-link"
              href="https://en.wikipedia.org/wiki/Veyshnoria"
            >
              FAQ
            </a>
          </div>
        </div>
      </div>
      <p className="copyright-text">
        Copyright© 2023 The government of Veyshnoria. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
