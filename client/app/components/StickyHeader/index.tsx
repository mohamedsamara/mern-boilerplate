import React, { useEffect, useRef, useState } from 'react';

const StickyHeader = () => {
  const [isSticky, setSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState();
  const stickyRef = useRef<HTMLDivElement>(null);

  let lastScrollY = window.pageYOffset;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    if (lastScrollY > scrollY && scrollY !== 0 && scrollY >= 300) {
      setHeaderHeight(stickyRef.current.previousElementSibling.offsetHeight);
      setSticky(true);
    } else {
      setSticky(false);
    }
    lastScrollY = scrollY;
  };

  return (
    <div
      className={`sticky-header${isSticky ? ' sticky' : ''}`}
      ref={stickyRef}
    >
      <div className="sticky-inner" style={{ top: headerHeight }}>
        Test Header
      </div>
    </div>
  );
};

export default StickyHeader;
