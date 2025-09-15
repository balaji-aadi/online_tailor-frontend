import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 font-inter">
      <div className="max-w-md w-full text-center bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-elegant border border-border animate-scale-in">
        {/* Decorative elements */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-gold rounded-full mx-auto flex items-center justify-center shadow-gold">
            <svg
              className="w-20 h-20 text-gold-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Floating particles */}
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary/20 animate-bounce"></div>
          <div
            className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-secondary/30 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="absolute -top-4 right-4 w-3 h-3 rounded-full bg-gold-primary/40 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        <h1 className="text-6xl font-bold mb-2 text-primary">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Page Not Found
        </h2>

        <p className="text-muted-foreground mb-6">
          Oops! The page you're looking for doesn't exist. You tried to access{" "}
          <code className="bg-muted px-2 py-1 rounded-md text-sm">
            "{location.pathname}"
          </code>
          which couldn't be found.
        </p>

        <a
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover transition-all duration-300 shadow-soft hover:shadow-elegant"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Return to Homepage
        </a>
      </div>
    </div>
  );
};

export default NotFound;
