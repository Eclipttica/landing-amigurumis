"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

const getMotionPreference = () => window.matchMedia(motionQuery).matches;
const getServerMotionPreference = () => true;

export function AmbientVideo({
  src,
  poster,
  alt,
  className = "",
  sizes = "(max-width: 700px) 45vw, 260px",
}: {
  src?: string;
  poster: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getMotionPreference,
    getServerMotionPreference,
  );
  const [canLoad, setCanLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!src || reducedMotion !== false) return;

    let idleCallback: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const loadWhenIdle = () => {
      if ("requestIdleCallback" in window) {
        idleCallback = window.requestIdleCallback(() => setCanLoad(true), {
          timeout: 2000,
        });
      } else {
        timer = setTimeout(() => setCanLoad(true), 300);
      }
    };

    if (document.readyState === "complete") loadWhenIdle();
    else window.addEventListener("load", loadWhenIdle, { once: true });

    return () => {
      window.removeEventListener("load", loadWhenIdle);
      if (idleCallback !== undefined) window.cancelIdleCallback(idleCallback);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [src, reducedMotion]);

  useEffect(() => {
    const element = video.current;
    if (!element) return;

    const syncPlayback = () => {
      if (document.visibilityState === "visible" && reducedMotion === false) {
        element.play().catch(() => {});
      } else {
        element.pause();
      }
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      document.removeEventListener("visibilitychange", syncPlayback);
      element.pause();
    };
  }, [canLoad, reducedMotion, src, failed]);

  return (
    <div className={`ambient-video ${className}`}>
      <Image src={poster} alt={alt} fill sizes={sizes} />
      {src && canLoad && reducedMotion === false && !failed && (
        <video
          ref={video}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          aria-hidden="true"
          preload="none"
          poster={poster}
          className={`ambient-video__player${playing ? " is-playing" : ""}`}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
