// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const pointGesture = new GestureDescription("pointer");

// Thumb
pointGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.15);
pointGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
pointGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.83);
pointGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
pointGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);

// Index
pointGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
pointGesture.addDirection(Finger.Index, FingerDirection.VerticalUp, 0.47);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky]) {
  pointGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  //   pointGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  //   pointGesture.addDirection(finger, FingerDirection.VerticalDown, 0.85);
}

// pointGesture.name = "pointer"
