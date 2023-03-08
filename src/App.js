import React, { useRef, useEffect } from "react";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { evaluateCircle } from "./utilities";
import "./App.css";
function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  let array = []; // this array will collect points for shapes, [x,y]
  let index = 0;
  let lastX = -1;
  let lastY = -1;

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
        let centerX = 0;
        let centerY = 0;
        let centerZ = 0;

        for (let [x, y, z] of hand[0].landmarks) {
          centerX += (640 - x) * 1;
          centerY += y * 1;
          centerZ += z * 1;
        }
        centerX = centerX / 21;
        centerY = centerY / 21;
        centerZ = centerZ / 21;

        array.push({ x: centerX, y: centerY });
        if (
          Math.sqrt(
            (centerX - array[0].x) * (centerX - array[0].x) +
              (centerY - array[0].y) * (centerY - array[0].y)
          ) < 10 &&
          index > 5
        ) {
          console.log("close the shape");
          index = 0;
          array = [];

          if (evaluateCircle(array)) {
            ////@Enea add to the UI a pop up window  you draw a circle Good Job
            console.log("You draw circle Good job");
          }
          ///evaluate the shape
        }
        ctx.beginPath();
        ctx.fillStyle = "lightblue";
        ctx.arc(centerX, centerY, 20, 0, 2 * 3.14);

        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.lineWidth = "3";
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);

        index += 1;

        ctx.stroke();
        ctx.closePath();

        if (lastX > 0) {
          let dx = centerX - lastX;
          let dy = centerY - lastY;
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
      <header className="App-header">
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
