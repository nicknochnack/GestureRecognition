// 0. Install fingerpose npm install fingerpose
// 1. Add Use State
// 2. Import emojis and finger pose import * as fp from "fingerpose";
// 3. Setup hook and emoji object
// 4. Update detect function for gesture handling
// 5. Add emoji display to the screen

///////// NEW STUFF ADDED USE STATE
import React, { useRef, useState, useEffect } from "react";
///////// NEW STUFF ADDED USE STATE

// import logo from './logo.svg';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

///////// NEW STUFF IMPORTS
import * as fp from "fingerpose";
import victory from "./victory.png";
import thumbs_up from "./thumbs_up.png";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);

  let url =
    "https://i.pinimg.com/originals/7d/e7/e9/7de7e9bffd27ec9538445e3bdb2226a7.png";
  let array = [];
  let circle = [];
  let index = 0;
  let lastX = -1;
  let lastY = -1;

  for (let i = 0; i < 30 * 3.14 * 2; i++) {
    let x = -Math.sin(i / 30) * 4;
    let y = -Math.cos(i / 30) * 4;
    circle.push({ x, y });
  }

  const runHandpose = async () => {
    const net = await handpose.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await net.estimateHands(video);
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING
      const ctx = canvasRef.current.getContext("2d");
      if (array.length > 0) {
        ctx.beginPath();
        ctx.fillStyle = "Black";
        ctx.lineWidth = 15;
        ctx.moveTo(array[0].x, array[0].y);
        for (let { x, y } of array) {
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.closePath();
      }

      if (hand.length > 0) {
        ///////// NEW STUFF ADDED GESTURE HANDLING

        // Draw mesh

        let centerX = 0;
        let centerY = 0;
        let centerZ = 0;
        console.log(hand[0].landmarks);
        for (let [x, y, z] of hand[0].landmarks) {
          centerX += (640 - x) * 1;
          centerY += y * 1;
          centerZ += z * 1;
        }
        centerX = centerX / 21;
        centerY = centerY / 21;
        centerZ = centerZ / 21;

        array.push({ x: centerX, y: centerY });
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.arc(centerX, centerY, 10, 0, 2 * 3.14);

        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + circle[index].x * 10,
          centerY + circle[index].y * 10
        );
        index += 1;
        if (index >= circle.length) {
          index = 0;
          array = [];
          setScore(0);
        }
        ctx.stroke();
        ctx.closePath();

        if (lastX > 0) {
          let dx = centerX - lastX;
          let dy = centerY - lastY;
          let [dx2, dy2] = [circle[index].x, circle[index].y];
          let len = Math.sqrt(dx * dx + dy * dy);

          let len2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          let tempScore = (dx * dx2 + dy * dy2) / (len * len2);
          setScore(score + tempScore);
        }

        lastX = centerX;
        lastY = centerY;
        /// drawHand(hand, ctx);
      }
    }
  };

  useEffect(() => {
    runHandpose();
  }, []);

  return (
    <div className="App">
      <h1 style={{ color: "orange" }}>{score}</h1>
      <header className="App-header">
        <img src={url} style={{ zIndex: 1000, width: 100, height: 100 }} />
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
          mirrored={true}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
