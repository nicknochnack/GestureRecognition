import {
  GestureDescription,
  Finger,
  FingerCurl,
  FingerDirection,
} from "fingerpose";

const OpenHandGesture = new GestureDescription("open_hand"); // 🖐
const FistGesture = new GestureDescription("fist"); //  ✊
const VictoryGesture = new GestureDescription("victory"); // ✌️
const PointerGesture = new GestureDescription("pointer"); // ☝
const RadGesture = new GestureDescription("rad"); // 🤟
const ThumbsUpGesture = new GestureDescription("thumbs_up"); //  👍
const ThumbsDownGesture = new GestureDescription("thumbs_down"); //👎

// Open Hand
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  OpenHandGesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
}

// Fist
// -----------------------------------------------------------------------------
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  FistGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
}

FistGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
FistGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 1.0);
// FistGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
// FistGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);

// Victory
//------------------------------------------------------------------------------

// index and middle finger: stretched out
VictoryGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
VictoryGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0);

// ring: curled
VictoryGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
VictoryGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.8);

// pinky: curled
VictoryGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);
VictoryGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.8);

// Pointer
//------------------------------------------------------------------------------

// index finger: stretched out
PointerGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);

// middle: curled
PointerGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);

// ring: curled
PointerGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);

// pinky: curled
PointerGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0);

// Rad Gesture
//------------------------------------------------------------------------------

// index finger: stretched out
RadGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0);
RadGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 1.0);

// pinky finger: stretched out
RadGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0);
RadGesture.addDirection(Finger.Pinky, FingerDirection.VerticalUp, 1.0);

// middle finger : curled
RadGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0);
RadGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9);

// ring finger : curled
RadGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0);
RadGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9);

// Thumbs up
//------------------------------------------------------------------------------

// thumb: no curl
// accept no curl with a bit lower confidence
ThumbsUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
ThumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.95);
ThumbsUpGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalUpRight,
  0.5
);
ThumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.5);

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ThumbsUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  ThumbsUpGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
}

// Thumbs down
//------------------------------------------------------------------------------

// thumb: no curl
// accept no curl with a bit lower confidence
// ThumbsDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0);
// ThumbsDownGesture.addDirection(
//   Finger.Thumb,
//   FingerDirection.VerticalDown,
//   0.95
// );

// // all other fingers: curled
// for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
//   ThumbsDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
//   ThumbsDownGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9);
// }

export {
  OpenHandGesture,
  VictoryGesture,
  PointerGesture,
  RadGesture,
  ThumbsUpGesture,
  ThumbsDownGesture,
  FistGesture,
};
