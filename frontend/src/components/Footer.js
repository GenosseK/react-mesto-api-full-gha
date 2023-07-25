import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__author">&#169; {currentYear} Алексей К.</p>
    </footer>
  );
}

export default Footer;
