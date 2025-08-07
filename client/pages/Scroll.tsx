// src/pages/ScrollToTop.tsx
import { useLocation } from "react-router-dom";
import { useLayoutEffect, useState } from "react";

export default function ScrollToTop({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    // Immediately scroll to the top with no animation
    window.scrollTo(0, 0);
    setShow(true);

    return () => {
      setShow(false); // Hide previous page before route change
    };
  }, [pathname]);

  return show ? <>{children}</> : null;
}
