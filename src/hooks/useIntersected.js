import { useEffect, useRef, useState } from "react";

function useIntersected(loaderRef) {

  const [element, setElement] = useState(null);
  
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loaderRef.current();
        }
      },
      {
        threshold: 1,
      }
    )
  );

  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element]);
  return {element,setElement}
}

export default useIntersected;
