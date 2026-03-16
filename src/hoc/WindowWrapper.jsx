import React, { useRef, useEffect } from "react";
import useWindowStore from "../../store/window";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

function ZIndexUpdater({ targetRef, windowKey }) {
  const zIndex = useWindowStore(
    (state) => state.windows[windowKey]?.zIndex ?? 0,
  );
  useEffect(() => {
    if (targetRef.current) targetRef.current.style.zIndex = zIndex;
  }, [zIndex, targetRef]);
  return null;
}

const ENTRY_ANIMATION = {
  from: { scale: 0.8, opacity: 0, y: 40 },
  to: { scale: 1, opacity: 1, y: 0 },
  duration: 0.4,
  ease: "power3.out",
};
const EXIT_ANIMATION = {
  from: { scale: 1, opacity: 1, y: 0 },
  to: { scale: 0.8, opacity: 0, y: 40 },
  duration: 0.2,
  ease: "power3.in",
};

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const isOpen = useWindowStore(
      (state) => state.windows[windowKey]?.isOpen ?? false,
    );
    const pendingClose = useWindowStore((state) => state.pendingClose);
    const focusWindow = useWindowStore((state) => state.focusWindow);
    const closeWindow = useWindowStore((state) => state.closeWindow);
    const wrapperRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
      if (!isOpen || pendingClose === windowKey) return;
      const wrapperEl = wrapperRef.current;
      const sectionEl = sectionRef.current;
      if (!wrapperEl || !sectionEl) return;

      gsap.fromTo(wrapperEl, ENTRY_ANIMATION.from, {
        ...ENTRY_ANIMATION.to,
        duration: ENTRY_ANIMATION.duration,
        ease: ENTRY_ANIMATION.ease,
        transformOrigin: "center center",
      });

      const dragHandle =
        sectionEl.querySelector("[data-window-drag-handle]") ||
        sectionEl.querySelector("#window-header") ||
        wrapperEl;
      const instances = Draggable.create(wrapperEl, {
        handle: dragHandle,
        onPress: () => {
          focusWindow(windowKey);
        },
      });
      return () => {
        instances.forEach((d) => d.kill());
      };
    }, [isOpen, pendingClose, windowKey]);

    useEffect(() => {
      if (pendingClose !== windowKey || !isOpen) return;
      const wrapperEl = wrapperRef.current;
      if (!wrapperEl) return;

      const tween = gsap.fromTo(wrapperEl, EXIT_ANIMATION.from, {
        ...EXIT_ANIMATION.to,
        duration: EXIT_ANIMATION.duration,
        ease: EXIT_ANIMATION.ease,
        transformOrigin: "center center",
        onComplete: () => {
          closeWindow(windowKey);
        },
      });
      return () => tween.kill();
    }, [pendingClose, windowKey, isOpen, closeWindow]);

    if (!isOpen) return null;

    return (
      <>
        <div
          ref={wrapperRef}
          style={{ position: "absolute" }}
          className="will-change-transform"
        >
          <section id={windowKey} ref={sectionRef}>
            <Component {...props} />
          </section>
        </div>
        <ZIndexUpdater targetRef={wrapperRef} windowKey={windowKey} />
      </>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
