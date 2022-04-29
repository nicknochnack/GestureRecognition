// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const closedHandGesture = new GestureDescription("closed_hand");

// Thumb
closedHandGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.15);
closedHandGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);

for (let finger of [Finger.Middle, Finger.Ring, Finger.Pinky, Finger.Index]) {
  closedHandGesture.addCurl(finger, FingerCurl.FullCurl, 1);
}
