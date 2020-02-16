import { useEffect } from 'react';

const useClickAway = (ref, callback, deps) => {
  useEffect(() => {
    const handleClick = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    const handleKeydown = event => {
      if (event.keyCode === 27) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.addEventListener('keydown', handleKeydown);
    };
  }, [deps]);
};

export default useClickAway;
