/* ================= LOGIN ================= */
function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorText = document.getElementById("loginError");

  if (!usernameInput || !passwordInput) return;

  const username = usernameInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  const allowedUsername = "devi sri";
  const allowedPassword = "1_w1ll_g1v3_g1ft_t0_y0u";

  if (username === allowedUsername && password === allowedPassword) {
    errorText.textContent = "";
    showEmoji();

    setTimeout(() => {
      window.location.href = "flow.html";
    }, 300);
  } else {
    errorText.textContent = "Access denied. Authorized user only.";
    showEmoji();
  }
}

/* ================= GLOBAL STATE ================= */
let current = 1;
let loadingInterval = null;
let loadingText = null;

/* ================= LOADING SEQUENCE ================= */
function startLoadingMessages() {
  if (!loadingText) return;

  const messages = [
    "Verifying credentials...",
    "Syncing calendar with 2026...",
    "Removing unnecessary stress...",
    "Initializing happiness module..."
  ];

  const typingSpeed = 50;
  const pauseAfterTyping = 700;

  if (loadingInterval) clearTimeout(loadingInterval);

  let msgIndex = 0;

  function showMessageSequentially() {
    if (msgIndex >= messages.length) {
      // Show loader screen
      document.getElementById("screen1")?.classList.remove("active");
      document.getElementById("screenLoader")?.classList.add("active");

      setTimeout(() => {
        document.getElementById("screenLoader")?.classList.remove("active");
        nextScreen(2);
      }, 2000);

      return;
    }

    loadingText.innerHTML = messages[msgIndex];
    typeText(loadingText, typingSpeed);

    const duration =
      messages[msgIndex].length * typingSpeed + pauseAfterTyping;

    msgIndex++;
    loadingInterval = setTimeout(showMessageSequentially, duration);
  }

  showMessageSequentially();
}

/* ================= SCREEN NAVIGATION ================= */
function nextScreen(next) {
  const currentScreen = document.getElementById(`screen${current}`);
  const nextScreenEl = document.getElementById(`screen${next}`);

  if (!currentScreen || !nextScreenEl) return;

  currentScreen.classList.remove("active");

  setTimeout(() => {
    nextScreenEl.classList.add("active");
    current = next;

    showEmoji();

    if (next === 5) {
      startConfetti();

      const msg = document.getElementById("finalMessage");
      if (msg) {
        typeText(msg, 35);
      }
    }
  }, 300);
}

/* ================= CONFETTI ================= */
function startConfetti() {
  const colors = ["#ff0a54", "#ff477e", "#ff85a1", "#fbb1bd", "#f9bec7", "#ffffff"];

  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.width = confetti.style.height =
      Math.random() * 8 + 5 + "px";

    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

/* ================= THEME TOGGLE ================= */
document.addEventListener("DOMContentLoaded", () => {
  loadingText = document.getElementById("loadingText");

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light");
      toggle.textContent = document.body.classList.contains("light") ? "☀" : "🌙";
    });
  }

  // Start loading only on flow page
  if (loadingText) {
    startLoadingMessages();
  }
});

/* ================= EMOJI MICRO INTERACTION ================= */
function showEmoji() {
  const emojis = ["😄", "✨", "🎉", "😊", "🎆", "💫"];
  const emoji = document.createElement("div");

  emoji.classList.add("emoji");
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  emoji.style.left = Math.random() * 90 + "vw";
  emoji.style.top = Math.random() * 80 + "vh";

  document.body.appendChild(emoji);
  setTimeout(() => emoji.remove(), 1400);
}

/* ================= TYPEWRITER (HTML SAFE) ================= */
function typeText(element, speed = 35) {
  const html = element.innerHTML;
  element.innerHTML = "";

  let i = 0;
  let isTag = false;
  let buffer = "";

  function type() {
    if (i >= html.length) return;

    const char = html[i];

    if (char === "<") {
      isTag = true;
      buffer += char;
    } else if (char === ">") {
      isTag = false;
      buffer += char;
      element.innerHTML += buffer;
      buffer = "";
    } else if (isTag) {
      buffer += char;
    } else {
      element.innerHTML += char;
    }

    i++;
    setTimeout(type, speed);
  }

  type();
}

/* ================= PARTICLES BACKGROUND ================= */
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;
  const particles = [];

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2 + 1,
      dx: Math.random() * 0.4 - 0.2,
      dy: Math.random() * 0.4 - 0.2
    });
  }

  function animateParticles() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(255,255,255,0.6)";

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > w) p.dx *= -1;
      if (p.y < 0 || p.y > h) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

/* ================= REPLAY ================= */
function replayExperience() {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));

  current = 1;
  document.getElementById("screen1")?.classList.add("active");

  startLoadingMessages();
  showEmoji();
}
