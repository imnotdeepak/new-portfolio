import React from "react";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import useWindowStore from "../../store/window";

const Text = () => {
  const txtfile = useWindowStore((state) => state.windows.txtfile);
  const isOpen = txtfile?.isOpen ?? false;
  const data = txtfile?.data;

  if (!isOpen) return null;

  if (!data) {
    return (
      <>
        <div id="window-header" data-window-drag-handle>
          <WindowControls target="txtfile" />
          <div className="flex-1 flex justify-center">
            <h2>Text File</h2>
          </div>
        </div>
        <div className="p-4 text-sm text-gray-500 text-center">
          Open a file from Finder
        </div>
      </>
    );
  }

  const { name, subtitle, description = [] } = data;
  const imageUrl = data.image ?? data.imageUrl;

  return (
    <>
      <div id="window-header" data-window-drag-handle>
        <WindowControls target="txtfile" />
        <div className="flex-1 flex justify-center">
          <h2>{name}</h2>
        </div>
      </div>

      <div className="p-4 space-y-4 overflow-auto">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-full max-w-xs mx-auto rounded-lg object-cover"
          />
        )}
        {subtitle && (
          <p className="text-sm font-medium text-gray-500 text-center">
            {subtitle}
          </p>
        )}
        {description.length > 0 && (
          <div className="space-y-3 text-sm text-gray-700">
            {description.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWrapper = WindowWrapper(Text, "txtfile");

export default TextWrapper;
