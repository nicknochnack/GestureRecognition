// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const openHandGesture = new GestureDescription("open hand");

for (let finger of [
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
  Finger.Thumb,
  Finger.Index,
]) {
  openHandGesture.addCurl(finger, FingerCurl.NoCurl, 1);
}
