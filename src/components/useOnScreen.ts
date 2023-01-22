import {useEffect, useRef, useState} from "react";

function useOnScreen(ref: RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      console.log(entry.isIntersecting);
      setIsOnScreen(entry.isIntersecting)
    },{
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );
  }, []);

  useEffect(() => {
    if (observerRef.current )
      observerRef.current.observe(ref.current);

    return () => {
      if (observerRef.current)
        observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}

export default useOnScreen;
