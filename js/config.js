window.INVITATION_CONFIG = {
  theme: {
    primary: "#6f4cff",
    primaryDark: "#4d31bf",
    secondary: "#ff7aa8",
    accent: "#ffd75f",
    background: "#f4f0ff",
    text: "#2b2640",
    muted: "#756f86",
    cardRadius: "30px",
    pageMaxWidth: "530px",
    fontFamily: "'Trebuchet MS', system-ui, sans-serif",
    titleFontFamily: "'Trebuchet MS', system-ui, sans-serif"
  },

  loader: {
    enabled: true,
    icon: "✦",
    kicker: "UNA CELEBRACIÓN ESTÁ POR COMENZAR",
    copy: "Esta invitación contiene música. Ajustá el volumen y tocá entrar para comenzar.",
    enterLabel: "Entrar a la invitación"
  },

  invitation: {
    name: "Nombre",
    ageLabel: "CUMPLE 10 AÑOS",
    message: "Te invito a compartir un día muy especial.",
    eventDateTime: "2027-10-10T18:00:00-03:00",
    eventEndDateTime: "2027-10-10T21:00:00-03:00",
    dateLabel: "Domingo 10 de Octubre",
    timeLabel: "18:00 a 21:00 hs.",
    venue: "Lugar del evento",
    address: "Dirección del evento",
    mapUrl: "",
    instagramUrl: "https://www.instagram.com/rossdigitalstudio/",
    instagramHandle: "@rossdigitalstudio"
  },

  media: {
    hero: {
      type: "none", // none | image | video
      src: "",
      poster: "",
      position: "center center",
      fit: "cover"
    },
    portrait: {
      enabled: false,
      src: ""
    },
    audio: {
      enabled: false,
      src: "",
      loop: true
    }
  },

  characters: {
    enabled: false,
    intervalMs: 5800,
    items: [
      // Ejemplo:
      // {
      //   src: "assets/img/personaje-1.png",
      //   width: "min(95vw, 440px)",
      //   top: "24px",
      //   bottom: "auto",
      //   left: "50%",
      //   translateX: "-50%"
      // }
    ]
  },

  texts: {
    heroKicker: "¡ESTÁS INVITADO!",
    introIcon: "✦",
    eventKicker: "EL GRAN DÍA ES",
    countdownTitle: "¡Falta muy poco!",
    countdownIcon: "✦",
    locationKicker: "TE ESPERO EN",
    mapLabel: "Cómo llegar"
  },

  sections: {
    intro: {
      enabled: true
    },

    countdown: {
      enabled: true,
      beforeText: "Faltan {days} días para festejar juntos.",
      oneDayText: "Falta solo 1 día.",
      todayText: "¡Ya falta menos de un día!",
      startedText: "¡Hoy es el gran día! ✨",
      startedStatus: "¡La espera terminó!",
      finishedText: "¡Gracias por compartir este día!"
    },

    location: {
      enabled: true
    },

    extra: {
      enabled: false,
      kicker: "INFORMACIÓN EXTRA",
      message: "Podés usar este bloque para cualquier información adicional.",
      iconLeft: "✦",
      iconRight: "✦"
    },

    dressCode: {
      enabled: false,
      kicker: "DRESS CODE",
      text: "Dress code opcional.",
      icon: "◈"
    },

    confirmation: {
      mode: "disabled", // disabled | whatsapp | link | hidden
      kicker: "CONFIRMACIÓN",
      title: "¿Venís a festejar?",
      copy: "Confirmá tu asistencia.",
      icon: "✦",
      buttonIcon: "💬",
      label: "Confirmar asistencia",

      // Solo para mode: "whatsapp"
      whatsappNumber: "",
      whatsappMessage: "",

      // Solo para mode: "link"
      url: ""
    }
  }
};