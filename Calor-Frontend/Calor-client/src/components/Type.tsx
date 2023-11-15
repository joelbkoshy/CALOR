import React from "react";
import Typewriter from "typewriter-effect";
import './style.css'

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          '<span style="color: black;font-weight:600;font-size:3rem;">Empowering Individuals to Thrive in Emotional Wellness.</span>',
          '<span style="color: black;font-weight:600;font-size:3rem;">Discover Healing, Connect with Calor.</span>',
          '<span style="color: black;font-weight:600;font-size:3rem;">Empathy in Every Session, Calor Cares.</span>'

        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
        // html: true,
        cursorClassName:"cursor"
      }}

    />
  );
}

export default Type;
