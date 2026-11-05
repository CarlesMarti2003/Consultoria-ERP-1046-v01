import { useEffect, useRef, useState } from 'react'
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer'
import { analysis, differentialData, erpTasks, improvementCategories, improvementPriorities, indicators, userStories } from './practice4Content.js'

import { SectionBrowser } from './ProjectUI.jsx'
import { pageHref, readRoute } from './navigation.js'
import { modelUrl } from './modelAssets.js'

function Intro({ label, title, children }) {
  return <header className="page-intro wrap"><p className="page-label">{label}</p><h1>{title}</h1><p className="page-intro-copy">{children}</p></header>
}

function showDiagramStart(instance, container) {
  const canvas = instance.get('canvas')
  const elements = instance.get('elementRegistry')
  const start = elements.filter((element) => element.type === 'bpmn:StartEvent')[0]
  const company = elements.filter((element) => element.type === 'bpmn:Participant' && element.businessObject.processRef)[0]
  if (!start || !container.clientWidth || !container.clientHeight) return
  const scale = 1
  canvas.resized()
  canvas.viewbox({
    x: Math.max(0, company ? company.x - 16 : start.x - 32),
    y: Math.max(0, company ? company.y - 16 : start.y + start.height / 2 - container.clientHeight / (2 * scale)),
    width: container.clientWidth / scale,
    height: container.clientHeight / scale,
  })
}

export function Diagram({ file, title, caption, improved = false }) {
  const mount = useRef(null)
  const figure = useRef(null)
  const expandButton = useRef(null)
  const viewer = useRef(null)
  const [error, setError] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const url = modelUrl(file)

  useEffect(() => {
    let active = true
    let resizeObserver
    setLoaded(false)
    setError('')
    const instance = new NavigatedViewer({ container: mount.current, zoomScroll: { enabled: false } })
    viewer.current = instance
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('No s’ha pogut carregar el model.')
        return response.text()
      })
      .then((xml) => { if (active) return instance.importXML(xml) })
      .then(() => {
        if (!active) return
        if (improved) {
          for (const id of erpTasks.map((task) => task.id)) instance.get('canvas').addMarker(id, 'erp-task')
        }
        instance.get('canvas').zoom('fit-viewport', 'auto')
        resizeObserver = new ResizeObserver(() => {
          if (active) { instance.get('canvas').resized(); instance.get('canvas').zoom('fit-viewport', 'auto') }
        })
        resizeObserver.observe(mount.current)
        setLoaded(true)
      })
      .catch(() => { if (active) setError('No s’ha pogut mostrar el model. Torna a carregar la pàgina o descarrega el fitxer BPMN.') })
    return () => { active = false; resizeObserver?.disconnect(); viewer.current = null; instance.destroy() }
  }, [url, improved])

  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => expandButton.current?.focus())
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { event.preventDefault(); setExpanded(false); return }
      if (event.key !== 'Tab') return
      const focusable = [...figure.current.querySelectorAll('button:not(:disabled), a[href], [tabindex="0"]')]
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      expandButton.current?.focus()
    }
  }, [expanded])

  const zoom = (factor) => {
    const canvas = viewer.current?.get('canvas')
    if (canvas) canvas.zoom(Math.min(3, Math.max(.03, canvas.zoom() * factor)))
  }
  const move = (dx, dy) => viewer.current?.get('canvas').scroll({ dx, dy })

  return <figure ref={figure} className={'model-figure' + (expanded ? ' model-expanded' : '')} role={expanded ? 'dialog' : undefined} aria-modal={expanded || undefined} aria-label={expanded ? title : undefined}>
    <div className="model-heading"><div><h2>{title}</h2><p>{caption}</p></div><button ref={expandButton} className="model-expand-button" type="button" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? 'Tancar vista ampliada ×' : 'Ampliar vista ↗'}</button></div>
    <div className="model-toolbar" aria-label="Controls del model">
      <div className="model-actions"><button type="button" disabled={!loaded} onClick={() => zoom(1.25)} aria-label="Ampliar el model">+</button><button type="button" disabled={!loaded} onClick={() => zoom(.8)} aria-label="Reduir el model">−</button><button type="button" disabled={!loaded} onClick={() => showDiagramStart(viewer.current, mount.current)}>Anar a l’inici</button><button type="button" disabled={!loaded} onClick={() => viewer.current.get('canvas').zoom('fit-viewport', 'auto')}>Veure tot</button></div>
      <div className="model-actions model-pan"><span>Moure</span>{[{ label:'esquerra', symbol:'←', dx:160, dy:0 },{ label:'amunt', symbol:'↑', dx:0, dy:160 },{ label:'avall', symbol:'↓', dx:0, dy:-160 },{ label:'dreta', symbol:'→', dx:-160, dy:0 }].map((direction) => <button key={direction.label} type="button" disabled={!loaded} aria-label={'Anar cap a ' + direction.label} onClick={() => move(direction.dx, direction.dy)}>{direction.symbol}</button>)}</div>
      <a className="model-download" href={url} download>Descarregar BPMN ↓</a>
    </div>
    <div className="bpmn-canvas" ref={mount} role="img" aria-label={title + '. Usa els controls per ampliar i recórrer el diagrama.'} />
    {!loaded && !error && <p role="status" className="model-status">Carregant el model…</p>}
    {error && <p className="model-error" role="alert">{error}</p>}
    <figcaption><span className="model-legend"><span><svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>Inici</span><span><svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="3" /></svg>Final</span><span><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 23 12 12 23 1 12Z M8 8 16 16 M16 8 8 16" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>Decisió exclusiva (X)</span><span>→ Seqüència dins de l’empresa</span><span>⇢ Missatge entre pools</span></span>{improved && 'Les tasques amb fons gris tenen suport ERP.'}</figcaption>
  </figure>
}

export function CurrentProcessDiagram() {
  const dialog = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const url = modelUrl('as-is-diagrama.png')

  useEffect(() => {
    if (!expanded) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current.showModal()
    return () => {
      dialog.current?.close()
      document.body.style.overflow = previousOverflow
    }
  }, [expanded])

  const controls = <div className="model-toolbar">
    <div className="model-actions" aria-label="Controls de la imatge">
      <button type="button" aria-label="Ampliar el model" disabled={zoom >= 12} onClick={() => setZoom((value) => Math.min(12,value * 1.5))}>+</button>
      <button type="button" aria-label="Reduir el model" disabled={zoom <= 1} onClick={() => setZoom((value) => Math.max(1,value / 1.5))}>−</button>
      <button type="button" onClick={() => setZoom(1)}>Veure tot</button>
    </div>
    <a className="model-download" href={url} download="Nexe-model-AS-IS.png">Descarregar imatge ↓</a>
  </div>
  const image = <div className="model-image-viewport" tabIndex="0" role="region" aria-label="Diagrama AS-IS. Desplaça’t per la imatge quan estiga ampliada.">
    <img src={url} alt="Diagrama amb els pools de Ceràmica Riu Sec i proveïdors, i els carrils de producció, compres, magatzem i qualitat." width="7998" height="3870" style={{ width: `${zoom * 100}%`, height: zoom === 1 ? '100%' : 'auto', objectFit: zoom === 1 ? 'contain' : undefined }} />
  </div>

  return <>
    <figure className="model-figure model-image">
      <div className="model-heading"><h2>Model AS-IS</h2><button className="model-expand-button" type="button" onClick={() => { setZoom(1); setExpanded(true) }}>Ampliar vista ↗</button></div>
      {controls}{image}
    </figure>
    <dialog className="model-image-dialog" ref={dialog} aria-labelledby="as-is-dialog-title" onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)}>
      <div className="model-heading"><h2 id="as-is-dialog-title">Model AS-IS</h2><button className="model-expand-button" type="button" onClick={() => setExpanded(false)}>Tancar vista ampliada ×</button></div>
      {controls}{image}
    </dialog>
  </>
}

export function ImprovementPage() {
  const route = readRoute()
  return <>
    <Intro label="Aprovisionament de matèries primeres" title="Proposta de millora">Un registre compartit per coordinar les necessitats, les compres i la disponibilitat del material. És una proposta pendent de validació i implantació.</Intro>
    <section id="canvis" className="section-space wrap"><div className="section-heading-row"><h2>Què proposem canviar</h2><p>Les decisions de compres i qualitat continuen sota responsabilitat humana. L’ERP dona suport al registre, el seguiment i els avisos.</p></div>
      <div className="improvement-list">{improvementCategories.map((item,index) => <article key={item.title}><span className="item-index">{String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.change}</p><p className="improvement-reason"><strong>Justificació.</strong> {item.reason}</p><p className="improvement-steps">Activitats {item.steps}</p></article>)}</div>
    </section>
    <section id="model-proposat" className="section-space wrap"><Diagram file="to-be.bpmn" title="Model TO-BE" caption="Procés proposat amb suport ERP." improved />
        <details className="model-explanation content-disclosure"><summary>Decisions i incidències del recorregut <span aria-hidden="true">+</span></summary><div className="to-be-notes"><h2>Què canvia en el recorregut</h2><h3>Disponibilitat i reposició</h3><p>Primer es calcula la disponibilitat i una proposta de reposició amb el consum previst i les entrades confirmades. Les reserves es consideren una sola vegada. Es comprova si l’estoc utilitzable cobreix la necessitat actual. Si la cobreix, es reserva el material i es revisa igualment el punt de reposició. Per tant, pot iniciar-se una compra encara que la fabricació immediata tinga material. Si no cal reposar, el cas es tanca sense compra. Si no està coberta, es reserva la part utilitzable i es demana la quantitat pendent, junt amb la reposició que pertoque. </p><h3>Revisió de la petició</h3><p>Una petició retornada torna a revisió després de corregir-la. Una petició rebutjada es tanca sense emetre cap comanda.</p><h3>Resposta als retards</h3><p>Quan la data confirmada posa en risc la fabricació, compres decideix si reclama al proveïdor, en busca un altre o replanifica. Després torna a comprovar la data. Si cal un altre proveïdor, primer resol el saldo substituït de la comanda original i després repeteix la selecció. Si cap oferta és adequada, torna a buscar-ne abans d’emetre una comanda. </p><h3>Recepcions parcials</h3><p>Una recepció parcial deixa obert el saldo pendent i envia només la part rebuda a qualitat. Quan arribe la resta, es registra una altra recepció contra la mateixa comanda. Un material incorrecte es bloqueja i passa a reclamació. </p><h3>Qualitat i lots bloquejats</h3><p>Un lot pendent continua bloquejat i torna a inspecció quan es completen les proves. Els lots bloquejats o rebutjats s’associen a les ordres de fabricació afectades. </p><h3>Registre del material acceptat</h3><p>Magatzem confirma la quantitat acceptada i la ubicació. A partir d’aquesta confirmació, el servei de l’ERP actualitza l’estoc i avisa producció.</p></div></details>
    </section>
    <section className="section-space wrap proposal-evidence">
      <details id="diagnostic" className="content-disclosure" open={route.section === 'diagnostic' || route.section === 'resum-problemes'}><summary>Anàlisi i justificació de les huit activitats <span aria-hidden="true">+</span></summary>
        <p className="evidence-intro">La valoració i les possibles preocupacions s’han de contrastar amb el personal de cada departament.</p>
        <div className="analysis-list">{analysis.map((item) => <article key={item.id} className="analysis-item"><div className="analysis-title"><span className="item-index">{item.id}</span><div><h3>{item.step}</h3><p className="analysis-owner">{item.owner} · {item.assessment}</p></div></div><p className="analysis-diagnosis">{item.diagnosis}</p><dl className="analysis-facts"><div><dt>Participants i conseqüències</dt><dd>{item.participantConcern} {item.consequence}</dd></div><div><dt>Decisió</dt><dd>{item.decision}</dd></div><div><dt>Millora</dt><dd>{item.improvement}</dd></div><div><dt>Justificació</dt><dd>{item.justification}</dd></div></dl><p className="analysis-category">{item.category}</p></article>)}</div>
      </details>
      <details className="project-followup" id="prioritats" open={readRoute().view === 'prioritats' || readRoute().section === 'prioritats'}><summary>Prioritats, indicadors i validació <span aria-hidden="true">+</span></summary><div className="followup-content"><h3>Prioritats</h3><ul>{improvementPriorities.map((item) => <li key={item.title}><strong>{item.level} · {item.title}.</strong> {item.detail}</li>)}</ul><h3>Indicadors</h3><ul>{indicators.map((item) => <li key={item}>{item}</li>)}</ul><p>Cal mesurar el punt de partida i validar les causes i els canvis amb producció, compres, magatzem i qualitat.</p></div></details>
    </section>
  </>
}

const requirementGroups = [
  { id: 'planificacio', title: 'Planificació i existències', detail: 'Necessitats, disponibilitat i assignació del material.', stories: ['HU-01','HU-02','HU-09'] },
  { id: 'compres', title: 'Compres i proveïdors', detail: 'Autoritzacions, ofertes, comandes i resposta als retards.', stories: ['HU-03','HU-04','HU-10','HU-11'] },
  { id: 'recepcio', title: 'Recepció i qualitat', detail: 'Controlar allò que arriba i decidir què es pot utilitzar.', stories: ['HU-06','HU-07'] },
  { id: 'coordinacio', title: 'Coordinació amb producció', detail: 'Conéixer l’impacte de les incidències i confirmar la disponibilitat.', stories: ['HU-05','HU-08'] },
]

function StoryReferences({ ids }) {
  const values = Array.isArray(ids) ? ids : ids.match(/HU-\d+/g) || []
  return <span className="reference-links">{values.map((id) => <a key={id} href={pageHref('requisits') + '?seccio=' + id.toLowerCase()}>{id}</a>)}</span>
}

export function RequirementsPage() {
  const route = readRoute()
  const selected = requirementGroups.find((group) => group.id === route.view || group.id === route.section || group.stories.some((id) => id.toLowerCase() === route.section))?.id || 'planificacio'
  const sections = [{ id:'histories', label:'Històries d’usuari', anchors:[...requirementGroups.map((group) => group.id), ...userStories.map((story) => story.id.toLowerCase())], content:(<section className="section-space"><p className="requirements-note">Onze històries en quatre àrees. HU-05 i HU-07 són candidats diferencials que cal verificar.</p><div className="requirement-groups">{requirementGroups.map((group) => <details id={group.id} key={group.id + selected} className="requirement-group" name="requirement-areas" open={group.id === selected}>
    <summary><h2>{group.title}</h2><span>{group.stories.length} històries <span aria-hidden="true">+</span></span></summary>
    <div className="story-list">{group.stories.map((id) => {
      const story = userStories.find((item) => item.id === id)
      return <article className="user-story" key={id} id={id.toLowerCase()} aria-labelledby={id+'-title'}><div className="story-meta"><h3 id={id+'-title'}>{id}</h3><span>Pas {story.steps}</span>{story.differential && <span className="story-specific">Candidat diferencial</span>}</div><p className="story-statement">Com a <strong>{story.role}</strong>, vull {story.need} per a {story.benefit}.</p><p className="story-check"><strong>Validació.</strong> {story.acceptance}</p>{story.differentialReason && <p className="story-check"><strong>Particularitat.</strong> {story.differentialReason}</p>}</article>
    })}</div>
  </details>)}</div></section>)}]
  sections.push({ id: 'dades', label: 'Dades específiques', content: (<section id="dades" className="section-space data-section"><div className="wrap"><div className="section-heading-row"><h2>Les dades que ho fan possible</h2><p>Les fitxes de producte, estoc i comandes són necessàries. A més, el procés requereix aquestes dades de qualitat i la seua relació amb fabricació.</p></div>
      <div className="table-scroll" role="region" aria-label="Dades específiques del procés" tabIndex="0"><table className="work-table"><thead><tr><th>Dada i camps necessaris</th><th>Origen i ús en el procés</th><th>Històries</th></tr></thead><tbody>{differentialData.map((item) => <tr key={item.name}><th scope="row">{item.name}<small>{item.fields}</small></th><td><strong>{item.source}.</strong> {item.use}</td><td><StoryReferences ids={item.stories} /></td></tr>)}</tbody></table></div>
      <p className="story-note">Les particularitats indicades s’han de comprovar en els mòduls i la configuració del producte concret. Qualitat ha de validar els paràmetres i els límits tècnics.</p>
    </div></section>) })
  sections.push({ id: 'tasques-erp', label: 'Cobertura ERP', anchors: [], content: (<section id="tasques-erp" className="section-space"><div className="wrap"><div className="section-heading-row"><h2>Responsables i suport ERP</h2><p>Les tasques d’usuari impliquen una entrada o una decisió humana. Les tasques de servei automatitzen el càlcul, l’emissió o el registre després de dades confirmades. El fitxer BPMN conserva els responsables i les HU associades en la documentació de cada tasca.</p></div><div className="table-scroll" role="region" aria-label="Tasques amb suport ERP" tabIndex="0"><table className="work-table"><thead><tr><th>Pas i tasca del TO-BE</th><th>Responsable</th><th>Tipus de tasca</th><th>Històries d’usuari</th></tr></thead><tbody>{erpTasks.map((task) => <tr key={task.id}><th scope="row">{task.step} · {task.label}</th><td>{task.owner}</td><td>{task.kind}</td><td><StoryReferences ids={userStories.filter((story) => story.taskRefs.includes(task.id)).map((story) => story.id)} /></td></tr>)}</tbody></table></div></div></section>) })
  return <><Intro label="Requisits ERP" title="Què necessita cada equip">Necessitats dels participants, dades específiques i relació amb les tasques del procés proposat.</Intro><SectionBrowser page="requisits" sections={sections} /></>
}
