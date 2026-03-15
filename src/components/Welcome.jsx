import gsap from "gsap";

const FONT_WEIGHTS = {
  P: { base: 200, max: 250 },
  H1: { base: 400, max: 600 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        display: "inline-block",
        transformOrigin: "center bottom",
        fontWeight: baseWeight,
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const Welcome = () => {
  const handleMouseMove = (e) => {
    const container = e.currentTarget;
    const { base, max } = FONT_WEIGHTS[container.tagName] || FONT_WEIGHTS.H1;

    const letters = container.querySelectorAll("span");
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const spread = rect.width * rect.width * 0.03;

    letters.forEach((letter) => {
      const lRect = letter.getBoundingClientRect();
      const letterCenter = lRect.left - rect.left + lRect.width / 2;
      const distance = Math.abs(mouseX - letterCenter);
      const intensity = Math.exp(-(distance ** 2) / spread);
      const scale = 1 + 0.2 * intensity;
      const weight = Math.round(base + (max - base) * intensity);

      gsap.to(letter, {
        duration: 0.2,
        ease: "power2.out",
        scale,
        fontWeight: weight,
        overwrite: "auto",
      });
    });
  };

  const handleMouseLeave = (e) => {
    const container = e.currentTarget;
    const base = FONT_WEIGHTS[container.tagName]?.base ?? 400;

    container.querySelectorAll("span").forEach((span) => {
      gsap.to(span, {
        duration: 0.3,
        ease: "power2.out",
        scale: 1,
        fontWeight: base,
      });
    });
  };

  return (
    <section id="welcome">
      <p
        onMouseEnter={handleMouseMove}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {renderText(
          "Hey, I'm Deepak! Welcome to my",
          "text-3xl font-georama",
          200,
        )}
      </p>
      <h1
        className="mt-7"
        onMouseEnter={handleMouseMove}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop/tabled screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
