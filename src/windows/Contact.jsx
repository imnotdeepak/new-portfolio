import { socials } from "#constants";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import React from "react";

const Contact = () => {
  const visibleSocials = socials.filter((s) => s.text !== "Twitter/X");

  return (
    <>
      <div id="window-header" data-window-drag-handle>
        <WindowControls target="contact" />
        <div id="window-title" className="flex-1 text-center font-semibold">
          Contact Me
        </div>
      </div>

      <div className="p-6 space-y-6">
        <h3 className="text-xl font-semibold text-center">Let's Connect</h3>
        <ul className="flex flex-wrap gap-4 justify-center">
          {visibleSocials.map(({ id, bg, link, icon, text }) => (
            <li
              key={id}
              style={{ backgroundColor: bg }}
              className="rounded-lg p-3 w-60 hover:-translate-y-0.5 hover:scale-105 origin-center transition-all duration-300"
            >
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="flex items-center gap-3"
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
