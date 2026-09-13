import { useState, useRef, useEffect, useCallback } from "react";

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  const audio = audioRef.current;

  const togglePlay = useCallback(() => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  }, [audio]);

  const calcSeek = useCallback((clientX, rect) => {
    if (!audio || !duration) return;
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = pct * duration;
  }, [audio, duration]);

  const seek = useCallback((e) => {
    calcSeek(e.clientX, e.currentTarget.getBoundingClientRect());
  }, [calcSeek]);

  const sliderRef = useRef(null);
  const dragging = useRef(false);

  const onDragStart = useCallback((e) => {
    dragging.current = true;
    const rect = sliderRef.current.getBoundingClientRect();
    calcSeek(e.touches ? e.touches[0].clientX : e.clientX, rect);
  }, [calcSeek]);

  const onDragMove = useCallback((e) => {
    if (!dragging.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    calcSeek(e.touches ? e.touches[0].clientX : e.clientX, rect);
  }, [calcSeek]);

  const onDragEnd = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onDragMove);
    window.addEventListener("mouseup", onDragEnd);
    window.addEventListener("touchmove", onDragMove);
    window.addEventListener("touchend", onDragEnd);
    return () => {
      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("mouseup", onDragEnd);
      window.removeEventListener("touchmove", onDragMove);
      window.removeEventListener("touchend", onDragEnd);
    };
  }, [onDragMove, onDragEnd]);

  const setPlaybackSpeed = useCallback((newSpeed) => {
    if (!audio) return;
    audio.playbackRate = newSpeed;
    setSpeed(newSpeed);
  }, [audio]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onLoaded = () => setDuration(el.duration);
    const onTime = () => setCurrentTime(el.currentTime);
    const onEnded = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    el.addEventListener("loadedmetadata", onLoaded);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnded);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);

    if (el.readyState >= 1) onLoaded();

    return () => {
      el.removeEventListener("loadedmetadata", onLoaded);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
    };
  }, [src]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="my-6 border border-gray-200 rounded-lg px-3 py-2">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="text-xs text-gray-500 mb-1.5">Listen to this post</div>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-8 h-8 text-gray-700 hover:opacity-70 transition-opacity shrink-0"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="5,1 15,8 5,15" />
            </svg>
          )}
        </button>

        <span className="text-xs text-gray-500 tabular-nums shrink-0 w-[50px]">
          {formatTime(currentTime)}
        </span>

        <div
          ref={sliderRef}
          className="flex-1 h-1 bg-gray-200 rounded-full cursor-pointer relative"
          onClick={seek}
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
        >
          <div
            className="h-full bg-gray-700 rounded-full absolute top-0 left-0"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs text-gray-500 tabular-nums shrink-0 w-[50px] text-right">
          {formatTime(duration)}
        </span>

        <select
          value={speed}
          onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
          className="text-xs bg-transparent text-gray-500 cursor-pointer focus:outline-none appearance-none shrink-0"
          aria-label="Playback speed"
        >
          {SPEEDS.map((s) => (
            <option key={s} value={s}>{s}x</option>
          ))}
        </select>
      </div>
    </div>
  );
}