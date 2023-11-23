import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver() {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!isVisible && entry.isIntersecting) {
                    setVisible(true);
                    // Unobserve the target element when it becomes visible
                    observerRef.current.unobserve(domRef.current);
                }
            });
        });

        observerRef.current.observe(domRef.current);

        return () => {
            // Cleanup: Disconnect the observer when the component unmounts
            observerRef.current.disconnect();
        };
    }, [isVisible]);

    return { isVisible, domRef };
}