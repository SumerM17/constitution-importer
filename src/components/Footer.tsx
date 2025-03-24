
import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-india-saffron" />
              <span className="text-xl font-serif font-medium">
                भारत का संविधान
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              A digital archive preserving and presenting the Constitution of India, making it accessible to all citizens.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/preamble" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Preamble
                  </Link>
                </li>
                <li>
                  <Link to="/articles" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Articles
                  </Link>
                </li>
                <li>
                  <Link to="/amendments" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Amendments
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Learning Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Historical Context
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Constitutional Assembly
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Founding Fathers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-india-saffron text-sm transition-colors">
                    Bibliography
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Subscribe to Updates</h3>
            <p className="text-muted-foreground text-sm">
              Stay informed about new features and educational content.
            </p>
            <form className="mt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-2">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Constitution of India Digital Archive. All rights reserved.
          </p>
          <p className="mt-1">
            The content on this site is in the public domain.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
