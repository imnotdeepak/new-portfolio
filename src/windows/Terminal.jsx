import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Flag } from "lucide-react";
import React from "react";
import WindowControls from "#components/WindowControls";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <div className="flex-1 flex justify-center">
          <h2>Tech Stack</h2>
        </div>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@deepak % </span>
          show tech stack
        </p>
        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : " "}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> 5 of 5 stacks loaded successfully
          </p>

          <p className="text-black">
            <Flag size={15} fill="black" />
            Render time: 0.6 seconds
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
