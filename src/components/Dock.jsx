import { dockApps } from "#constants";
import React from "react";
import { Tooltip } from "react-tooltip";
import useWindowStore from "../../store/window";

const Dock = () => {
  const { openWindow, requestClose, windows } = useWindowStore();
  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const win = windows[app.id];
    if (!win) {
      console.error(`Window ${app.id} not found`);
      return;
    }

    if (win.isOpen) {
      requestClose(app.id);
    } else {
      openWindow(app.id);
    }
  };
  return (
    <section id="dock">
      <div className="dock-container">
        {dockApps.map(({ id, icon, name, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
