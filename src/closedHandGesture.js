// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const closedHandGesture = new GestureDescription("closed hand");

for (let finger of [
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
  Finger.Thumb,
  Finger.Index,
]) {
  closedHandGesture.addCurl(finger, FingerCurl.FullCurl, 1);
}
