import { useEffect, useState } from "react";
import "./App.css";
import banana from "./icons/banana.png";
import beach from "./icons/beach-hut.png";
import coconut from "./icons/coconut.png";
import dolphin from "./icons/dolphin.png";
import sailboat from "./icons/sailboat.png";
import seaTurtle from "./icons/sea-turtle.png";
import sun from "./icons/sun.png";
import toucan from "./icons/toucan.png";
import Confetti from "react-confetti";

export default function App() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const [iconVisibility, setIconVisibility] = useState(new Array(16).fill(false));
  const [shufflesIcons, setShuffled] = useState([]);
  const [active, setActive] = useState([]);
  const [win, setWin] = useState(false);
  const icons = [
    banana,
    beach,
    coconut,
    beach,
    coconut,
    dolphin,
    sailboat,
    seaTurtle,
    sun,
    toucan,
    dolphin,
    sailboat,
    seaTurtle,
    sun,
    toucan,
    banana,
  ];

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  useEffect(() => {
    setShuffled(shuffleArray(icons));
  }, []);

  const handleIconClick = (item, index) => {
    setIconVisibility((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
    setActive((prev) => [...prev, item]);
  };

  useEffect(() => {
    if (active.length >= 2 && active.length % 2 == 0) {
      let last = active.slice(-2);
      if (last[0] != last[1]) {
        setActive(active.slice(0, -2));
        last = [];
      }
    }
    if (iconVisibility.every((item) => item == true)) {
      setWin(() => true);
    }
  }, [iconVisibility]);

  useEffect(() => {
    let noDupl = [];
    let duplIdx = [];
    if (active.length % 2 == 0) {
      noDupl = active.filter((item, index) => index % 2 == 0);
    }

    noDupl.forEach((item, idx) => {
      const indices = shufflesIcons.reduce((ac, cE, cI) => {
        if (item == cE) {
          ac.push(cI);
        }
        return ac;
      }, []);
      duplIdx = duplIdx.concat(indices);
    });
    let last = active.slice(-2);
    if (last[0] == last[1]) {
      setTimeout(() => {
        setIconVisibility((prev) =>
          prev.map((item, idx) => {
            if (duplIdx.includes(idx)) {
              return true;
            } else {
              return false;
            }
          })
        );
      }, 500);
    }
  }, [active]);

  const Restart = () => {
    setShuffled(shuffleArray(icons));
    setWin(() => false);
    setActive([]);
    setIconVisibility((prev) => Array(16).fill(false));
  };

  return (
    <div className="App">
      {win && <Confetti width={width} height={height} />}
      <button className="glow-on-hover" type="button" onClick={() => Restart()}>
        Restart
      </button>
      <div className="card">
        <div className="card-btn-div">
          {shufflesIcons.map((item, index) => {
            return (
              <button
                disabled={iconVisibility[index] == true}
                className="card-btn"
                key={index}
                onClick={() => handleIconClick(item, index)}
              >
                {iconVisibility[index] ? (
                  <img src={item} height={30} />
                ) : (
                  <p style={{ margin: "0" }}>?</p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
