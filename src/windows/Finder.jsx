import React from "react";
import WindowControls from "#components/WindowControls";
import { Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "../../store/location";
import { locations } from "#constants";
import clsx from "clsx";
import useWindowStore from "../../store/window";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  const openItem = (item) => {
    if (item.kind === "folder") return setActiveLocation(item);
    if (item.fileType === "pdf") return openWindow("resume", item);
    if (item.fileType === "txt") return openWindow("txtfile", item);
    if (["img", "fig"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");
    if (item.fileType && item.kind)
      return openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (items) => {
    if (!items?.length) return null;
    return items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          item.id === activeLocation?.id ? "active" : "not-active",
        )}
      >
        <img src={item.icon} alt={item.name} className="w-4" />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));
  };

  return (
    <>
      <div id="window-header" data-window-drag-handle>
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>

          <div>
            <h3>Work</h3>
            <ul>{renderList(locations.work?.children)}</ul>
          </div>
        </div>
        <ul
          className="content"
          onClick={(e) => {
            const li = e.target.closest("li[data-item-id]");
            if (!li || !activeLocation?.children) return;
            const id = Number(li.dataset.itemId);
            const item = activeLocation.children.find((c) => c.id === id);
            if (item) openItem(item);
          }}
        >
          {(activeLocation?.children ?? []).map((item) => (
            <li
              key={item.id}
              data-item-id={item.id}
              className={item.position}
            >
              <img src={item.icon} alt={item.name} />
              <p className="text-sm font-medium truncate">{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWrapper = WindowWrapper(Finder, "finder");

export default FinderWrapper;
