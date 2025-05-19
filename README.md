# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


```
Front
├─ .prettierrc
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ public
│  ├─ models
│  │  ├─ Dreamshaper.png
│  │  └─ Stable_diffusion_1.5.png
│  ├─ sample.jpeg
│  ├─ unnamed.png
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ common
│  │  │  ├─ GenerateParamsBlock.jsx
│  │  │  ├─ imageParams
│  │  │  │  ├─ AdvancedSettings.jsx
│  │  │  │  ├─ ImgNumSelector.jsx
│  │  │  │  ├─ ImgRaitoSelector.jsx
│  │  │  │  ├─ InputForm.jsx
│  │  │  │  ├─ LoraSelector.jsx
│  │  │  │  └─ ModelSelector.jsx
│  │  │  └─ SingleImageUploadInput.jsx
│  │  ├─ img2img
│  │  │  └─ ModeSelector.jsx
│  │  ├─ inpaint
│  │  │  ├─ ImageUploaderDraw.jsx
│  │  │  ├─ ImageUploaderSAM.jsx
│  │  │  └─ ObjectSelection.jsx
│  │  └─ layout
│  │     ├─ ImageLog.jsx
│  │     └─ Sidebar.jsx
│  ├─ hooks
│  │  ├─ useGenerateImg2Img.js
│  │  ├─ useGenerateTxt2Img.js
│  │  ├─ useImageLogs.js
│  │  ├─ useInpaint.js
│  │  └─ useObjectDetect.js
│  ├─ index.css
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ GenerateLayout.jsx
│  │  ├─ Img2ImgMain.jsx
│  │  ├─ InpaintMain.jsx
│  │  └─ Txt2ImgMain.jsx
│  └─ services
│     └─ api.js
└─ vite.config.js

```