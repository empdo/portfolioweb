import { useEffect, useRef, useState } from "react";

export const useScrollSpy = (ids: string[] , options: {rootMargin: string}) => {
  const [activeId, setActiveId] = useState(ids[0]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = ids.flatMap(id => [...document.querySelectorAll(`#${id}`)]);

    observer.current?.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);


    elements.forEach((el) => {
      if (el && observer.current) {
        observer.current.observe(el);
      }
    });

    return () => observer.current?.disconnect();
  }, [ids, options]);
  return activeId;
}
