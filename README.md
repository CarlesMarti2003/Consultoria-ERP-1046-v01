# Nexe Consultoria ERP · V01

Web de Nexe Consultoria ERP sobre el procés d'aprovisionament de matèries primeres de Ceràmica Riu Sec. Aquesta branca de treball correspon a la versió 1. La versió 0 es conserva al repositori `Consultoria-ERP-1046`.

La web conté la presentació de l'empresa i la consultora, el procés, l'anàlisi AS-IS, la proposta TO-BE en BPMN 2.0, els requisits ERP i el contacte. «Qui som» mostra la formació i les funcions assignades a l'equip. Els models `.bpmn` es poden descarregar des de les pàgines corresponents.

## Organització de la web

El menú principal presenta la consultora: Inici, Serveis, Casos d’èxit, Equip i Contacte.
Cada projecte té un índex propi. Ceràmica Riu Sec es troba a `#/casos/ceramica-riu-sec`:

1. Resum del projecte
2. L’empresa (`/empresa`)
3. Procés actual i model AS-IS (`/proces`)
4. Problemes detectats (`/analisi`)
5. Proposta de millora i model TO-BE (`/millora`)
6. Requisits ERP (`/requisits`)
7. Documents i fonts (`/documents`)

`src/navigation.js` centralitza les rutes, els noms i els enllaços. `src/ProjectUI.jsx` conté l’índex del projecte, el menú, els enllaços anterior/següent i la pàgina de documents. Els enllaços anteriors, com `#/proces`, continuen funcionant. Els índexs interns usen `?seccio=...` dins de la ruta amb hash i admeten accés directe i navegació enrere.

## Desenvolupament

Cal Node.js 22 o posterior.

```bash
npm ci
npm run dev
```

Per comprovar la compilació:

```bash
npm run build
npm run preview
```

## Continguts

- `src/App.jsx`: rutes i pàgines generals.
- `src/Practice4.jsx` i `src/practice4Content.js`: anàlisi, millora i requisits.
- `src/styles.css` i `src/practice4.css`: presentació visual.
- `public/models/`: models BPMN 2.0. Es poden regenerar amb `node scripts/generate-bpmn.mjs`.
- `public/presentacio/`: diapositives de la sessió.

## Publicació

El projecte compila amb la base `/Consultoria-ERP-1046-v01/`. `npm run export` copia a l'arrel els fitxers que GitHub Pages serveix des de `main`:

```bash
npm run export
git add -A
git commit -m "Actualitza la versió 1"
git push origin main
```

Cal configurar GitHub Pages amb la branca `main` i la carpeta `/ (root)` una sola vegada. L'adreça pública és [carlesmarti2003.github.io/Consultoria-ERP-1046-v01](https://carlesmarti2003.github.io/Consultoria-ERP-1046-v01/).
