import { useEffect, useState } from "react";
import Score from "./Score";
import Timer from "./Timer";
import target1 from "../imgs/target.png";
import owl from "../imgs/owl.png";
import rocket from "../imgs/rocket.png";
import alien from "../imgs/alien.png";
import moon from "../imgs/moon.png";
import helicopter from "../imgs/helicopter.png";

import HitSound from "../audio/hitsound.wav";
import { Howl, Howler } from "howler";

const NUM_SECONDS = 60;
let timer, target;
let images = [target1, owl, rocket, alien, moon, helicopter];

const Game = ({ setScore, score, endGame }) => {
  const [seconds, setSeconds] = useState(NUM_SECONDS);

  const [position, setPosition] = useState({
    x: getRandomPosition(),
    y: getRandomPosition(),
  });

  function getRandomPosition() {
    const innerHeight = window.innerHeight;
    const innerWidth = window.innerWidth;

    const x = Math.random() * (innerWidth / 2) + innerWidth / 4;
    const y = Math.random() * (innerHeight / 2) + innerHeight / 4;

    return {
      x: `${x}px`,
      y: `${y}px`,
    };
  }

  const soundSrc = HitSound;
  const SoundPlay = (src) => {
    const sound = new Howl({
      src,
    });
    sound.play();
  };

  const handleTargetClick = () => {
    Howler.volume(0.2);
    SoundPlay(soundSrc);
    setScore((score) => score + 1);
  };

  const tick = () => {
    setSeconds((seconds) => {
      let total = seconds - 1;

      if (total === 0) endGame();

      return total;
    });
  };

  useEffect(() => {
    target = images[Math.floor(Math.random() * 5) + 1];
    const position = getRandomPosition();
    setPosition({
      x: position.x,
      y: position.y,
    });
  }, [score]);

  useEffect(() => {
    timer = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <main className="gameScreen">
      <Score score={score} />
      <Timer seconds={seconds} />

      <img
        width="50"
        src={target}
        style={{
          top: position.y,
          left: position.x,
        }}
        onClick={handleTargetClick}
        alt="target"
      />
      {console.log(target)}
    </main>
  );
};

export default Game;
