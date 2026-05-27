const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/+*-";

function scramblePart(element, finalText, duration = 850, delay = 0) {
  const start = performance.now() + delay;
  const length = finalText.length;

  function frame(now) {
    if (now < start) {
      requestAnimationFrame(frame);
      return;
    }

    const progress = Math.min((now - start) / duration, 1);
    const lockCount = Math.floor(progress * length);
    let output = "";

    for (let index = 0; index < length; index += 1) {
      if (index < lockCount || progress === 1) {
        output += finalText[index];
      } else {
        const randomIndex = Math.floor(Math.random() * scrambleChars.length);
        output += scrambleChars[randomIndex];
      }
    }

    element.textContent = output;

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

window.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".mega-title");
  const left = document.querySelector(".mega-title__part--left");
  const right = document.querySelector(".mega-title__part--right");

  if (title && left && right) {
    title.classList.add("is-scrambling");
    scramblePart(left, "AS", 760, 90);
    scramblePart(right, "TA", 820, 220);

    window.setTimeout(() => {
      left.textContent = "AS";
      right.textContent = "TA";
      title.classList.remove("is-scrambling");
    }, 1120);
  }

  initDecorativeLoops();
  initHeroAmbientText();
  initInfoCardTilt();
  initDevilTuner();
  initCharacterMaskReveal();
});

function initDecorativeLoops() {
  if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  gsap.defaults({ ease: "sine.inOut" });

  gsap.to(".side-rail span", {
    opacity: 0.28,
    scale: 1.45,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    transformOrigin: "center center",
  });

  gsap.to(".side-rail b", {
    opacity: 0.34,
    boxShadow: "0 0 10px rgba(255, 30, 60, 0.42)",
    duration: 2.2,
    repeat: -1,
    yoyo: true,
    stagger: 0.42,
  });

  gsap.to(".side-rail em", {
    rotation: 90,
    scale: 0.9,
    opacity: 0.72,
    duration: 4.8,
    repeat: -1,
    yoyo: true,
    transformOrigin: "center center",
  });

  gsap.to(".side-rail__line", {
    opacity: 0.45,
    duration: 2.6,
    repeat: -1,
    yoyo: true,
  });

  gsap.to(".mini-box", {
    opacity: 0.42,
    scale: 1.18,
    boxShadow: "0 0 10px rgba(255, 30, 60, 0.48)",
    duration: 1.7,
    repeat: -1,
    yoyo: true,
    transformOrigin: "center center",
  });

  gsap.to(".barcode", {
    opacity: 0.58,
    x: 4,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
  });

  gsap.to(".plus", {
    rotation: 180,
    scale: 1.12,
    duration: 5.2,
    repeat: -1,
    yoyo: true,
    transformOrigin: "center center",
  });

  gsap.to(".hairline", {
    opacity: 0.42,
    scaleX: 0.92,
    duration: 2.8,
    repeat: -1,
    yoyo: true,
    transformOrigin: "right center",
  });

  gsap.to(".hairline i", {
    opacity: 0.28,
    scale: 1.6,
    duration: 1.55,
    repeat: -1,
    yoyo: true,
  });
}

function scrambleToText(element, finalText, options = {}) {
  const chars = options.chars || "アイウエオカキクケコサシスセソタチツテトナニヌネノ魔法剣限界未来運命王";
  const duration = options.duration || 760;
  const start = performance.now();
  const maxLength = Math.max(element.textContent.length, finalText.length);

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const lockCount = Math.floor(progress * finalText.length);
    let output = "";

    for (let index = 0; index < maxLength; index += 1) {
      if (index < lockCount || progress === 1) {
        output += finalText[index] || "";
      } else if (index < finalText.length) {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }

    element.textContent = output;

    if (progress < 1) {
      requestAnimationFrame(frame);
    }
  }

  requestAnimationFrame(frame);
}

function initHeroAmbientText() {
  const seriesTag = document.querySelector(".series-tag");
  const quoteTitle = document.querySelector(".quote-panel h2");

  if (seriesTag && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.setInterval(() => {
      seriesTag.classList.add("is-glitching");
      window.setTimeout(() => seriesTag.classList.remove("is-glitching"), 620);
    }, 4300);
  }

  if (!quoteTitle) return;

  const quotes = [
    "未来は自分で切り開く。",
    "限界を超えて進め。",
    "運命はこの手で掴む。",
  ];
  let quoteIndex = 0;

  window.setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    scrambleToText(quoteTitle, quotes[quoteIndex], { duration: 820 });
  }, 5200);
}

function initInfoCardTilt() {
  const card = document.querySelector(".info-card");

  if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const reset = () => {
    card.style.setProperty("--card-tilt-x", "0deg");
    card.style.setProperty("--card-tilt-y", "0deg");
    card.style.setProperty("--card-glare-x", "50%");
    card.style.setProperty("--card-glare-y", "50%");
  };

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const glareX = ((event.clientX - rect.left) / rect.width) * 100;
    const glareY = ((event.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--card-tilt-x", `${(x * 15).toFixed(2)}deg`);
    card.style.setProperty("--card-tilt-y", `${(-y * 12).toFixed(2)}deg`);
    card.style.setProperty("--card-glare-x", `${glareX.toFixed(1)}%`);
    card.style.setProperty("--card-glare-y", `${glareY.toFixed(1)}%`);
  });

  card.addEventListener("pointerleave", reset);
}

function initDevilTuner() {
  const panel = document.querySelector(".devil-tuner");
  const stack = document.querySelector(".character-stack");

  if (!panel || !stack) return;

  const controls = {
    scale: panel.querySelector('[data-devil-control="scale"]'),
    x: panel.querySelector('[data-devil-control="x"]'),
    y: panel.querySelector('[data-devil-control="y"]'),
  };
  const outputs = {
    scale: panel.querySelector('[data-devil-output="scale"]'),
    x: panel.querySelector('[data-devil-output="x"]'),
    y: panel.querySelector('[data-devil-output="y"]'),
  };
  const resetButton = panel.querySelector(".devil-tuner__reset");
  const storageKey = "asta-devil-image-controls";
  const panelStorageKey = "asta-devil-tuner-minimized";
  const toggleButton = panel.querySelector(".devil-tuner__toggle");

  const readDefaults = () => {
    const styles = getComputedStyle(stack);
    return {
      scale: parseFloat(styles.getPropertyValue("--devil-scale")) || 1,
      x: parseFloat(styles.getPropertyValue("--devil-x")) || 0,
      y: parseFloat(styles.getPropertyValue("--devil-y")) || 0,
    };
  };

  const defaults = readDefaults();

  const loadSaved = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (!saved) return defaults;
      return {
        scale: Number.isFinite(saved.scale) ? saved.scale : defaults.scale,
        x: Number.isFinite(saved.x) ? saved.x : defaults.x,
        y: Number.isFinite(saved.y) ? saved.y : defaults.y,
      };
    } catch {
      return defaults;
    }
  };

  const format = (key, value) => (key === "scale" ? value.toFixed(2) : `${value.toFixed(1)}%`);

  const applyValues = (values, shouldSave = true) => {
    stack.style.setProperty("--devil-scale", values.scale);
    stack.style.setProperty("--devil-x", `${values.x}%`);
    stack.style.setProperty("--devil-y", `${values.y}%`);

    controls.scale.value = values.scale;
    controls.x.value = values.x;
    controls.y.value = values.y;

    outputs.scale.textContent = format("scale", values.scale);
    outputs.x.textContent = format("x", values.x);
    outputs.y.textContent = format("y", values.y);

    if (shouldSave) {
      localStorage.setItem(storageKey, JSON.stringify(values));
    }

    window.dispatchEvent(new CustomEvent("devilControls:update"));
  };

  let values = loadSaved();
  applyValues(values, false);

  const setPanelMinimized = (isMinimized) => {
    panel.classList.toggle("is-minimized", isMinimized);
    toggleButton.setAttribute("aria-expanded", String(!isMinimized));
    toggleButton.setAttribute(
      "aria-label",
      isMinimized ? "Open Devil image controls" : "Minimize Devil image controls",
    );
    localStorage.setItem(panelStorageKey, String(isMinimized));
  };

  setPanelMinimized(localStorage.getItem(panelStorageKey) === "true");

  toggleButton.addEventListener("click", () => {
    setPanelMinimized(!panel.classList.contains("is-minimized"));
  });

  Object.entries(controls).forEach(([key, control]) => {
    control.addEventListener("input", () => {
      values = {
        ...values,
        [key]: parseFloat(control.value),
      };
      applyValues(values);
    });
  });

  resetButton.addEventListener("click", () => {
    values = { ...defaults };
    localStorage.removeItem(storageKey);
    applyValues(values, false);
  });
}

function initCharacterMaskReveal() {
  const stack = document.querySelector(".character-stack");
  const canvas = document.querySelector(".framer-reveal-canvas");
  const devil = document.querySelector(".character--devil");

  if (!stack || !canvas || !devil || !window.THREE) return;

  const THREE = window.THREE;
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    premultipliedAlpha: false,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  const clock = new THREE.Clock();
  const uniforms = {
    time: { value: 0 },
    dTime: { value: 0 },
    aspect: { value: 1 },
    pointer: { value: new THREE.Vector2(10, 10) },
    pointerRadius: { value: 0.33 },
    pointerDuration: { value: 1.0 },
    prevFrame: { value: null },
    revealMap: { value: null },
  };

  let width = 1;
  let height = 1;
  let rtOutput;
  let rtPrevious;
  let blobScene;
  let blobCamera;
  let revealMesh;
  let animationFrame;
  let isReady = false;

  const blobMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time, dTime, aspect, pointerRadius, pointerDuration;
      uniform vec2 pointer;
      uniform sampler2D prevFrame;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        float rVal = texture2D(prevFrame, vUv).r;
        rVal -= clamp(dTime / pointerDuration, 0.0, 0.05);
        rVal = clamp(rVal, 0.0, 1.0);

        vec2 uv = (vUv - 0.5) * 2.0 * vec2(aspect, 1.0);
        vec2 mouse = pointer * vec2(aspect, 1.0);
        vec2 toMouse = uv - mouse;
        float angle = atan(toMouse.y, toMouse.x);
        float dist = length(toMouse);

        float noiseVal = noise(vec2(angle * 3.0 + time * 0.5, dist * 5.0));
        float noiseVal2 = noise(vec2(angle * 5.0 - time * 0.3, dist * 3.0 + time));
        float radiusVariation = 0.72 + noiseVal * 0.42 + noiseVal2 * 0.24;
        float organicRadius = pointerRadius * radiusVariation;
        float f = 1.0 - smoothstep(organicRadius * 0.05, organicRadius * 1.2, dist);
        f *= 0.78 + noiseVal * 0.22;

        rVal += f * 0.25;
        rVal = clamp(rVal, 0.0, 1.0);
        gl_FragColor = vec4(vec3(rVal), 1.0);
      }
    `,
  });

  const revealMaterial = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    vertexShader: `
      varying vec2 vUv;
      varying vec4 vPosProj;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vPosProj = gl_Position;
      }
    `,
    fragmentShader: `
      uniform sampler2D prevFrame;
      uniform sampler2D revealMap;
      varying vec2 vUv;
      varying vec4 vPosProj;

      void main() {
        vec2 blobUv = ((vPosProj.xy / vPosProj.w) + 1.0) * 0.5;
        float blob = texture2D(prevFrame, blobUv).r;
        float alpha = smoothstep(0.03, 0.42, blob);
        vec4 texColor = texture2D(revealMap, vUv);
        gl_FragColor = vec4(texColor.rgb, texColor.a * alpha);
      }
    `,
  });

  const makeTarget = () =>
    new THREE.WebGLRenderTarget(width, height, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    });

  const disposeTargets = () => {
    if (rtOutput) rtOutput.dispose();
    if (rtPrevious) rtPrevious.dispose();
  };

  const resize = () => {
    const rect = stack.getBoundingClientRect();
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));

    renderer.setSize(width, height, false);
    uniforms.aspect.value = width / height;

    camera.left = width / -2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / -2;
    camera.updateProjectionMatrix();

    disposeTargets();
    rtOutput = makeTarget();
    rtPrevious = makeTarget();
    uniforms.prevFrame.value = rtPrevious.texture;

    if (revealMesh) {
      const styles = getComputedStyle(stack);
      const x = parseFloat(styles.getPropertyValue("--devil-x")) / 100 || 0;
      const y = parseFloat(styles.getPropertyValue("--devil-y")) / 100 || 0;
      const scale = parseFloat(styles.getPropertyValue("--devil-scale")) || 1;
      const bottomLockY = (scale - 1) / 2;
      revealMesh.geometry.dispose();
      revealMesh.geometry = new THREE.PlaneGeometry(width * scale, height * scale);
      revealMesh.position.x = width * x;
      revealMesh.position.y = height * bottomLockY - height * y;
    }
  };

  const renderBlob = () => {
    renderer.setRenderTarget(rtOutput);
    renderer.render(blobScene, blobCamera);
    renderer.setRenderTarget(null);

    const temp = rtPrevious;
    rtPrevious = rtOutput;
    rtOutput = temp;
    uniforms.prevFrame.value = rtPrevious.texture;
  };

  const animate = () => {
    const dt = clock.getDelta();
    uniforms.time.value += dt;
    uniforms.dTime.value = dt;

    renderBlob();
    renderer.clear();
    renderer.render(scene, camera);

    animationFrame = requestAnimationFrame(animate);
  };

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(devil.getAttribute("src"), (texture) => {
    texture.encoding = THREE.sRGBEncoding;
    uniforms.revealMap.value = texture;

    blobScene = new THREE.Scene();
    blobCamera = new THREE.Camera();
    blobScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), blobMaterial));

    revealMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), revealMaterial);
    scene.add(revealMesh);

    resize();
    isReady = true;
    animate();
  });

  const movePointer = (event) => {
    if (!isReady) return;
    const rect = stack.getBoundingClientRect();
    uniforms.pointer.value.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    uniforms.pointer.value.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const hidePointer = () => {
    uniforms.pointer.value.set(10, 10);
  };

  stack.addEventListener("pointermove", movePointer);
  stack.addEventListener("pointerleave", hidePointer);
  window.addEventListener("resize", resize);
  window.addEventListener("devilControls:update", resize);
}
