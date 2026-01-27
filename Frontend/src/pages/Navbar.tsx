import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ShieldIcon from "../components/Common/ShieldIcon";
import "./Navbar.css";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="navbar-inner">
                {/* Logo */}
                <div className="navbar-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <div className={`logo-icon ${scrolled ? "scrolled" : ""}`}>
                        <ShieldIcon size={20} />
                    </div>
                    <span className="logo-text">Shield</span>
                </div>

                {/* Links */}
                <div className="navbar-links-container">
                    <a href="#features" className="nav-link">Features</a>
                    <a href="#docs" className="nav-link">Docs</a>
                </div>

                {/* Actions */}
                <div className="navbar-actions">
                    <Link to="/login" className="nav-link-btn">Sign In</Link>
                    <Link to="/signup" className={`nav-primary-btn ${scrolled ? "scrolled" : ""}`}>
                        Get Started
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

