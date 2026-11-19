# Nexe Consultoria ERP · V01

Web de Nexe Consultoria ERP sobre el procés d'aprovisionament de matèries primeres de Ceràmica Riu Sec. Aquesta branca de treball correspon a la versió 1. La versió 0 es conserva al repositori `Consultoria-ERP-1046`.

La web conté la presentació de l'empresa i la consultora, el procés, l'anàlisi AS-IS, la proposta TO-BE en BPMN 2.0, els requisits ERP i el contacte. «Qui som» mostra la formació i les funcions assignades a l'equip. Els models `.bpmn` es poden descarregar des de les pàgines corresponents.

## Organització de la web

El menú principal presenta Inici, Serveis, Projectes, Equip i Contacte. El formulari de contacte és una demostració local.

El cas de Ceràmica Riu Sec està a `#/casos/ceramica-riu-sec`:

1. **El projecte** situa l’empresa, el repte, l’objectiu i l’abast.
2. **Procés actual** inclou les huit activitats amb entrades, eixides i decisions, l’anàlisi, la taula de millores i el model AS-IS.
3. **Proposta de millora** justifica les quatre categories BPR i mostra el recorregut proposat i el TO-BE.
4. **Requisits ERP** recull les històries d’usuari, les dades diferencials i la cobertura de les tasques del TO-BE.

L’apartat **Documents i fonts** conserva els models BPMN i la presentació de dues diapositives. La seua visibilitat es controla des de `src/publication.js`.

`src/navigation.js` centralitza les rutes. Els enllaços antics continuen portant a l’apartat relacionat. Els índexs interns usen `?seccio=...` dins de la ruta amb hash i admeten accés directe i navegació enrere.

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
