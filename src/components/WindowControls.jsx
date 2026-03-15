import React from "react";
import useWindowStore from "../../store/window";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();
  return (
    <div id="window-controls">
      <div className="close" onClick={() => closeWindow(target)} />
    </div>
  );
};

export default WindowControls;
