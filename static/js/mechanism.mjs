const idleSpeed = 0.075;

function clamp(value, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function progress(phase, start, end) {
  return clamp((phase - start) / (end - start));
}

function ease(value) {
  return value * value * (3 - 2 * value);
}

function mountMechanism(svg) {
  const parts = {};
  for (const name of ["marble", "die", "string", "gate", "brewer", "cup", "coffee", "drop", "steam", "counterweight", "weight-cable", "reset-comb", "bucket", "lift-belt", "runner", "front-arm", "back-arm", "front-leg", "back-leg", "front-knee", "back-knee", "front-elbow", "back-elbow", "front-foot", "back-foot", "running-belt", "running-pulley"]) {
    parts[name] = svg.querySelector(`[data-${name}]`);
  }
  const dominoes = Array.from(svg.querySelectorAll("[data-domino]"), function (element) {
    return { element, start: Number(element.dataset.at) };
  });
  const routes = {};
  for (const name of ["approach", "trail", "return"]) {
    const path = svg.querySelector(`#marble-${name}`);
    routes[name] = { path, length: path.getTotalLength() };
  }
  const motionAllowed = window.matchMedia("(prefers-reduced-motion: no-preference)");
  let phase = 0;
  let speed = idleSpeed;
  let target = idleSpeed;
  let previousPointer = null;
  let previousFrame = null;
  let frame = null;
  let visible = true;

  function pointOn(name, amount) {
    const route = routes[name];
    return route.path.getPointAtLength(clamp(amount) * route.length);
  }

  function place(marble, point) {
    marble.setAttribute("cx", point.x);
    marble.setAttribute("cy", point.y);
  }

  function render() {
    // Each stage shares one reversible timeline, so scrubbing cannot desync it.
    dominoes.forEach(function (domino, index) {
      const fall = ease(progress(phase, domino.start, domino.start + 0.065));
      const reset = ease(progress(phase, 0.85 + index * 0.004, 0.97 + index * 0.002));
      domino.element.setAttribute("transform", `rotate(${76 * fall * (1 - reset)})`);
    });
    const reset = ease(progress(phase, 0.85, 0.99));
    const tumble = ease(progress(phase, 0, 0.025)) * (1 - reset);
    const dieAngle = tumble * Math.PI / 2;
    const dieHeight = 6 * (Math.cos(dieAngle) + Math.sin(dieAngle));
    parts.die.setAttribute("transform", `translate(${14 + 10 * tumble} ${44 - dieHeight}) rotate(${90 * tumble})`);

    const stride = phase * Math.PI * 24;
    parts.runner.setAttribute("transform", "translate(48 144)");
    for (const [side, offset] of [["front", 0], ["back", Math.PI]]) {
      const swing = Math.sin(stride + offset);
      const thigh = 0.65 * swing;
      const shin = thigh - 1.3 * Math.max(0, -swing) - 0.1;
      const kneeX = -6 + 12 * Math.sin(thigh);
      const kneeY = 12 * Math.cos(thigh);
      const footX = kneeX + 12 * Math.sin(shin);
      const footY = kneeY + 12 * Math.cos(shin);
      parts[`${side}-leg`].setAttribute("d", `M-6 0 ${kneeX} ${kneeY} ${footX} ${footY}`);
      place(parts[`${side}-knee`], { x: kneeX, y: kneeY });
      parts[`${side}-foot`].setAttribute("transform", `translate(${footX} ${footY})`);
      const elbowX = -1 - 8 * swing;
      parts[`${side}-arm`].setAttribute("d", `M-1-17 ${elbowX} -9 ${elbowX + 6} -14`);
      place(parts[`${side}-elbow`], { x: elbowX, y: -9 });
    }
    parts["running-belt"].setAttribute("stroke-dashoffset", 288 * phase);
    parts["running-pulley"].setAttribute("transform", `rotate(${-4320 * phase})`);

    const pluck = progress(phase, 0.35, 0.45);
    const vibration = 5 * Math.sin(pluck * Math.PI * 12) * (1 - pluck);
    parts.string.setAttribute("d", `M158 39Q190 ${39 + vibration} 223 39`);
    const open = ease(progress(phase, 0.38, 0.41)) * (1 - ease(progress(phase, 0.88, 0.97)));
    parts.gate.setAttribute("transform", `rotate(${70 * open})`);

    const pour = ease(progress(phase, 0.73, 0.775)) * (1 - ease(progress(phase, 0.80, 0.84)));
    parts.brewer.setAttribute("transform", `rotate(${-25 * pour} 232 217)`);
    let marble;
    if (phase < 0.53) {
      marble = pointOn("approach", progress(phase, 0.41, 0.53) ** 1.3);
    } else if (phase < 0.73) {
      marble = pointOn("trail", progress(phase, 0.53, 0.73));
    } else if (phase < 0.84) {
      const radians = -25 * pour * Math.PI / 180;
      marble = {
        x: 372 - 11 * Math.cos(radians) + 18 * Math.sin(radians),
        y: 297 - 11 * Math.sin(radians) - 18 * Math.cos(radians),
      };
    } else {
      marble = pointOn("return", progress(phase, 0.84, 1));
    }
    place(parts.marble, marble);

    const drip = progress(phase, 0.78, 0.82);
    parts.drop.setAttribute("opacity", phase >= 0.78 && phase < 0.82 ? 1 : 0);
    parts.drop.setAttribute("transform", `translate(211 ${214 + 19 * drip * drip})`);
    const filled = ease(progress(phase, 0.82, 0.84)) * (1 - ease(progress(phase, 0.94, 1)));
    parts.coffee.setAttribute("opacity", filled);
    parts.cup.setAttribute("transform", `translate(0 ${2 * filled})`);
    parts.steam.setAttribute("opacity", 0.7 * filled);
    parts.steam.setAttribute("transform", `translate(0 ${-5 * progress(phase, 0.82, 1)})`);

    const tension = ease(progress(phase, 0.83, 0.90)) * (1 - ease(progress(phase, 0.94, 1)));
    parts.counterweight.setAttribute("transform", `translate(92 ${186 - 22 * tension})`);
    parts["weight-cable"].setAttribute("d", `M92 122v${64 - 22 * tension}`);
    parts["reset-comb"].setAttribute("transform", `translate(0 ${-7 * tension})`);
    const bucketY = phase < 0.84
      ? 81 + 212 * ease(progress(phase, 0, 0.6))
      : clamp(marble.y, 81, 293);
    parts.bucket.setAttribute("transform", `translate(622 ${bucketY})`);
    parts["lift-belt"].setAttribute("stroke-dashoffset", 293 - bucketY);
  }

  function tick(now) {
    const elapsed = previousFrame === null ? 0 : clamp((now - previousFrame) / 1000, 0, 0.05);
    previousFrame = now;
    if (!previousPointer || now - previousPointer.time > 180) target = idleSpeed;
    const decay = Math.exp(-elapsed * 5);
    const distance = target * elapsed + (speed - target) * (1 - decay) / 5;
    speed = target + (speed - target) * decay;
    phase = ((phase + distance) % 1 + 1) % 1;
    render();
    frame = window.requestAnimationFrame(tick);
  }

  function resetPointer() {
    previousPointer = null;
    target = idleSpeed;
  }

  function updatePlayback() {
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
    previousFrame = null;
    resetPointer();
    if (motionAllowed.matches && visible && !document.hidden) {
      frame = window.requestAnimationFrame(tick);
    } else {
      speed = idleSpeed;
    }
  }

  window.addEventListener("pointermove", function (event) {
    if (frame === null || event.pointerType !== "mouse") return;
    const now = performance.now();
    if (previousPointer && now - previousPointer.time < 180) {
      const distance = event.clientX - previousPointer.x - (event.clientY - previousPointer.y) * 0.5;
      const elapsed = Math.max(8, now - previousPointer.time);
      target = clamp(idleSpeed + distance / elapsed * 0.12, -0.3, 0.3);
    }
    previousPointer = { x: event.clientX, y: event.clientY, time: now };
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", resetPointer);
  window.addEventListener("blur", resetPointer);
  document.addEventListener("visibilitychange", updatePlayback);
  motionAllowed.addEventListener("change", updatePlayback);
  const observer = new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    updatePlayback();
  });
  observer.observe(svg);
  render();
  updatePlayback();
}

const svg = document.querySelector("[data-mechanism]");
if (svg) mountMechanism(svg);
