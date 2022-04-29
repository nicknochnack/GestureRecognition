// Import dependencies
import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

export const victoryGesture = new GestureDescription("victory");

// index and middle finger: stretched out
victoryGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1);
victoryGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1);

// ring: curled
victoryGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.95);
victoryGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.75);

// pinky: curled
victoryGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 0.95);
victoryGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.75);

// thumb can be either stretched out or half curled
victoryGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.8);
victoryGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.65);
