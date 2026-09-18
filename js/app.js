const config = window.INVITATION_CONFIG || {};
const theme = config.theme || {};
const loaderConfig = config.loader || {};
const invitation = config.invitation || {};
const media = config.media || {};
const characterConfig = config.characters || {};
const texts = config.texts || {};
const sections = config.sections || {};

const $ = (selector) => document.querySelector(selector);

const loader = $("#loader");
const enterButton = $("#enter-button");
const audio = $("#audio");
const musicToggle = $("#music-toggle");
const characterImage = $("#character-image");
const heroCharacters = $("#hero-characters");
const countdown = $("#countdown");
const countdownStatus = $("#countdown-status");

let characterIndex = 0;
let characterInterval = null;
let countdownInterval = null;
let hasEntered = false;

function setText(selector, value) {
  const element = $(selector);
  if (element && value !== undefined && value !== null) {
    element.textContent = value;
  }
}

function setVisible(selector, visible) {
  const element = $(selector);
  if (element) element.hidden = !visible;
}

function applyTheme() {
  const root = document.documentElement;

  const vars = {
    "--primary": theme.primary,
    "--primary-dark": theme.primaryDark,
    "--secondary": theme.secondary,
    "--accent": theme.accent,
    "--page-background": theme.background,
    "--ink": theme.text,
    "--muted": theme.muted,
    "--card-radius": theme.cardRadius,
    "--page-max-width": theme.pageMaxWidth,
    "--body-font": theme.fontFamily,
    "--title-font": theme.titleFontFamily
  };

  Object.entries(vars).forEach(([key, value]) => {
    if (value) root.style.setProperty(key, value);
  });

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme && theme.primary) metaTheme.setAttribute("content", theme.primary);
}

function populateInvitation() {
  document.title = `Invitación de ${invitation.name || "cumpleaños"}`;

  setText("#loader-title", invitation.name);
  setText("#guest-name", invitation.name ? invitation.name.toUpperCase() : "");
  setText("#age-label", invitation.ageLabel || "");
  setText("#invitation-message", invitation.message || "");
  setText("#event-date", invitation.dateLabel || "");
  setText("#event-time", invitation.timeLabel || "");
  setText("#event-venue", invitation.venue || "");
  setText("#event-address", invitation.address || "");

  setText("#loader-kicker", loaderConfig.kicker);
  setText("#loader-copy", loaderConfig.copy);
  setText("#loader-icon", loaderConfig.icon);
  setText("#enter-label", loaderConfig.enterLabel);

  setText("#hero-kicker", texts.heroKicker);
  setText("#intro-icon", texts.introIcon);
  setText("#event-kicker", texts.eventKicker);
  setText("#countdown-title", texts.countdownTitle);
  setText("#countdown-icon", texts.countdownIcon);
  setText("#location-kicker", texts.locationKicker);
  setText("#map-label", texts.mapLabel);

  const mapButton = $("#map-button");
  if (mapButton) {
    if (invitation.mapUrl) {
      mapButton.href = invitation.mapUrl;
      mapButton.removeAttribute("aria-disabled");
      mapButton.classList.remove("is-disabled");
    } else {
      mapButton.removeAttribute("href");
      mapButton.setAttribute("aria-disabled", "true");
      mapButton.classList.add("is-disabled");
    }
  }

  const instagramLink = $("#instagram-link");
  if (instagramLink) {
    if (invitation.instagramUrl) instagramLink.href = invitation.instagramUrl;
    if (invitation.instagramHandle) instagramLink.textContent = invitation.instagramHandle;
  }
}

function setupLoader() {
  if (loaderConfig.enabled === false) {
    loader?.remove();
    document.body.classList.remove("is-locked");
    hasEntered = true;
    setupAudioAfterEntry();
    return;
  }

  document.body.classList.add("is-locked");
}

function setupHeroMedia() {
  const container = $("#hero-media");
  if (!container) return;

  const hero = media.hero || {};
  container.innerHTML = "";

  if (!hero.src || hero.type === "none") {
    container.classList.add("hero__media--placeholder");
    return;
  }

  container.classList.remove("hero__media--placeholder");

  if (hero.type === "video") {
    const video = document.createElement("video");
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    if (hero.poster) video.poster = hero.poster;

    const source = document.createElement("source");
    source.src = hero.src;
    video.appendChild(source);

    video.style.objectPosition = hero.position || "center center";
    video.style.objectFit = hero.fit || "cover";
    container.appendChild(video);
    return;
  }

  const image = document.createElement("img");
  image.src = hero.src;
  image.alt = "";
  image.style.objectPosition = hero.position || "center center";
  image.style.objectFit = hero.fit || "cover";
  container.appendChild(image);
}

function setupPortrait() {
  const portraitConfig = media.portrait || {};
  const wrap = $("#portrait-wrap");
  const portrait = $("#portrait");

  if (!wrap || !portrait) return;

  if (!portraitConfig.enabled || !portraitConfig.src) {
    wrap.hidden = true;
    return;
  }

  wrap.hidden = false;
  portrait.src = portraitConfig.src;
  portrait.alt = invitation.name
    ? `Foto de ${invitation.name}`
    : "Foto del cumpleañero";
}

function setupCharacters() {
  const items = characterConfig.items || [];

  if (!heroCharacters || !characterImage || !characterConfig.enabled || !items.length) {
    if (heroCharacters) heroCharacters.hidden = true;
    return;
  }

  heroCharacters.hidden = false;
  showCharacter(0);

  if (items.length > 1) {
    characterInterval = window.setInterval(() => {
      characterIndex = (characterIndex + 1) % items.length;
      showCharacter(characterIndex);
    }, characterConfig.intervalMs || 5800);
  }
}

function showCharacter(index) {
  const items = characterConfig.items || [];
  if (!characterImage || !items.length) return;

  const character = items[index];
  characterImage.classList.remove("is-visible");

  window.setTimeout(() => {
    characterImage.src = character.src || "";
    characterImage.style.width = character.width || "min(95vw, 440px)";
    characterImage.style.top = character.top ?? "24px";
    characterImage.style.bottom = character.bottom ?? "auto";
    characterImage.style.left = character.left || "50%";

    const translateX = character.translateX || "-50%";
    characterImage.style.transform =
      `translate3d(${translateX}, 18px, 0) scale(1.02)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        characterImage.style.transform =
          `translate3d(${translateX}, 0, 0) scale(1)`;
        characterImage.classList.add("is-visible");
      });
    });
  }, 300);
}

function setupSections() {
  setVisible("#intro-section", sections.intro?.enabled !== false);
  setVisible("#countdown-card", sections.countdown?.enabled !== false);
  setVisible("#location-block", sections.location?.enabled !== false);
  setVisible("#map-button", sections.location?.enabled !== false);

  const extra = sections.extra || {};
  setVisible("#extra-section", extra.enabled === true);
  if (extra.enabled) {
    setText("#extra-kicker", extra.kicker);
    setText("#extra-message", extra.message);
    setText("#extra-icon-left", extra.iconLeft);
    setText("#extra-icon-right", extra.iconRight);
  }

  const dressCode = sections.dressCode || {};
  setVisible("#dresscode-section", dressCode.enabled === true);
  if (dressCode.enabled) {
    setText("#dresscode-kicker", dressCode.kicker);
    setText("#dress-code", dressCode.text);
    setText("#dresscode-icon", dressCode.icon);
  }

  setupConfirmation();
}

function setupConfirmation() {
  const confirmation = sections.confirmation || {};
  const section = $("#confirmation-section");
  const button = $("#confirmation-button");

  if (!section || !button) return;

  const mode = confirmation.mode || "disabled";

  if (mode === "hidden") {
    section.hidden = true;
    return;
  }

  section.hidden = false;
  setText("#confirmation-kicker", confirmation.kicker);
  setText("#confirmation-title", confirmation.title);
  setText("#confirmation-copy", confirmation.copy);
  setText("#confirmation-icon", confirmation.icon);
  setText("#confirmation-button-icon", confirmation.buttonIcon);
  setText("#confirmation-button-label", confirmation.label);

  button.classList.remove("is-disabled");
  button.removeAttribute("aria-disabled");
  button.removeAttribute("tabindex");
  button.target = "_blank";
  button.rel = "noopener noreferrer";

  if (mode === "whatsapp" && confirmation.whatsappNumber) {
    const message = encodeURIComponent(confirmation.whatsappMessage || "");
    button.href = `https://wa.me/${confirmation.whatsappNumber}?text=${message}`;
    return;
  }

  if (mode === "link" && confirmation.url) {
    button.href = confirmation.url;
    return;
  }

  button.removeAttribute("href");
  button.removeAttribute("target");
  button.removeAttribute("rel");
  button.setAttribute("aria-disabled", "true");
  button.setAttribute("tabindex", "-1");
  button.classList.add("is-disabled");
}

function setupAudio() {
  const audioConfig = media.audio || {};

  if (!audio || !musicToggle || !audioConfig.enabled || !audioConfig.src) {
    if (musicToggle) musicToggle.hidden = true;
    return;
  }

  audio.src = audioConfig.src;
  audio.loop = audioConfig.loop !== false;
}

async function startAudio() {
  if (!audio || !audio.src) return;

  try {
    await audio.play();
  } catch (error) {
    // Algunos navegadores requieren una interacción adicional.
  }

  updateMusicButton();
}

function setupAudioAfterEntry() {
  const audioConfig = media.audio || {};
  if (!audioConfig.enabled || !audioConfig.src || !musicToggle) return;

  musicToggle.hidden = false;
  startAudio();
}

function updateMusicButton() {
  if (!audio || !musicToggle) return;

  const playing = !audio.paused;
  musicToggle.classList.toggle("is-playing", playing);
  musicToggle.setAttribute(
    "aria-label",
    playing ? "Pausar música" : "Reproducir música"
  );
  musicToggle.innerHTML =
    `<span class="music-toggle__icon" aria-hidden="true">${playing ? "♪" : "♫"}</span>`;
}

function enterInvitation() {
  if (hasEntered) return;

  hasEntered = true;
  document.body.classList.remove("is-locked");
  loader?.classList.add("is-leaving");
  setupAudioAfterEntry();

  window.setTimeout(() => {
    if (loader?.isConnected) loader.remove();
  }, 500);
}

function toggleAudio() {
  if (!audio) return;

  if (audio.paused) startAudio();
  else audio.pause();

  updateMusicButton();
}

function setupRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      currentObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.13,
    rootMargin: "0px 0px -4% 0px"
  });

  elements.forEach((element) => observer.observe(element));
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function setCountdownValues(days, hours, minutes, seconds) {
  setText("#countdown-days", pad(days));
  setText("#countdown-hours", pad(hours));
  setText("#countdown-minutes", pad(minutes));
  setText("#countdown-seconds", pad(seconds));
}

function finishCountdown(message, status = "") {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }

  if (countdown) {
    countdown.classList.add("is-finished");
    countdown.innerHTML = `<p class="countdown__finished-message">${message}</p>`;
  }

  if (countdownStatus) countdownStatus.textContent = status;
}

function updateCountdown() {
  const countdownConfig = sections.countdown || {};
  if (!countdown || !countdownStatus || countdownConfig.enabled === false) return;

  const start = new Date(invitation.eventDateTime).getTime();
  const end = new Date(invitation.eventEndDateTime).getTime();
  const now = Date.now();

  if (Number.isNaN(start) || Number.isNaN(end)) {
    countdownStatus.textContent = "Revisá la fecha configurada en js/config.js.";
    return;
  }

  if (now >= end) {
    finishCountdown(countdownConfig.finishedText || "¡Gracias por compartir este día!");
    return;
  }

  if (now >= start) {
    finishCountdown(
      countdownConfig.startedText || "¡Hoy es el gran día! ✨",
      countdownConfig.startedStatus || ""
    );
    return;
  }

  const totalSeconds = Math.max(0, Math.floor((start - now) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  setCountdownValues(days, hours, minutes, seconds);

  if (days === 0) {
    countdownStatus.textContent =
      countdownConfig.todayText || "¡Ya falta menos de un día!";
  } else if (days === 1) {
    countdownStatus.textContent =
      countdownConfig.oneDayText || "Falta solo 1 día.";
  } else {
    const template =
      countdownConfig.beforeText || "Faltan {days} días para festejar juntos.";
    countdownStatus.textContent = template.replace("{days}", days);
  }
}

function startCountdown() {
  if (sections.countdown?.enabled === false) return;

  updateCountdown();

  if (!countdownInterval && !countdown?.classList.contains("is-finished")) {
    countdownInterval = window.setInterval(updateCountdown, 1000);
  }
}

function fitTextToContainer(element, maxSize, minSize = 26) {
  if (!element || !element.parentElement) return;

  const availableWidth = Math.max(180, element.parentElement.clientWidth - 24);
  let size = maxSize;
  element.style.fontSize = size + "px";

  while (element.scrollWidth > availableWidth && size > minSize) {
    size -= 1;
    element.style.fontSize = size + "px";
  }
}

function fitNameTitles() {
  fitTextToContainer($("#loader-title"), 64, 28);
  fitTextToContainer($("#guest-name"), 76, 30);
}

function setupVisibilityAudio() {
  document.addEventListener("visibilitychange", () => {
    if (!hasEntered || !document.hidden || !audio) return;
    audio.pause();
    updateMusicButton();
  });
}

function preventDisabledNavigation() {
  document.addEventListener("click", (event) => {
    const disabledLink = event.target.closest("a.is-disabled");
    if (!disabledLink) return;
    event.preventDefault();
  });
}

function init() {
  applyTheme();
  populateInvitation();
  setupLoader();
  setupHeroMedia();
  setupPortrait();
  setupAudio();
  setupCharacters();
  setupSections();
  startCountdown();
  setupRevealAnimations();
  setupVisibilityAudio();
  preventDisabledNavigation();

  const runTextFit = () => fitNameTitles();

  if (document.fonts?.ready) {
    document.fonts.ready.then(runTextFit);
  } else {
    window.setTimeout(runTextFit, 150);
  }

  window.addEventListener("resize", runTextFit);

  enterButton?.addEventListener("click", enterInvitation);
  musicToggle?.addEventListener("click", toggleAudio);
  audio?.addEventListener("play", updateMusicButton);
  audio?.addEventListener("pause", updateMusicButton);
}

document.addEventListener("DOMContentLoaded", init);