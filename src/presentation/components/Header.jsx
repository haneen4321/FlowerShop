import "./Layout.css";

export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="header__logo">
        <span className="logo-highlight">Flower</span> Shop
      </div>

      {/* Navigation */}
      <nav className="header__nav">
        <a href="/">Home</a>
        <a href="/shop">Shop</a>
        <a href="/blog">Blog</a>
        <a href="/about">About</a>
      </nav>

      {/* Actions */}
      <div className="header__actions">
        <button className="icon-button" title="Account">
          👤
        </button>
        <button className="icon-button" title="Cart">
          🛒
        </button>
      </div>
    </header>
  );
}