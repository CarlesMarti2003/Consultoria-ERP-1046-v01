# Nexe Consultoria ERP · Ceràmica Riu Sec

Web de Nexe Consultoria ERP sobre Ceràmica Riu Sec i el procés d'aprovisionament de matèries primeres. És un cas pràctic simulat i està organitzada en cinc apartats: inici, empresa, procés, consultora i contacte.

## Obrir el projecte

Cal tindre Node.js 22 o posterior. Des de la carpeta del repositori:

```bash
npm install
npm run dev
```

Vite mostrarà l'adreça local de la web. Per comprovar la versió que es publicarà:

```bash
npm run build
npm run preview
```

## On editar els continguts

- `src/index.html`: entrada de l'aplicació per al desenvolupament.
- `src/App.jsx`: textos, apartats i navegació.
- `src/content.js`: membres de l'equip, departaments i passos del procés.
- `src/styles.css`: colors i estils generals de Tailwind.
- `public/images/`: logotip de Nexe i imatge il·lustrativa.

L'apartat **Qui som** mostra la formació confirmada de cada membre i un repartiment proposat de responsabilitats per al cas. Confirmeu aquestes funcions amb l'equip abans del lliurament. Els CV encara no s'han facilitat; no s'han inventat experiències ni competències personals.

Per incorporar-los, la via més senzilla és guardar **un PDF per membre** dins de `public/cv/` i indicar-ne la ruta a `cvUrl` de `src/content.js`, per exemple `cvUrl: 'cv/hector-balaguer.pdf'`. També es pot posar un **enllaç públic complet** a un PDF allotjat fora de la web, per exemple `cvUrl: 'https://exemple.org/cv/hector-balaguer.pdf'`. Cal comprovar que el PDF s'obri sense iniciar sessió. En publicar la web, «CV pendent d’incorporar» es convertirà en «Veure el CV». Reviseu abans de publicar-los que no hi haja dades personals que no vulgueu fer públiques (adreça, telèfon, document d'identitat, etc.).

## Publicació en GitHub Pages

GitHub Pages publica la carpeta principal de la branca `main`. Per generar els fitxers que serveix:

```bash
npm run export
git add -A
git commit -m "Actualitza la web"
git push origin main
```

`npm run export` compila l'aplicació i copia `index.html`, `assets/`, `images/` i, si existeix, `cv/` a la carpeta principal. Editeu sempre els fitxers de `src/` i `public/`; els de la carpeta principal es tornen a generar amb l'exportació. L'adreça pública és [carlesmarti2003.github.io/Consultoria-ERP-1046-v01](https://carlesmarti2003.github.io/Consultoria-ERP-1046-v01/).
