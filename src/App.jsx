import React, { useState } from "react";
import "./App.css";

const cartes = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function shuffleArray(array) {
  return [...array, ...array].sort(() => Math.random() - 0.5);
}

export default function MemoryGame() {
  const [deck, setDeck] = useState(shuffleArray(cartes));
  const [firstChoice, setFirstChoice] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const handleClick = (index) => {
    if (flipped.includes(index) || matchedCards.includes(deck[index])) return;

    if (firstChoice === null) {
      setFirstChoice(index);
      setFlipped([index]);

    } else {
      setFlipped([firstChoice, index]);
      if (deck[firstChoice] === deck[index]) {
        setMatchedCards([...matchedCards, deck[firstChoice]]);
      }

      setTimeout(() => {
        setFirstChoice(null);
        setFlipped([]);
      }, 1000);
    }
  };

  return (
    <div className="memory-game">
      {deck.map((card, index) => {
        const isFlipped = flipped.includes(index) || matchedCards.includes(card);

        return (
          <div key={index} className={`card ${isFlipped ? "flipped" : ""}`} onClick={() => handleClick(index)}>

            <div className="card-inner">
              <div className="card-front">?</div>
              <div className="card-back">{card}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
