import React from "react";

const Footer = () => {
  return (
    <div className="footer-section">
      <div
        className="d-flex flex-column align-items-center"
        style={{ gap: "10px" }}
      >
        <span style={{ fontWeight: 500, fontSize: "16px" }}>
          You can also find as at
        </span>
        <div className="d-flex social-media-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img src="/assets/images/facebook.svg" alt="facebook" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img src="/assets/images/instagram.svg" alt="instagram" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            <img src="/assets/images/linkedin.svg" alt="linkedin" />
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer">
            <img src="/assets/images/pinterest.svg" alt="pinterest" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
            <img src="/assets/images/twitter.svg" alt="twitter" />
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <img src="/assets/images/youtube.svg" alt="youtube" />
          </a>
        </div>
        <span>@2023 Gujarat India, All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
