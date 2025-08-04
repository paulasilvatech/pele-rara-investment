import React from 'react';

export function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p className="footer-text">Nossa pele é nossa história</p>
        <p className="footer-motto">Celebramos cada marca</p>
        <div className="contact-info">
          <p>
            <a href="mailto:contato@pelerara.com.br">contato@pelerara.com.br</a> | +55 31 9 9994-0277
          </p>
          <p>
            <a href="https://pelerara.com.br" target="_blank" rel="noopener noreferrer">
              www.pelerara.com.br
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}