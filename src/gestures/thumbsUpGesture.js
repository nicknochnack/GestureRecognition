// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const thumbsUpGesture = new GestureDescription("thumbs_up");

// Thumb
thumbsUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1);
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1);
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight);
thumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft);

for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  thumbsUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
}
