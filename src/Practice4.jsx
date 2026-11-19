import { useId, useRef, useState } from 'react'
import { steps } from './content.js'
import { analysis, differentialData, erpTasks, improvementCategories, userStories } from './practice4Content.js'
import { PageIntro, SectionLinks } from './ProjectUI.jsx'
import { pageHref } from './navigation.js'
import { modelUrl } from './modelAssets.js'

const pans = [
  { label: 'Moure a l’esquerra', symbol: '←', x: -1, y: 0 },
  { label: 'Moure amunt', symbol: '↑', x: 0, y: -1 },
  { label: 'Moure avall', symbol: '↓', x: 0, y: 1 },
  { label: 'Moure a la dreta', symbol: '→', x: 1, y: 0 },
]

function ProcessDiagram({ title, image, caption, textHref, textLabel }) {
  const imageUrl = modelUrl(image.file)
  const id = useId()
  const dialog = useRef(null)
  const opener = useRef(null)
  const closeButton = useRef(null)
  const viewport = useRef(null)
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const [zoom, setZoom] = useState(1)

  function changeZoom(factor) {
    setZoom((current) => Math.min(12, Math.max(1, current * factor)))
  }

  function fit() {
    setZoom(1)
    viewport.current.scrollTo(0, 0)
  }

  function openDiagram() {
    setFailed(false)
    setLoaded(false)
    setZoom(1)
    dialog.current.showModal()
    setOpen(true)
    closeButton.current.focus()
  }

  const ready = loaded && !failed
  return <div className="model-access">
    <h2>{title}</h2>
    <p>{caption}</p>
    <div className="model-links">
      <button type="button" className="action-link" ref={opener} onClick={openDiagram} aria-haspopup="dialog">Obrir el diagrama</button>
      <a className="text-link" href={imageUrl} download>Descarregar PNG</a>
      <a className="text-link" href={textHref}>{textLabel}</a>
    </div>
    <dialog ref={dialog} className="diagram-dialog" aria-labelledby={id} onClose={() => {
      setOpen(false)
      opener.current?.focus()
    }}>
      <div className="diagram-heading">
        <h2 id={id}>{title}</h2>
        <button type="button" className="diagram-control" ref={closeButton} onClick={() => dialog.current.close()}>Tancar</button>
      </div>
      {open && <>
        <div className="diagram-toolbar">
          <div className="diagram-controls" role="group" aria-label="Zoom">
            <button type="button" disabled={!ready || zoom >= 12} onClick={() => changeZoom(1.5)}>Ampliar</button>
            <button type="button" disabled={!ready || zoom <= 1} onClick={() => changeZoom(1 / 1.5)}>Reduir</button>
            <button type="button" disabled={!ready} onClick={fit}>Veure tot</button>
          </div>
          <div className="diagram-controls" role="group" aria-label="Desplaçament del diagrama">
            {pans.map(({ label, symbol, x, y }) => <button key={label} type="button" disabled={!ready || zoom <= 1}
              onClick={() => viewport.current.scrollBy(x * 160, y * 160)} aria-label={label}>{symbol}</button>)}
          </div>
        </div>
        {failed && <p role="alert">El diagrama no s’ha pogut carregar. Tanca el visor per descarregar el fitxer o consultar el recorregut en text.</p>}
        {!loaded && !failed && <p role="status">Carregant el diagrama…</p>}
        <div ref={viewport} className="diagram-viewport" role="region" aria-label="Àrea de desplaçament del diagrama" tabIndex={0}>
          <img src={imageUrl} alt={image.alt} width={image.width} height={image.height}
            style={{ width: `min(${zoom * 100}cqw, ${zoom * 100 * image.width / image.height}cqh)` }}
            onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />
        </div>
      </>}
    </dialog>
  </div>
}

const currentDecisions = {
  '01': 'Si canvia el pla de fabricació, cal recalcular les necessitats i les dates.',
  '02': 'Si hi ha prou estoc, el material ja està disponible. Si en falta, es prepara una sol·licitud.',
  '03': 'Cal revisar la necessitat i el pressupost abans d’autoritzar la compra.',
  '04': 'Compres valora quina oferta s’ajusta al material, el preu i el termini requerits.',
  '05': 'Compres contrasta la data confirmada pel proveïdor amb la que necessita producció.',
  '06': 'Si la quantitat és correcta, el lot passa a qualitat. Si hi ha una diferència, es comunica i l’entrada queda pendent de regularitzar.',
  '07': 'Si el lot és acceptat, es registra l’entrada. Si el lot es rebutja, es comunica el rebuig. Si calen més proves, queda pendent de qualitat.',
  '08': 'Magatzem registra la quantitat acceptada i la ubicació abans d’avisar producció.',
}

export function ProcessPage() {
  const processHref = pageHref('proces')
  return <>
    <PageIntro label="Aprovisionament de matèries primeres" title="El procés actual">Producció, compres, magatzem i qualitat es coordinen amb correus, telefonades i fulls de càlcul separats.</PageIntro>
    <SectionLinks page="proces" links={[['abast', 'Abast'], ['activitats', 'Activitats'], ['diagnostic', 'Taula d’anàlisi'], ['model-actual', 'Diagrama AS-IS']]} />
    <section id="abast" className="section-space wrap">
      <h2>Abast del procés</h2>
      <dl className="process-scope-grid">
        <div><dt>Inici</dt><dd>Producció detecta una necessitat d’argila o esmalt en el pla de fabricació.</dd></div>
        <div><dt>Final</dt><dd>El material està disponible. Les diferències de recepció i els lots rebutjats o pendents de qualitat es deriven al tractament corresponent.</dd></div>
        <div><dt>Proveïdors</dt><dd>Reben les comandes, confirmen la data i acompanyen el lliurament amb l’albarà i l’avís corresponent.</dd></div>
      </dl>
    </section>
    <section id="activitats" className="section-space wrap">
      <h2>Les huit activitats</h2>
      <ol className="process-list" role="list">
        {steps.map((step, index) => {
          const item = analysis[index]
          return <li className="process-item" key={item.id} id={'activitat-' + (index + 1)}>
            <div className="process-step-title"><span className="step-number" aria-hidden="true">{item.id}</span><h3>{step.title}</h3></div>
            <div className="process-step-content">
              <p className="process-step-action"><strong>{step.owner}.</strong> {step.summary}</p>
              <dl className="process-fields">
                <div><dt>Entrada</dt><dd>{step.input}</dd></div>
                <div><dt>Eixida</dt><dd>{step.output}</dd></div>
              </dl>
              <p className="process-decision"><strong>Punt de decisió.</strong> {currentDecisions[item.id]}</p>
              <details className="activity-details">
                <summary aria-label={'Anàlisi i millora del pas: ' + step.title}>Anàlisi i millora del pas <span aria-hidden="true">+</span></summary>
                <div className="activity-analysis">
                  <p><strong>{item.assessment}.</strong> {item.diagnosis}</p>
                  <p><strong>Impacte i preocupacions possibles.</strong> {item.participantConcern} {item.consequence}</p>
                  <p><strong>Millora proposada.</strong> {item.improvement}</p>
                  <p><strong>Justificació.</strong> {item.justification}</p>
                </div>
              </details>
            </div>
          </li>
        })}
      </ol>
    </section>
    <section id="diagnostic" className="section-space wrap">
      <h2>Taula d’anàlisi i millores</h2>
      <div className="table-scroll" role="region" aria-label="Problemes i millores per activitat" tabIndex={0}>
        <table className="work-table">
          <caption>Resum dels problemes detectats i les millores proposades</caption>
          <thead><tr><th scope="col">Activitat</th><th scope="col">Problema</th><th scope="col">Decisió</th><th scope="col">Millora</th><th scope="col">Categories BPR</th></tr></thead>
          <tbody>{analysis.map((item, index) => <tr key={item.id}>
            <th scope="row"><a href={processHref + '?seccio=activitat-' + (index + 1)}>{item.id} · {item.step}</a></th>
            <td>{item.problemSummary}</td><td>{currentDecisions[item.id]}</td><td>{item.improvementSummary}</td><td>{item.category.replaceAll('; ', ' · ')}</td>
          </tr>)}</tbody>
        </table>
      </div>
    </section>
    <section id="model-actual" className="section-space wrap">
      <ProcessDiagram title="Model AS-IS" caption="Diagrama del recorregut actual, amb els departaments i els intercanvis amb proveïdors."
        image={{ file: 'as-is-diagrama.png', width: 7998, height: 3870, alt: 'Procés d’aprovisionament actual amb els carrils de producció, compres, magatzem i qualitat.' }}
        textHref={processHref + '?seccio=activitats'} textLabel="Llegir les activitats i decisions" />
    </section>
  </>
}

const improvedFlow = [
  ['Planificar i reservar material', 'L’ERP relaciona la necessitat amb la versió del pla i calcula l’estoc utilitzable. Amb estoc suficient, reserva el material i comprova si cal reposar. Si en falta, reserva la part disponible i tramita la quantitat pendent.'],
  ['Autoritzar i comprar', 'Una petició aprovada passa a compres. Si cal corregir-la, torna a revisió. Si es rebutja, es tanca amb el motiu. Compres torna a buscar si cap oferta és adequada. Amb una oferta vàlida, l’ERP emet la comanda.'],
  ['Fer seguiment del lliurament', 'L’ERP contrasta la data confirmada amb la requerida i avisa de les ordres afectades. Davant d’un retard, compres pot reclamar, replanificar o buscar una alternativa després de resoldre el saldo que es vol substituir.'],
  ['Rebre i validar el lot', 'La recepció completa o la part rebuda d’una recepció parcial passa a qualitat. El saldo queda pendent. Les diferències es bloquegen i es deriven a reclamació. Un lot en revisió continua bloquejat fins que es repetisca el control. Els lots rebutjats es deriven a reclamació.'],
  ['Registrar el material acceptat', 'Magatzem confirma la quantitat acceptada i la ubicació. L’ERP actualitza les existències una sola vegada i avisa producció.'],
]

export function ImprovementPage() {
  return <>
    <PageIntro label="Aprovisionament de matèries primeres" title="Proposta de millora">Compartir les dades en un ERP reduiria compres urgents, registres duplicats i errors de coordinació.</PageIntro>
    <SectionLinks page="millora" links={[['canvis', 'Categories BPR'], ['recorregut', 'Recorregut proposat'], ['model-proposat', 'Diagrama TO-BE']]} />
    <section id="canvis" className="section-space wrap">
      <h2>Les quatre categories de millora</h2>
      <div className="improvement-list">{improvementCategories.map((item) => <article key={item.title}>
        <h3>{item.title}</h3><p>{item.change}</p><p><strong>Justificació.</strong> {item.reason}</p>
      </article>)}</div>
      <a className="text-link next-link" href={pageHref('proces') + '?seccio=diagnostic'}>Consultar la millora de cada activitat</a>
    </section>
    <section id="recorregut" className="section-space wrap">
      <h2>Com funcionaria el procés proposat</h2>
      <ol className="improved-flow">{improvedFlow.map(([title, description]) => <li key={title}><h3>{title}</h3><p>{description}</p></li>)}</ol>
      <a className="text-link next-link" href={pageHref('requisits') + '?seccio=tasques-erp'}>Veure quines tasques necessiten l’ERP</a>
    </section>
    <section id="model-proposat" className="section-space wrap">
      <ProcessDiagram title="Model TO-BE" caption="Model BPMN 2.0 de la proposta, pendent d’implantació. Les tasques amb l’etiqueta «ERP» tenen suport del sistema."
        image={{ file: 'to-be-diagrama.png', width: 9000, height: 3918, alt: 'Model TO-BE d’aprovisionament amb producció, compres, magatzem, qualitat, suport ERP i proveïdors.' }}
        textHref={pageHref('millora') + '?seccio=recorregut'} textLabel="Llegir el recorregut proposat" />
    </section>
  </>
}

const requirementGroups = [
  { id: 'planificacio', title: 'Planificació i existències', stories: ['HU-01', 'HU-02', 'HU-09'] },
  { id: 'compres', title: 'Compres i proveïdors', stories: ['HU-03', 'HU-04', 'HU-10', 'HU-11'] },
  { id: 'recepcio', title: 'Recepció i qualitat', stories: ['HU-06', 'HU-07'] },
  { id: 'coordinacio', title: 'Coordinació amb producció', stories: ['HU-05', 'HU-08'] },
]

function StoryReferences({ ids }) {
  return <span className="reference-links">{ids.map((id) => <a key={id} href={pageHref('requisits') + '?seccio=' + id.toLowerCase()}>{id}</a>)}</span>
}

export function RequirementsPage() {
  return <>
    <PageIntro title="Requisits ERP">Històries d’usuari, dades diferencials i cobertura de les tasques del procés proposat.</PageIntro>
    <SectionLinks page="requisits" links={[['histories', 'Històries d’usuari'], ['dades', 'Dades diferencials'], ['tasques-erp', 'Cobertura ERP']]} />
    <section id="histories" className="section-space wrap">
      <h2>Històries d’usuari</h2>
      <p className="requirements-note">Les històries HU-05 i HU-07 descriuen particularitats que cal verificar en els productes avaluats.</p>
      <div className="requirement-groups">{requirementGroups.map((group, index) => <details id={group.id} key={group.id} className="requirement-group" open={index === 0}>
        <summary><span>{group.title}</span><span aria-hidden="true">+</span></summary>
        <div className="story-list">{group.stories.map((id) => {
          const story = userStories.find((item) => item.id === id)
          return <article className="user-story" key={id} id={id.toLowerCase()} aria-labelledby={id + '-title'}>
            <div className="story-meta"><h3 id={id + '-title'}>{id}</h3><span>Pas {story.steps}</span>{story.differential && <strong className="story-specific">Candidat diferencial</strong>}</div>
            <p className="story-statement">Com a <strong>{story.role}</strong>, vull {story.need} per a {story.benefit}.</p>
            <p className="story-check"><strong>Validació.</strong> {story.acceptance}</p>
            {story.differentialReason && <p className="story-check"><strong>Particularitat.</strong> {story.differentialReason}</p>}
          </article>
        })}</div>
      </details>)}</div>
    </section>
    <section id="dades" className="section-space wrap">
      <h2>Dades diferencials</h2>
      <div className="table-scroll" role="region" aria-label="Dades diferencials del procés" tabIndex={0}>
        <table className="work-table">
          <caption>Dades específiques de qualitat i de planificació</caption>
          <thead><tr><th scope="col">Dada i camps necessaris</th><th scope="col">Origen i ús en el procés</th><th scope="col">Històries</th></tr></thead>
          <tbody>{differentialData.map((item) => <tr key={item.name}><th scope="row">{item.name}<small>{item.fields}</small></th><td><strong>{item.source}.</strong> {item.use}</td><td><StoryReferences ids={item.stories.match(/HU-\d+/g)} /></td></tr>)}</tbody>
        </table>
      </div>
    </section>
    <section id="tasques-erp" className="section-space wrap">
      <h2>Cobertura ERP</h2>
      <p className="requirements-note">Les tasques d’usuari requereixen una entrada o decisió humana. Les tasques de servei automatitzen càlculs, emissions i registres.</p>
      <div className="table-scroll" role="region" aria-label="Tasques amb suport ERP" tabIndex={0}>
        <table className="work-table">
          <caption>Relació entre les tasques del TO-BE i les històries d’usuari</caption>
          <thead><tr><th scope="col">Pas i tasca</th><th scope="col">Responsable</th><th scope="col">Tipus de tasca</th><th scope="col">Històries</th></tr></thead>
          <tbody>{erpTasks.map((task) => <tr key={task.id}><th scope="row">{task.step} · {task.label}</th><td>{task.owner}</td><td>{task.kind}</td><td><StoryReferences ids={userStories.filter((story) => story.taskRefs.includes(task.id)).map((story) => story.id)} /></td></tr>)}</tbody>
        </table>
      </div>
    </section>
  </>
}
