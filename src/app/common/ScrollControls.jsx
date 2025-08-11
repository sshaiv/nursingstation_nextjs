import React, { useState, useEffect } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function ScrollToggleButton({ containerRef, className = "" }) {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    if (!containerRef?.current) return;

    const onScroll = () => {
      setAtTop(containerRef.current.scrollTop === 0);
    };

    const el = containerRef.current;
    el.addEventListener("scroll", onScroll);

    // Set initial position state
    setAtTop(el.scrollTop === 0);

    return () => el.removeEventListener("scroll", onScroll);
  }, [containerRef]);

  const handleClick = () => {
    if (!containerRef?.current) return;

    if (atTop) {
      // Scroll to bottom
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // Scroll to top
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={atTop ? "Scroll to bottom" : "Scroll to top"}
      className={`p-2 rounded bg-gray-200 hover:bg-gray-300 transition ${className}`}
    >
      {atTop ? <FaArrowDown size={20} /> : <FaArrowUp size={20} />}
    </button>
  );
}
