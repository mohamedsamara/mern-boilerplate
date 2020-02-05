import { useEffect } from 'react';

const useClickAway = (ref, callback) => {
  useEffect(() => {
    const handleClick = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};

export default useClickAway;
