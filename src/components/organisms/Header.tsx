import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Film } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);

  const controlHeader = useCallback(() => {
    const currentScrollY = window.scrollY;
    const headerHeight = headerRef.current?.offsetHeight || 0;
    const isShowing =
      currentScrollY <= 0 ||
      currentScrollY < lastScrollY.current ||
      currentScrollY <= headerHeight;
    if (isVisible !== isShowing) {
      setIsVisible(isShowing);
    }

    lastScrollY.current = currentScrollY;
    ticking.current = false;
  }, [isVisible]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          controlHeader();
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [controlHeader]);

  const handleGoBack = () => {
    const navigationStack = window.history.state?.idx || 0;
    if (navigationStack === 0) {
      navigate("/");
    } else {
      navigate(-1);
    }
  };

  const showBackButton = location.pathname !== "/";

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 w-full bg-gray-900 shadow-md z-[50] transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto px-4 max-w-[1400px]">
        <div className="flex gap-4 h-16 items-center">
          {showBackButton && (
            <button onClick={handleGoBack} className="p-2">
              <ArrowLeft size={24} className="text-white" />
            </button>
          )}
          <a className="flex items-center cursor-pointer" href="/">
            <Film className="h-8 w-8 text-blue-500" />
            <span className="ml-2 text-xl font-bold text-white">MovieHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
