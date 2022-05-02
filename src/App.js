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

// React Decoration Imports
import Confetti from "react-dom-confetti";
import { configConfetti, configMonochrome, configColor1, configColor2, configColor3 } from "./reactConfigs";

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
import './styles/index.scss'

import { HandDetector } from "@tensorflow-models/handpose/dist/hand";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  ///////// NEW STUFF ADDED STATE HOOK
  const [emoji, setEmoji] = useState(null);
  const [explosion, setExplosion] = useState(false);
  let initialGestureArray = []
  for (let i=0;i<10;i++){
    initialGestureArray.push("")
  }
  const [gestureQueue, setGestures] = useState(initialGestureArray)
  // const [timerRingOffset,settimerRingOffset] = useState(0)
  // const [gestureDuration,setGestureDuration] = useState(0)
  const [explosionConfig, setExplosionConfig] = useState(null);

  const images = {
    open_hand: open_hand,
    victory: victory,
    pointer: pointer,
    rad: rad,
    thumbs_up: thumbs_up,
    thumbs_down: thumbs_down,
    fist: fist,
  };

  // const $timerRing = document.querySelector('#timer-ring')
  // const $timerRingCircle = document.querySelector('#timer-ring-circle')
  const radius = 38
  const circumference = (radius * 2 * Math.PI)

  // $timerRingCircle.style.strokeDasharray = `${circumference} ${circumference}`
  // $timerRingCircle.style.strokeDashoffset = `${circumference}`  
  
  ///////// NEW STUFF ADDED STATE HOOK

  const runHandpose = async () => {
    console.log("Loading handpose model...");
    const handposeModel = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(handposeModel);
  }, 10);
  };

  const detect = async (handposeModel) => {
    // Check data is available
    const predictionStartTS = Date.now()
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

        // 2nd arg is the minimum score it's looking for
        const gesture = await GE.estimate(hand[0].landmarks, 7);
        if (gesture.gestures === undefined) {
          console.log("no hand");
          setEmoji("");
          // setGestureDuration(0);
          setGestures((gestureQueue)=>{
            let prevGestures = gestureQueue.slice(1)
            prevGestures.push("")
            return(prevGestures)})
        } else if (gesture.gestures.length > 0) {

          const confidence = gesture.gestures.map(
            (prediction) => prediction.confidence
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );

          // MOST LIKELY CURRENT GESTURE IS gesture.gestures[maxConfidence].name
          // Ideally our gesturesQueue would update the end with this...and remove the 0 index.... but it doesn't for some reason.
          
          // let prevGestures = gestureQueue.slice(1);
          // prevGestures.push(gesture.gestures[maxConfidence].name)
          setGestures((gestureQueue)=>{
            let prevGestures = gestureQueue.slice(1)
            prevGestures.push(gesture.gestures[maxConfidence].name)
          console.log(gestureQueue)
            return(prevGestures)})
          // console.log(gestureQueue)
          
          //The goal is then to take the mode of the first half and second half to determine if gesture changed.
        //   function mode(arr){
        //     return arr.sort((a,b) =>
        //           arr.filter(v => v===a).length
        //         - arr.filter(v => v===b).length
        //     ).pop();
        // }
        // prevGestureMode = mode(gesturesQueue.slice(0,5))
        // currentGestureMode = mode(gesturesQueue.slice(5))
        //  then we want to use these modes to see if we add to duration timer or change background/emoji in response
          //if (prevGesture===lastGesture){
            // add to duration timer
            // const deltaTime = Date.now() - predictionStartTS
            // gestureDuration += deltaTime
          // }
          //if (prevGesture!==lastGesture){
            // setEmoji/Canvas Element
          // }
          setEmoji(gesture.gestures[maxConfidence].name);

          switch (gesture.gestures[maxConfidence].name) {
            case "open_hand":
              setExplosionConfig(configConfetti);
              setExplosion(true);
              break;
            case "rad":
              setExplosionConfig(configMonochrome);
              setExplosion(true);
              break;
            case "victory":
              setExplosionConfig(configColor1);
              setExplosion(true);
              break;
            case "thumbs_up":
              setExplosionConfig(configColor2);
              setExplosion(true);
              break;
            case "fist":
              setExplosionConfig(configColor3);
              setExplosion(true);
              break
            default:
              break;
          }
        }
      }else{
        setEmoji("")
        setGestures((gestureQueue)=>{
          let prevGestures = gestureQueue.slice(1)
          prevGestures.push("")
          return(prevGestures)})
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
  },[]);

  useEffect(()=>{
    setExplosion(false)
  },[emoji])
  const renderAnimations = (gesture) =>{
    // let output
    // switch (gesture) {
    // case "closed_hand":
    //   return(
    //     <Confetti active={false} config={configConfetti} />
    //   )
    // case "open_hand":
    //   return(
    //     <Confetti active={true} config={configConfetti} />
    //   )
    // default:
    //  break
    // }
    // setExplosion(false)
    return(
      <Confetti active={explosion} config={explosionConfig} />
    )
  }
  const renderCircleTimer=()=>{ //I don't think we really need this... the smoothed gesture array makes more sense
    return(
    <div className="player-hand-container">
    {/* <!-- shows the current recognized gesture --> */}
    <div id="player-hand" className="player-hand"></div>

    {/* <!-- show the timer progress --> */}
    <svg id="timer-ring" className="timer-ring" height="100" width="100" strokeDasharray={circumference+" "+circumference}>
      <circle
        className="timer-ring-circle"
        strokeWidth="6"
        stroke="white"
        fill="transparent"
        r="38"
        cx="50"
        cy="50"
      />
      <circle
        id="timer-ring-circle"
        className="timer-ring-circle"
        strokeWidth="6"
        stroke="blue"
        fill="transparent"
        r="38"
        cx="50"
        cy="50"
      />
    </svg>
  </div>)
  }

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
            alt="No Gesture Found"
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
        {/* <Confetti active={explosion} config={configConfetti} /> */}
        {renderAnimations(emoji)}

        {/* <Confetti active={explosion} config={explosionConfig} /> */}

        {/* NEW STUFF */}
      </header>
    </div>
  );
}

export default App;
