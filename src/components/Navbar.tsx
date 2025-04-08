
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, BookOpen, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    // Scroll to search section if on homepage
    if (window.location.pathname === '/') {
      const searchSection = document.querySelector('#search-section');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page search section
      window.location.href = '/#search-section';
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-background/90 backdrop-blur-md border-b shadow-sm"
          : "py-4 bg-transparent"
      } ${theme === 'dark' ? 'dark:border-slate-800' : ''}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 transition-transform hover:scale-[1.02]"
          >
            <BookOpen className="h-6 w-6 text-accent" />
            <span className="text-xl font-serif font-medium">
              भारत का संविधान
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              to="/preamble"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Preamble
            </Link>
            <Link
              to="/articles"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Articles
            </Link>
            <Link
              to="/amendments"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              Amendments
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-accent transition-colors"
            >
              About
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2">
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleSearchToggle}>
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 pt-24 space-y-6 h-full">
          <Link
            to="/"
            className="text-lg font-medium hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/preamble"
            className="text-lg font-medium hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Preamble
          </Link>
          <Link
            to="/articles"
            className="text-lg font-medium hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Articles
          </Link>
          <Link
            to="/amendments"
            className="text-lg font-medium hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Amendments
          </Link>
          <Link
            to="/about"
            className="text-lg font-medium hover:text-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
