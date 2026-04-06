class TouchTexture {
  constructor() {
    this.size = 64;
    this.width = this.height = this.size;
    this.maxAge = 64;
    this.radius = 0.25 * this.size;
    this.speed = 1 / this.maxAge;
    this.trail = [];
    this.last = null;
    this.initTexture();
  }

  initTexture() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.texture = new THREE.Texture(this.canvas);
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTouch(point) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    if (this.last) {
      const dx = point.x - this.last.x;
      const dy = point.y - this.last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / d;
      vy = dy / d;
      force = Math.min(dd * 20000, 2.0);
    }
    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  drawPoint(point) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    intensity *= point.force;

    const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${intensity * 255}`;
    const offset = this.size * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = this.radius;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(pos.x - offset, pos.y - offset, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }

  update() {
    this.clear();
    for (let i = this.trail.length - 1; i >= 0; i -= 1) {
      const point = this.trail[i];
      const f = point.force * this.speed * (1 - point.age / this.maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age += 1;
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(point);
      }
    }
    this.texture.needsUpdate = true;
  }
}

class GradientBackground {
  constructor(sceneManager) {
    this.sceneManager = sceneManager;
    this.mesh = null;
    this.uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uColor1: { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor2: { value: new THREE.Vector3(0.0, 0.259, 0.22) },
      uColor3: { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor4: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
      uColor5: { value: new THREE.Vector3(0.945, 0.353, 0.133) },
      uColor6: { value: new THREE.Vector3(0.0, 0.0, 0.0) },
      uSpeed: { value: 1.5 },
      uIntensity: { value: 1.8 },
      uTouchTexture: { value: null },
      uGrainIntensity: { value: 0.08 },
      uDarkNavy: { value: new THREE.Vector3(0.039, 0.055, 0.153) },
      uGradientSize: { value: 0.45 },
      uGradientCount: { value: 12.0 },
      uColor1Weight: { value: 0.5 },
      uColor2Weight: { value: 1.8 }
    };
  }

  init() {
    const size = this.sceneManager.getViewSize();
    const geometry = new THREE.PlaneGeometry(size.width, size.height, 1, 1);

    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz, 1.0);
          vUv = uv;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        uniform vec3 uColor4;
        uniform vec3 uColor5;
        uniform vec3 uColor6;
        uniform float uSpeed;
        uniform float uIntensity;
        uniform sampler2D uTouchTexture;
        uniform float uGrainIntensity;
        uniform vec3 uDarkNavy;
        uniform float uGradientSize;
        uniform float uGradientCount;
        uniform float uColor1Weight;
        uniform float uColor2Weight;
        varying vec2 vUv;

        float grain(vec2 uv, float time) {
          vec2 g = uv * uResolution * 0.5;
          float n = fract(sin(dot(g + time, vec2(12.9898, 78.233))) * 43758.5453);
          return n * 2.0 - 1.0;
        }

        vec3 getGradientColor(vec2 uv, float time) {
          float r = uGradientSize;
          vec2 c1 = vec2(0.5 + sin(time * uSpeed * 0.4) * 0.4, 0.5 + cos(time * uSpeed * 0.5) * 0.4);
          vec2 c2 = vec2(0.5 + cos(time * uSpeed * 0.6) * 0.5, 0.5 + sin(time * uSpeed * 0.45) * 0.5);
          vec2 c3 = vec2(0.5 + sin(time * uSpeed * 0.35) * 0.45, 0.5 + cos(time * uSpeed * 0.55) * 0.45);
          vec2 c4 = vec2(0.5 + cos(time * uSpeed * 0.5) * 0.4, 0.5 + sin(time * uSpeed * 0.4) * 0.4);
          vec2 c5 = vec2(0.5 + sin(time * uSpeed * 0.7) * 0.35, 0.5 + cos(time * uSpeed * 0.6) * 0.35);
          vec2 c6 = vec2(0.5 + cos(time * uSpeed * 0.45) * 0.5, 0.5 + sin(time * uSpeed * 0.65) * 0.5);
          vec2 c7 = vec2(0.5 + sin(time * uSpeed * 0.55) * 0.38, 0.5 + cos(time * uSpeed * 0.48) * 0.42);
          vec2 c8 = vec2(0.5 + cos(time * uSpeed * 0.65) * 0.36, 0.5 + sin(time * uSpeed * 0.52) * 0.44);
          vec2 c9 = vec2(0.5 + sin(time * uSpeed * 0.42) * 0.41, 0.5 + cos(time * uSpeed * 0.58) * 0.39);
          vec2 c10 = vec2(0.5 + cos(time * uSpeed * 0.48) * 0.37, 0.5 + sin(time * uSpeed * 0.62) * 0.43);
          vec2 c11 = vec2(0.5 + sin(time * uSpeed * 0.68) * 0.33, 0.5 + cos(time * uSpeed * 0.44) * 0.46);
          vec2 c12 = vec2(0.5 + cos(time * uSpeed * 0.38) * 0.39, 0.5 + sin(time * uSpeed * 0.56) * 0.41);

          float i1 = 1.0 - smoothstep(0.0, r, length(uv - c1));
          float i2 = 1.0 - smoothstep(0.0, r, length(uv - c2));
          float i3 = 1.0 - smoothstep(0.0, r, length(uv - c3));
          float i4 = 1.0 - smoothstep(0.0, r, length(uv - c4));
          float i5 = 1.0 - smoothstep(0.0, r, length(uv - c5));
          float i6 = 1.0 - smoothstep(0.0, r, length(uv - c6));
          float i7 = 1.0 - smoothstep(0.0, r, length(uv - c7));
          float i8 = 1.0 - smoothstep(0.0, r, length(uv - c8));
          float i9 = 1.0 - smoothstep(0.0, r, length(uv - c9));
          float i10 = 1.0 - smoothstep(0.0, r, length(uv - c10));
          float i11 = 1.0 - smoothstep(0.0, r, length(uv - c11));
          float i12 = 1.0 - smoothstep(0.0, r, length(uv - c12));

          vec3 color = vec3(0.0);
          color += uColor1 * i1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
          color += uColor2 * i2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
          color += uColor3 * i3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
          color += uColor4 * i4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
          color += uColor5 * i5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
          color += uColor6 * i6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;

          if (uGradientCount > 6.0) {
            color += uColor1 * i7 * (0.55 + 0.45 * sin(time * uSpeed * 1.4)) * uColor1Weight;
            color += uColor2 * i8 * (0.55 + 0.45 * cos(time * uSpeed * 1.5)) * uColor2Weight;
            color += uColor3 * i9 * (0.55 + 0.45 * sin(time * uSpeed * 1.6)) * uColor1Weight;
            color += uColor4 * i10 * (0.55 + 0.45 * cos(time * uSpeed * 1.7)) * uColor2Weight;
          }
          if (uGradientCount > 10.0) {
            color += uColor5 * i11 * (0.55 + 0.45 * sin(time * uSpeed * 1.8)) * uColor1Weight;
            color += uColor6 * i12 * (0.55 + 0.45 * cos(time * uSpeed * 1.9)) * uColor2Weight;
          }

          color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;
          float lum = dot(color, vec3(0.299, 0.587, 0.114));
          color = mix(vec3(lum), color, 1.35);
          color = pow(color, vec3(0.92));

          float bright = length(color);
          color = mix(uDarkNavy, color, max(bright * 1.2, 0.15));
          return clamp(color, vec3(0.0), vec3(1.0));
        }

        void main() {
          vec2 uv = vUv;
          vec4 touchTex = texture2D(uTouchTexture, uv);
          float vx = -(touchTex.r * 2.0 - 1.0);
          float vy = -(touchTex.g * 2.0 - 1.0);
          float intensity = touchTex.b;
          uv.x += vx * 0.8 * intensity;
          uv.y += vy * 0.8 * intensity;

          vec2 center = vec2(0.5);
          float dist = length(uv - center);
          float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
          float wave = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
          uv += vec2(ripple + wave);

          vec3 color = getGradientColor(uv, uTime);
          color += grain(uv, uTime) * uGrainIntensity;

          float t = uTime * 0.5;
          color.r += sin(t) * 0.02;
          color.g += cos(t * 1.4) * 0.02;
          color.b += sin(t * 1.2) * 0.02;

          gl_FragColor = vec4(clamp(color, vec3(0.0), vec3(1.0)), 1.0);
        }
      `
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.sceneManager.scene.add(this.mesh);
  }

  update(delta) {
    this.uniforms.uTime.value += delta;
  }

  onResize(width, height) {
    const size = this.sceneManager.getViewSize();
    if (this.mesh) {
      this.mesh.geometry.dispose();
      this.mesh.geometry = new THREE.PlaneGeometry(size.width, size.height, 1, 1);
    }
    this.uniforms.uResolution.value.set(width, height);
  }
}

class App {
  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.domElement.id = "webGLApp";
    document.body.prepend(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    this.camera.position.z = 50;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0e27);
    this.clock = new THREE.Clock();

    this.touchTexture = new TouchTexture();
    this.gradientBackground = new GradientBackground(this);
    this.gradientBackground.uniforms.uTouchTexture.value = this.touchTexture.texture;

    this.init();
  }

  init() {
    this.gradientBackground.init();
    this.tick();

    window.addEventListener("resize", () => this.onResize());
    window.addEventListener("mousemove", (ev) => this.onPointerMove(ev.clientX, ev.clientY));
    window.addEventListener("touchmove", (ev) => {
      const t = ev.touches[0];
      if (t) this.onPointerMove(t.clientX, t.clientY);
    });
  }

  onPointerMove(x, y) {
    this.touchTexture.addTouch({ x: x / window.innerWidth, y: 1 - y / window.innerHeight });
  }

  getViewSize() {
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = Math.abs(this.camera.position.z * Math.tan(fov / 2) * 2);
    return { width: height * this.camera.aspect, height };
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.gradientBackground.onResize(window.innerWidth, window.innerHeight);
  }

  tick() {
    const delta = Math.min(this.clock.getDelta(), 0.1);
    this.touchTexture.update();
    this.gradientBackground.update(delta);
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.tick());
  }
}

new App();

function initMediaSkeletons() {
  const mediaNodes = document.querySelectorAll(
    ".hero-images img, .about-image-wrap img, .toolkit-image-wrap img, .contact-image-wrap img, .project-media-shell img, .project-video-shell iframe"
  );

  const markReady = (node) => {
    node.classList.add("is-ready");
    const shell = node.closest(".project-media-shell, .project-video-shell");
    if (shell) shell.classList.add("is-ready");
  };

  mediaNodes.forEach((node) => {
    if (node.tagName === "IMG") {
      if (node.complete && node.naturalWidth > 0) {
        markReady(node);
      } else {
        node.addEventListener("load", () => markReady(node), { once: true });
        node.addEventListener("error", () => markReady(node), { once: true });
      }
      return;
    }

    node.addEventListener("load", () => markReady(node), { once: true });
    setTimeout(() => markReady(node), 4500);
  });
}

initMediaSkeletons();

let pageScroller = null;
let navScrollLock = false;
let navScrollLockTimer = null;

function setupHorizontalScrollEffect() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof LocomotiveScroll === "undefined") {
    return;
  }

  const pageContainer = document.querySelector(".container");
  const pinWrap = document.querySelector(".pin-wrap");
  const sectionPin = document.querySelector("#sectionPin");
  if (!pageContainer || !pinWrap || !sectionPin) return;

  gsap.registerPlugin(ScrollTrigger);

  const scroller = new LocomotiveScroll({
    el: pageContainer,
    smooth: true
  });
  pageScroller = scroller;

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(pageContainer, {
    scrollTop(value) {
      return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: pageContainer.style.transform ? "transform" : "fixed"
  });

  const buildHorizontalTween = () => {
    const getHorizontalScrollLength = () => Math.max(0, pinWrap.scrollWidth - window.innerWidth);
    const getDesktopEndLength = () => pinWrap.offsetWidth;
    const isMobileViewport = () => window.innerWidth <= 760;

    gsap.to(pinWrap, {
      x: () => -getHorizontalScrollLength(),
      ease: "none",
      scrollTrigger: {
        scroller: pageContainer,
        trigger: sectionPin,
        scrub: true,
        pin: true,
        start: "top top",
        end: () => `+=${isMobileViewport() ? getHorizontalScrollLength() : getDesktopEndLength()}`,
        invalidateOnRefresh: true
      }
    });
  };

  buildHorizontalTween();

  const sectionSyncMap = [
    { hash: "#home", target: document.querySelector(".hero") },
    { hash: "#about", target: document.querySelector("#about") },
    { hash: "#toolkit", target: document.querySelector("#toolkit") },
    { hash: "#sectionPin", target: document.querySelector("#sectionPin") },
    { hash: "#contact", target: document.querySelector("#contact") }
  ];

  sectionSyncMap.forEach(({ hash, target }) => {
    if (!target) return;
    ScrollTrigger.create({
      scroller: pageContainer,
      trigger: target,
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (!navScrollLock) activateNavByHash(hash);
      },
      onEnterBack: () => {
        if (!navScrollLock) activateNavByHash(hash);
      }
    });
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}

window.addEventListener("load", setupHorizontalScrollEffect);

const siteHeader = document.querySelector(".site-header");
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelectorAll("#mainNav a");
const mainNav = document.getElementById("mainNav");
const navSlider = mainNav ? mainNav.querySelector(".nav-slider") : null;

function setActiveNavLink(targetLink) {
  if (!mainNav || !targetLink) return;
  const links = mainNav.querySelectorAll("a");
  links.forEach((link) => {
    link.classList.remove("active");
    link.removeAttribute("aria-current");
  });
  targetLink.classList.add("active");
  targetLink.setAttribute("aria-current", "page");
}

function activateNavByHash(hash) {
  if (!mainNav || !hash) return;
  const targetLink = mainNav.querySelector(`a[href="${hash}"]`);
  if (!targetLink) return;
  setActiveNavLink(targetLink);
  positionNavSlider(targetLink);
}

function positionNavSlider(targetLink) {
  if (!mainNav || !navSlider || !targetLink || window.innerWidth <= 760) return;
  const navRect = mainNav.getBoundingClientRect();
  const targetRect = targetLink.getBoundingClientRect();
  const sliderLeftInset = parseFloat(getComputedStyle(navSlider).left) || 0;
  const translateX = targetRect.left - navRect.left - sliderLeftInset;
  navSlider.style.width = `${targetRect.width}px`;
  navSlider.style.transform = `translateX(${translateX}px)`;
}

function setupNavSlider() {
  if (!mainNav || !navSlider) return;
  const activeLink = mainNav.querySelector("a.active") || mainNav.querySelector("a");
  if (activeLink) {
    setActiveNavLink(activeLink);
    positionNavSlider(activeLink);
  }

  window.addEventListener("resize", () => {
    const currentActive = mainNav.querySelector("a.active");
    if (currentActive) positionNavSlider(currentActive);
  });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      const currentActive = mainNav.querySelector("a.active");
      if (currentActive) positionNavSlider(currentActive);
    });
  }
}

if (siteHeader && navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      siteHeader.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupInternalAnchorScrolling() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const getHeaderOffset = () => (siteHeader ? siteHeader.offsetHeight + 12 : 0);

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;

      event.preventDefault();
      if (window.location.hash !== hash) {
        window.history.replaceState(null, "", hash);
      }

      if (mainNav && mainNav.contains(link)) {
        setActiveNavLink(link);
        positionNavSlider(link);
      }
      navScrollLock = true;
      if (navScrollLockTimer) clearTimeout(navScrollLockTimer);

      if (pageScroller) {
        pageScroller.scrollTo(target, {
          offset: -getHeaderOffset(),
          duration: 900
        });
        navScrollLockTimer = setTimeout(() => {
          navScrollLock = false;
          activateNavByHash(hash);
        }, 980);
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        navScrollLockTimer = setTimeout(() => {
          navScrollLock = false;
          activateNavByHash(hash);
        }, 500);
      }
    });
  });
}

window.addEventListener("load", () => {
  setupNavSlider();
  setupInternalAnchorScrolling();

  const currentHash = window.location.hash;
  if (currentHash && pageScroller) {
    const target = document.querySelector(currentHash);
    if (target) {
      setTimeout(() => {
        pageScroller.scrollTo(target, {
          offset: -(siteHeader ? siteHeader.offsetHeight + 12 : 0),
          duration: 0
        });
      }, 50);
    }
  }
});

const cornerGif = document.querySelector(".corner-gif");
const meowPopup = document.getElementById("meowPopup");
let meowTimer = null;

function showMeowPopup() {
  if (!meowPopup) return;
  meowPopup.classList.add("show");
  if (meowTimer) clearTimeout(meowTimer);
  meowTimer = setTimeout(() => {
    meowPopup.classList.remove("show");
  }, 1200);
}

if (cornerGif && meowPopup) {
  cornerGif.addEventListener("mouseenter", showMeowPopup);
  cornerGif.addEventListener("click", showMeowPopup);
  cornerGif.addEventListener("touchstart", showMeowPopup, { passive: true });
  cornerGif.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      showMeowPopup();
    }
  });
}

const resumeButton = document.getElementById("resumeButton");
if (resumeButton) {
  const resumeHref = resumeButton.getAttribute("href");
  fetch(resumeHref, { method: "HEAD" })
    .then((response) => {
      if (!response.ok) {
        resumeButton.classList.add("is-disabled");
        resumeButton.removeAttribute("download");
        resumeButton.setAttribute("aria-disabled", "true");
        resumeButton.title = "Resume will be added soon";
      }
    })
    .catch(() => {
      resumeButton.classList.add("is-disabled");
      resumeButton.removeAttribute("download");
      resumeButton.setAttribute("aria-disabled", "true");
      resumeButton.title = "Resume will be added soon";
    });
}

const cursor = document.getElementById("customCursor");
const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

if (cursor && isFinePointer) {
  const setLarge = () => {
    cursor.style.width = "50px";
    cursor.style.height = "50px";
    cursor.style.borderWidth = "3px";
  };

  const setNormal = () => {
    cursor.style.width = "36px";
    cursor.style.height = "36px";
    cursor.style.borderWidth = "2px";
  };

  document.addEventListener(
    "mousemove",
    (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursor.style.opacity = "1";
    },
    { passive: true }
  );

  document.querySelectorAll("a, .btn, .project-panel").forEach((node) => {
    node.addEventListener("mouseenter", setLarge);
    node.addEventListener("mouseleave", setNormal);
  });
} else if (cursor) {
  cursor.style.display = "none";
}
