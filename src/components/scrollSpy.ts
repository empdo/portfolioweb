import { useEffect, useRef, useState } from "react";

export const useScrollSpy = (ids: string[] , options: {rootMargin: string}) => {
  const [activeId, setActiveId] = useState(ids[0]);
  let observer: IntersectionObserver;

  useEffect(() => {
    const elements = ids.flatMap(id => [...document.querySelectorAll(`#${id}`)]);

    observer?.disconnect();
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    elements.forEach((el) => {
      if (el) {
        observer.observe(el);
      }
    });
    console.log(activeId);
    return () => observer.disconnect();
  }, [ids, options]);
  return activeId;
}
