import { Navbar, Welcome, Dock, Home } from "#components";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Terminal, Resume, Finder, Text, Contact } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Home />
      <Terminal />
      <Resume />
      <Finder />
      <Text />
      <Contact />
    </main>
  );
};

export default App;
