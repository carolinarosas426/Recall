import { useState } from "react";
import "./App.css";

const colors = ["violet", "cream", "midnight", "lavender"];

export default function App() {
  const [sequence, setSequence] = useState([]);
  const [player, setPlayer] = useState([]);
  const [active, setActive] = useState(null);

  const [started, setStarted] = useState(false);

  const [gameOver, setGameOver] = useState(false);

  const [score, setScore] = useState(0);

  function startGame() {
    const first =
      colors[Math.floor(Math.random() * colors.length)];

    const newSequence = [first];

    setSequence(newSequence);

    setStarted(true);

    setGameOver(false);

    setScore(0);

    flashSequence(newSequence);
  }

  function flashSequence(seq) {
    let i = 0;

    const interval = setInterval(() => {
      setActive(seq[i]);

      setTimeout(() => {
        setActive(null);
      }, 400);

      i++;

      if (i >= seq.length) {
        clearInterval(interval);
      }
    }, 800);
  }

  function handleClick(color) {
    if (!started) return;

    setActive(color);

    setTimeout(() => {
      setActive(null);
    }, 200);

    const newPlayer = [...player, color];

    setPlayer(newPlayer);

    if (color !== sequence[newPlayer.length - 1]) {
      setStarted(false);

      setGameOver(true);

      return;
    }

    if (newPlayer.length === sequence.length) {
      const next =
        colors[Math.floor(Math.random() * colors.length)];

      const newSequence = [...sequence, next];

      setScore(sequence.length);

      setTimeout(() => {
        flashSequence(newSequence);

        setSequence(newSequence);

        setPlayer([]);
      }, 1000);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h1>RECALL</h1>

        {!started && !gameOver && (
          <>
            <p className="subtitle">
              remember the pattern
            </p>

            <button onClick={startGame}>
              begin
            </button>
          </>
        )}

        {started && (
          <>
            <p className="score">
              sequence length: {sequence.length}
            </p>

            <div className="grid">
              {colors.map((color) => (
                <div
                  key={color}
                  className={`tile ${color} ${
                    active === color ? "active" : ""
                  }`}
                  onClick={() => handleClick(color)}
                />
              ))}
            </div>
          </>
        )}

        {gameOver && (
          <div className="game-over">
            <p className="game-over-text">
              memory lost
            </p>

            <h2>
              final score: {score}
            </h2>

            <button onClick={startGame}>
              try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}