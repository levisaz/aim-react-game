import { Howl, Howler } from "howler";
import MainSound from "../audio/menu.mp3";

const StartScreen = ({ startGame, score }) => {
  const soundSrc = MainSound;
  const SoundPlay = (src) => {
    const sound = new Howl({
      src,
      autoplay: true,
      loop: true,
    });
    Howler.volume(0.2);
    sound.play();
  };
  return (
    <>
      <main className="startScreen">
        {score > 0 && (
          <div className="intro">
            Congratulations! <br />
            you got {score}
          </div>
        )}
        {score <= 0 && (
          <div className="intro">
            {SoundPlay(soundSrc)}
            You got 60 seconds to shoot as many targets as you can!
          </div>
        )}
        <button type="button" onClick={() => startGame()}>
          Start Game
        </button>
      </main>
    </>
  );
};

export default StartScreen;
