import "./Layout.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Flower Shop</h3>
        <p>
          We believe flowers can make every moment special.
        </p>
      </div>

      <div className="footer-section">
        <h4>Pages</h4>
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/about">About</a>
      </div>

      <div className="footer-section">
        <h4>Contact</h4>
        <p>Email: support@flowershop.com</p>
        <p>Phone: +966 555 123 456</p>
      </div>
    </footer>
  );
}

export default Footer;