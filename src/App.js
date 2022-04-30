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
import * as fp from "fingerpose";

///////// PNG Imports
import open_hand from "./png/open_hand.png";
import victory from "./png/victory.png";
import pointer from "./png/pointer.png";
import rad from "./png/rad.png";
import thumbs_up from "./png/thumbs_up.png";
import thumbs_down from "./png/thumbs_down.png";
import fist from "./png/fist.png";

///////// Gesture Imports
import {
  OpenHandGesture,
  VictoryGesture,
  PointerGesture,
  RadGesture,
  ThumbsUpGesture,
  ThumbsDownGesture,
  FistGesture,
} from "./Gestures";
import { HandDetector } from "@tensorflow-models/handpose/dist/hand";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  const images = {
    open_hand: open_hand,
    victory: victory,
    pointer: pointer,
    rad: rad,
    thumbs_up: thumbs_up,
    thumbs_down: thumbs_down,
    fist: fist,
  };
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    console.log("Loading handpose model...");
    const handposeModel = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(handposeModel);
    }, 20);
  };

  const detect = async (handposeModel) => {
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

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      // 2nd argument false: flipHorizontal
      const hand = await handposeModel.estimateHands(video, false);
      // console.log(hand);

      ///////// NEW STUFF ADDED GESTURE HANDLING

      if (hand.length > 0) {
        // GE: Gesture Estimator
        const GE = new fp.GestureEstimator([
          OpenHandGesture,
          VictoryGesture,
          // PointerGesture,
          RadGesture,
          ThumbsUpGesture,
          // ThumbsDownGesture,
          FistGesture,
        ]);

        // 6 is the minimum score it's looking for
        const gesture = await GE.estimate(hand[0].landmarks, 7);

        if (gesture.gestures === undefined) {
          console.log("no hand");
          setEmoji("");
        } else if (gesture.gestures.length > 0) {
          console.log(gesture.gestures);

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          console.log(gesture.gestures[maxConfidence].name);
          setEmoji(gesture.gestures[maxConfidence].name);
        }
      }

      ///////// NEW STUFF ADDED GESTURE HANDLING

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      ctx.translate(canvasRef.current.width, 0);
      ctx.scale(-1, 1);
      drawHand(hand, ctx);
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

        {/* NEW STUFF */}
        {emoji !== null ? (
          <img
            src={images[emoji]}
            alt="emoji"
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 400,
              bottom: 500,
              right: 0,
              textAlign: "center",
              height: 100,
            }}
          />
        ) : (
          ""
        )}

        {/* NEW STUFF */}
      </header>
    </div>
  );
}

export default App;
