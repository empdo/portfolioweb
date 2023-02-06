import { useEffect, useState } from "react";

const useScrollOffset = () => {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const updateOffset = () => {
      setScrollOffset(window.pageYOffset);
    }

    window.addEventListener("scroll", updateOffset);
    updateOffset();

    return () => window.removeEventListener("scroll", updateOffset);
  }, []);

  return scrollOffset;
}

export default useScrollOffset();
