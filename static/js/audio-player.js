(function () {
  function formatTime(seconds) {
    if (!seconds || !isFinite(seconds)) return "0:00";
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  function seekTo(clientX, rect, audio) {
    if (!audio.duration) return;
    var pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = pct * audio.duration;
  }

  document.querySelectorAll("[data-audio-player]").forEach(function (root) {
    var audio = root.querySelector("audio");
    if (!audio) return;

    var toggle = root.querySelector(".audio-toggle");
    var iconPlay = root.querySelector(".icon-play");
    var iconPause = root.querySelector(".icon-pause");
    var current = root.querySelector("[data-audio-current]");
    var duration = root.querySelector("[data-audio-duration]");
    var progress = root.querySelector("[data-audio-progress]");
    var slider = root.querySelector(".audio-slider");
    var speed = root.querySelector(".audio-speed");
    var dragging = false;

    function showPlaying(playing) {
      iconPlay.classList.toggle("hidden", playing);
      iconPause.classList.toggle("hidden", !playing);
      toggle.setAttribute("aria-label", playing ? "Pause" : "Play");
    }

    toggle.addEventListener("click", function () {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener("play", function () { showPlaying(true); });
    audio.addEventListener("pause", function () { showPlaying(false); });
    audio.addEventListener("ended", function () { showPlaying(false); });
    audio.addEventListener("loadedmetadata", function () {
      duration.textContent = formatTime(audio.duration);
    });
    if (audio.readyState >= 1) {
      duration.textContent = formatTime(audio.duration);
    }
    audio.addEventListener("timeupdate", function () {
      current.textContent = formatTime(audio.currentTime);
      var pct = audio.duration > 0 ? (audio.currentTime / audio.duration) * 100 : 0;
      progress.style.width = pct + "%";
    });

    slider.addEventListener("click", function (e) {
      seekTo(e.clientX, slider.getBoundingClientRect(), audio);
    });
    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("touchstart", startDrag, { passive: true });

    function startDrag(e) {
      dragging = true;
      seekTo(e.touches ? e.touches[0].clientX : e.clientX, slider.getBoundingClientRect(), audio);
    }

    function onMove(e) {
      if (!dragging) return;
      seekTo(e.touches ? e.touches[0].clientX : e.clientX, slider.getBoundingClientRect(), audio);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchend", endDrag);

    function endDrag() {
      dragging = false;
    }

    speed.addEventListener("change", function () {
      audio.playbackRate = parseFloat(speed.value);
    });
  });
})();
