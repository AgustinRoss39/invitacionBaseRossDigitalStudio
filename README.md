# Invitación Base — Ross Digital Studio

Plantilla maestra para crear nuevas invitaciones digitales sin rehacer la estructura desde cero.

## Objetivo

Duplicar este repositorio, reemplazar assets y editar principalmente `js/config.js`.

La base incluye:

- pantalla de entrada;
- música opcional;
- portada con imagen/video opcional;
- personajes o imágenes rotativas opcionales;
- nombre con autoajuste para evitar desbordes;
- mensaje y foto;
- fecha y horario;
- contador regresivo;
- ubicación y Google Maps;
- bloque extra opcional;
- dress code opcional;
- confirmación configurable;
- animaciones al hacer scroll;
- diseño mobile-first;
- branding Ross Digital Studio.

## Confirmación configurable

La confirmación se controla desde `js/config.js`:

```js
confirmation: {
  mode: "disabled", // disabled | whatsapp | link | hidden
  label: "Confirmar asistencia",
  whatsappNumber: "",
  whatsappMessage: "",
  url: ""
}
```

- `disabled`: muestra el botón pero no navega. Ideal para demos.
- `whatsapp`: abre WhatsApp con número y mensaje configurables.
- `link`: abre una URL personalizada.
- `hidden`: oculta toda la sección de confirmación.

## Estructura

```text
/
├── index.html
├── README.md
├── css/
│   └── styles.css
├── js/
│   ├── config.js
│   └── app.js
└── assets/
    ├── img/
    │   └── README.md
    ├── audio/
    │   └── README.md
    └── fonts/
        └── README.md
```

## Flujo recomendado para una invitación real

1. Duplicar este repositorio.
2. Copiar imágenes, música y fuentes a `assets/`.
3. Editar `js/config.js`.
4. Ajustar colores/estética desde el objeto `theme`.
5. Si hace falta, retocar solo detalles puntuales en `css/styles.css`.
6. Publicar en Vercel.

Diseñado por Ross Digital Studio.