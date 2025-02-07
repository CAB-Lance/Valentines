"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import happyDino from "./assets/dino.jpg";
import angryDino from "./assets/angrydino.jpg";
import cry from "./assets/cry1.gif";
import cry2 from "./assets/cry2.gif";
import Cry3 from "./assets/cry3.gif";
import Flutter from "./assets/flutter.gif";
import Dinoo from "./assets/dinooo.png";
import FingerHeart from "./assets/hearrt.jpg";
import Swal from 'sweetalert2';
import MochaArrow from './assets/mocha-arrow.gif';

const ValentineCard = () => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [showSuccess, setShowSuccess] = useState(false);
  const [moveCount, setMoveCount] = useState(0);
  const [noClickCount, setNoClickCount] = useState(0);
  const [currentImage, setCurrentImage] = useState(happyDino);
  const [showCurrentImage, setShowCurrentImage] = useState(true);
  const [showGif, setShowGif] = useState(false);
  const [isLetterVisible, setLetterVisible] = useState(false);
  
  useEffect(() => {
    if (moveCount >= 5 && noClickCount === 0) {
      setCurrentImage(angryDino);
    }
  }, [moveCount, noClickCount]);

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

  const handleSendKissClick = () => {
      Swal.fire({
        title: 'Dino received your kiss and is blushing! 😳💕',
        imageUrl: '/milk-kiss.gif',
        imageAlt: 'Dino Kiss',
        showConfirmButton: true,
        confirmButtonText: 'Continue',
      }).then((result) => {
        if(result.isConfirmed) {

          setShowGif(true);
          setTimeout(() => {
            setShowGif(false);
            setLetterVisible(true);
          }, 2500);
        }
      });
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
      setShowCurrentImage(false);
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-8">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-red-600">Yay!! 💖</h1>
            <p className="text-xl text-gray-700">
              I knew you&apos;d say yes! 😝 Love youuuu so much my pretty baby!
            </p> 
          </div>

          <div className="relative mt-6">
            <Image
              src={Flutter}
              alt="Yayyyyy"
              className="rounded-lg mx-auto object-cover"
            />
            {/* <p className="absolute bottom-3 left-0 right-0 text-white text-xl font-medium text-center">
              *happy purring noises* 😺💕
            </p> */}
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
          <div className="flex justify-center">
            <button
              onClick={handleSendKissClick}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 
                        transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Send kiss to Dino! 😙🦖
            </button>
          </div>
        </div>
        { showGif && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
            <Image src={MochaArrow} alt="Dino Kiss" />
          </div>
        )}
        {isLetterVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50 p-6">
            <div className="relative w-[380px] md:w-[420px] lg:w-[460px] p-6 bg-[#FAF3E0] border-4 border-[#D4A373] shadow-2xl rounded-lg transform transition-all scale-95 opacity-0 animate-popUp">
              <h2 className="text-2xl font-bold text-red-500 mb-4">Happy Valentines Day, my Bebe!</h2>
              <p className="text-gray-700 text-justify">
                Hello my baby, I just want to thank you for accepting my invitation. 🤪 I can’t express how happy I am that you’ve agreed to be Dino’s Valentine this year. <br></br><br></br>
                I really hope you like the way I’ve chosen to ask you to be my Valentine. Hehehe, I know that asking you through a simple email might be a bit too common or predictable, so I decided to come up with my own version for youu! 😝<br></br><br></br>
                Well, I know February 14th is a Friday and we won’t be able to see each other that day 🥺, but I was wondering if my bebe free any other day during that week? Even if it’s just a simple dinner after work, I’d love to celebrate with you. 🩷
                <br></br><br></br>
                I love you more than words can say.  
                Thank you for being mine and for everything you do!  
              </p>
              <p className="text-gray-700 font-semibold mt-4">Forever yours, <br /> Dino 🦖</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  const renderSadCat = () => {
    if (noClickCount === 0) return null;
    

    const sadCatMessages = [
      { message: `Do you really want to see your dino crying? 💔🥺`, image: cry },
      { message: `My reaction right now. Still no? 😭`, image: cry2 },
      { message: `I’m here in the corner, crying because it feels like you don’t love Dino anymore. ☹️`, image: Cry3 },
      { message: `Hmp, okay fine! My mask is off. Now, try saying no. 🙂`, image: Dinoo },
      { message: `Oopsie! Looks like something’s missing… Now you have no choice but to say yes! 😏💘`, image: FingerHeart },
    ];

    return (
      <div className="text-center">
        <div className="relative">
          <Image
            src={sadCatMessages[noClickCount - 1].image}
            alt="Sad but cute cat"
            className="mx-auto object-cover rounded-lg w-full w-24"
          />
          <p className=" left-0 right-0 text-gray-600 font-medium mt-3">
            {sadCatMessages[noClickCount - 1].message}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-8">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <div className="text-center space-y-4">
        {showCurrentImage && (
          <div className="relative">
            <Image
              src={currentImage}
              alt="Sad but cute cat"
              className="mx-auto object-cover w-full w-24"
            />
          </div>
        )}
          <h1 className="text-3xl font-bold text-red-600">
            Will you be your Dino&apos;s valentine? 🥹🩷
          </h1>
          <p className="text-gray-600">
            I promise to make you smile every day! 🌹
          </p>
        </div>

        <div className="flex justify-center gap-4 relative">
          <button
            onClick={handleYesClick}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 
                     transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
          >
            Yes! 🤭     
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
            Okay, you caught me! I&apos;m giving you one last chance to answer?! 😠
          </p>
        )}

        {renderSadCat()}
      </div>
    </div>
  );
};

export default ValentineCard;
