"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as faceapi from "face-api.js";

interface FaceDetectionResult {
  isModelLoaded: boolean;
  isDetecting: boolean;
  eyeStatus: "Open" | "Closed" | "No Face";
  blinkCount: number;
  headPosition: "Center" | "Left" | "Right" | "Down";
  faceDetected: boolean;
  ear: number;
}

const EAR_THRESHOLD = 0.21;
const BLINK_FRAMES_THRESHOLD = 3;

export function useFaceDetection(videoRef: React.RefObject<HTMLVideoElement | null>, isCameraActive: boolean) {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [eyeStatus, setEyeStatus] = useState<"Open" | "Closed" | "No Face">("No Face");
  const [blinkCount, setBlinkCount] = useState(0);
  const [headPosition, setHeadPosition] = useState<"Center" | "Left" | "Right" | "Down">("Center");
  const [faceDetected, setFaceDetected] = useState(false);
  const [ear, setEar] = useState(0);

  const blinkFrameCountRef = useRef(0);
  const wasBlinkingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const isDetectingRef = useRef(false);
  const detectionCountRef = useRef(0);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const tinyFaceDetectorLoaded = await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
        const faceLandmark68Loaded = await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        console.log("Face API models loaded:", {
          tinyFaceDetector: tinyFaceDetectorLoaded,
          faceLandmark68: faceLandmark68Loaded,
        });
        setIsModelLoaded(true);
      } catch (error) {
        console.error("Error loading face-api models:", error);
      }
    };
    loadModels();
  }, []);

  const calculateEAR = useCallback((landmarks: faceapi.FaceLandmarks68) => {
    const leftEye = landmarks.getLeftEye();
    const rightEye = landmarks.getRightEye();

    const getEyeAspectRatio = (eye: faceapi.Point[]) => {
      const verticalDist1 = Math.hypot(eye[1].x - eye[5].x, eye[1].y - eye[5].y);
      const verticalDist2 = Math.hypot(eye[2].x - eye[4].x, eye[2].y - eye[4].y);
      const horizontalDist = Math.hypot(eye[0].x - eye[3].x, eye[0].y - eye[3].y);
      return (verticalDist1 + verticalDist2) / (2 * horizontalDist);
    };

    const leftEAR = getEyeAspectRatio(leftEye);
    const rightEAR = getEyeAspectRatio(rightEye);
    return (leftEAR + rightEAR) / 2;
  }, []);

  const detectHeadPosition = useCallback((landmarks: faceapi.FaceLandmarks68) => {
    const nose = landmarks.getNose();
    const jawline = landmarks.getJawOutline();
    const noseTip = nose[3];

    const faceCenterX = (jawline[0].x + jawline[16].x) / 2;
    const horizontalOffset = noseTip.x - faceCenterX;
    const faceWidth = jawline[16].x - jawline[0].x;

    if (Math.abs(horizontalOffset) < faceWidth * 0.1) return "Center";
    if (horizontalOffset < 0) return "Left";
    return "Right";
  }, []);

  const detect = useCallback(async () => {
    if (!videoRef.current || !isModelLoaded || !isCameraActive) {
      animationFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    const video = videoRef.current;
    if (video.paused || video.ended || !video.srcObject || video.readyState < 2) {
      animationFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    if (isDetectingRef.current) {
      animationFrameRef.current = requestAnimationFrame(detect);
      return;
    }

    try {
      isDetectingRef.current = true;
      setIsDetecting(true);
      detectionCountRef.current++;

      const detection = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions({
          inputSize: 416,
          scoreThreshold: 0.3,
        }))
        .withFaceLandmarks();

      if (detection) {
        setFaceDetected(true);
        const detectedEAR = calculateEAR(detection.landmarks);
        setEar(detectedEAR);

        const isEyeClosed = detectedEAR < EAR_THRESHOLD;
        setEyeStatus(isEyeClosed ? "Closed" : "Open");

        const detectedHeadPos = detectHeadPosition(detection.landmarks);
        setHeadPosition(detectedHeadPos);

        if (isEyeClosed) {
          blinkFrameCountRef.current++;
        } else {
          if (blinkFrameCountRef.current >= BLINK_FRAMES_THRESHOLD && !wasBlinkingRef.current) {
            setBlinkCount((prev) => prev + 1);
          }
          blinkFrameCountRef.current = 0;
          wasBlinkingRef.current = false;
        }

        if (isEyeClosed && blinkFrameCountRef.current >= BLINK_FRAMES_THRESHOLD) {
          wasBlinkingRef.current = true;
        }
      } else {
        setFaceDetected(false);
        setEyeStatus("No Face");
        setEar(0);
      }
    } catch (error) {
      console.error("Detection error:", error);
    } finally {
      isDetectingRef.current = false;
      setIsDetecting(false);
    }

    animationFrameRef.current = requestAnimationFrame(detect);
  }, [isModelLoaded, isCameraActive, videoRef, calculateEAR, detectHeadPosition]);

  useEffect(() => {
    if (isModelLoaded && isCameraActive) {
      animationFrameRef.current = requestAnimationFrame(detect);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isModelLoaded, isCameraActive, detect]);

  const resetBlinkCount = useCallback(() => {
    setBlinkCount(0);
  }, []);

  return {
    isModelLoaded,
    isDetecting,
    eyeStatus,
    blinkCount,
    headPosition,
    faceDetected,
    ear,
    resetBlinkCount,
  };
}
