import { NavLink } from "react-router-dom";
import { Film, Home, UploadCloud, Sparkles } from "lucide-react";

const Layout = ({ children }) => {
  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="brand-row">
          <div className="brand-mark">
            <Film size={24} />
          </div>
          <div className="brand-copy">
            <span className="brand-eyebrow">Socially Approved</span>
            <h1>Video Carousel Hub</h1>
          </div>
        </div>

        <nav className="site-nav" aria-label="Primary navigation">
          <NavLink to="/" end>
            <Home size={16} /> Home
          </NavLink>
          {/* <NavLink to="/upload">
            <UploadCloud size={16} /> Upload
          </NavLink> */}
          {/* <NavLink to="/video/featured">
            <Sparkles size={16} /> Discover
          </NavLink> */}
        </nav>
      </header>

      <main className="page-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-brand">
          <div className="brand-mark footer-mark">
            <Film size={18} />
          </div>
          <div>
            <p className="footer-title">Socially Approved</p>
            <p className="footer-copy">Modern video discovery, curated for social sharing and performance.</p>
          </div>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="/upload">Upload</a>
          <a href="/video/featured">Trending</a>
        </div>

        <p className="footer-note">© 2026 Socially Approved. Built for modern, performant video experiences.</p>
      </footer>
    </div>
  );
};

export default Layout;
