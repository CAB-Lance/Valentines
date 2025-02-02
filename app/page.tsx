"use client";
import React, { useState } from "react";
import Image from "next/image";
import Cat1 from "./assets/cat1.jpg";
import Cat2 from "./assets/cat2.jpg";
import Cat3 from "./assets/cat3.jpg";
import Cat4 from "./assets/cat4.jpg";
import Cat5 from "./assets/cat5.jpg";
import Cat6 from "./assets/cat6.jpg";

const ValentineCard = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);

  const moveButton = () => {
    // Generate random position between -150 and 150 for both x and y
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 300;

    // Keep button within bounds
    const boundedX = Math.min(Math.max(newX, -150), 150);
    const boundedY = Math.min(Math.max(newY, -150), 150);

    setNoButtonPosition({ x: boundedX, y: boundedY });
  };

  const handleYesClick = () => {
    setShowSuccess(true);
  };

  const handleNoClick = () => {
    if (moveCount < 5) {
      moveButton();
      const newMoveCount = moveCount + 1;
      setMoveCount(newMoveCount);

      // Reset to center after third click
      if (newMoveCount === 5) {
        setNoButtonPosition({ x: 0, y: 0 });
      }
    } else {
      setNoClickCount((prev) => prev + 1);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-8">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-red-600">Yay! 💖</h1>
            <p className="text-xl text-gray-700">
              I knew you&apos;d say yes! See you on the 14th! 🌹
            </p>
          </div>

          <div className="relative mt-6">
            <Image
              src={Cat6}
              alt="Yayyyyy"
              className="rounded-lg mx-auto shadow-lg object-cover"
            />
            <p className="absolute bottom-3 left-0 right-0 text-white text-xl font-medium text-center">
              *happy purring noises* 😺💕
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {"❤️💖💝".split("").map((heart, i) => (
              <span
                key={i}
                className="animate-bounce"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                💖
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const renderSadCat = () => {
    if (noClickCount === 0) return null;

    const sadCatMessages = [
      { message: `Please don&apos;t say no... 🥺`, image: Cat1 },
      { message: `But I made you a Valentine&apos;s card... 😿`, image: Cat2 },
      { message: `Maybe we can talk about it? 🐱`, image: Cat3 },
      { message: `I promise I&apos;m nice! 😿`, image: Cat4 },
      { message: `Last chance to say yes! 🐱💕`, image: Cat5 },
    ];

    return (
      <div className="mt-6 text-center">
        <div className="relative">
          <Image
            src={sadCatMessages[noClickCount - 1].image}
            alt="Sad but cute cat"
            className="rounded-lg mx-auto shadow-lg object-cover w-full"
          />
          <p className="absolute bottom-3 left-0 right-0 text-white text-lg font-medium">
            {sadCatMessages[noClickCount - 1].message}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-8">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-red-600">
            Will you be my Valentine?
          </h1>
          <p className="text-gray-600">
            I promise to make you smile every day! 🌹
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-4 relative">
          <button
            onClick={handleYesClick}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 
                     transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            Yes! 💝
          </button>

          {noClickCount < 5 && (
            <button
              onClick={handleNoClick}
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                       transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              No 💔
            </button>
          )}
        </div>

        {moveCount >= 5 && noClickCount === 0 && (
          <p className="text-center text-gray-600 mt-4 animate-bounce">
            Okay, you caught me! I&apos;m giving you one last chance to answer?
            🥺
          </p>
        )}

        {renderSadCat()}
      </div>
    </div>
  );
};

export default ValentineCard;
