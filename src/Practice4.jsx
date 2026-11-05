import { useEffect, useRef, useState } from 'react'
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer'
import { analysis, differentialData, erpTasks, improvementCategories, improvementPriorities, indicators, userStories } from './practice4Content.js'

import { SectionBrowser } from './ProjectUI.jsx'
import { pageHref, readRoute } from './navigation.js'
import { modelUrl } from './modelAssets.js'
import { isProjectPagePublished } from './publication.js'

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
        showDiagramStart(instance, mount.current)
        resizeObserver = new ResizeObserver(() => { if (active) showDiagramStart(instance, mount.current) })
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
    <figcaption>Pools: Ceràmica Riu Sec i Proveïdors. Carrils: {improved ? 'Producció, Compres, Magatzem, Qualitat i Suport ERP' : 'Producció, Compres, Magatzem i Qualitat'}. Usa «Moure» o arrossega el diagrama per seguir el recorregut. «Veure tot» mostra el conjunt. <span className="model-legend"><span><svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>Inici</span><span><svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="3" /></svg>Final</span><span><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1 23 12 12 23 1 12Z M8 8 16 16 M16 8 8 16" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>Decisió exclusiva (X)</span><span>→ Seqüència dins de l’empresa</span><span>⇢ Missatge entre pools</span></span>{improved && 'Les tasques ressaltades tenen suport de l’ERP. Les fletxes de retorn indiquen correccions o revisions pendents.'}</figcaption>
  </figure>
}

function ImageDiagram() {
  const dialog = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const url = modelUrl('to-be-diagrama.png')

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
    <a className="model-download" href={url} download="Nexe-model-TO-BE.png">Descarregar imatge ↓</a>
  </div>
  const image = <div className="model-image-viewport" tabIndex="0" role="region" aria-label="Diagrama TO-BE. Desplaça’t per la imatge quan estiga ampliada.">
    <img src={url} alt="Diagrama amb els pools de Ceràmica Riu Sec i proveïdors, i els carrils de producció, compres, magatzem i qualitat." width="7998" height="3870" style={{ width: `${zoom * 100}%`, height: zoom === 1 ? '100%' : 'auto', objectFit: zoom === 1 ? 'contain' : undefined }} />
  </div>

  return <>
    <figure className="model-figure model-image">
      <div className="model-heading"><h2>Model TO-BE</h2><button className="model-expand-button" type="button" onClick={() => { setZoom(1); setExpanded(true) }}>Ampliar vista ↗</button></div>
      {controls}{image}
    </figure>
    <dialog className="model-image-dialog" ref={dialog} aria-labelledby="to-be-dialog-title" onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)}>
      <div className="model-heading"><h2 id="to-be-dialog-title">Model TO-BE</h2><button className="model-expand-button" type="button" onClick={() => setExpanded(false)}>Tancar vista ampliada ×</button></div>
      {controls}{image}
    </dialog>
  </>
}

export function AnalysisPage() {
  return <>
    <Intro label="Anàlisi" title="Problemes detectats">
      Revisem cada activitat del procés actual, els punts de decisió i les conseqüències dels problemes per als departaments.
    </Intro>
    <SectionBrowser page="analisi" sections={[
{ id: 'diagnostic', label: 'Anàlisi per activitat', anchors: [], content: (<section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="diagnostic">Anàlisi de les huit activitats</h2><p>La insatisfacció indicada és una possibilitat deduïda del procés; cal contrastar-la amb el personal de cada departament.</p></div>
        <div className="analysis-list">
          {analysis.map((item) => <details key={item.id} className="analysis-item" name="analisi-activitats">
            <summary className="analysis-heading"><span className="analysis-id">{item.id}</span><h3>{item.step}</h3><p className="analysis-owner">{item.owner} · <span>{item.assessment}</span></p><p className="analysis-preview">{item.problemSummary}</p><span className="disclosure-label">Anàlisi i justificació <span aria-hidden="true">+</span></span></summary>
            <div className="analysis-copy"><p className="analysis-diagnosis">{item.diagnosis}</p><div className="analysis-observations"><div><h4>Participants i conseqüència</h4><p>{item.participantConcern}</p><p>{item.consequence}</p></div><div><h4>Punt de decisió</h4><p>{item.decision}</p></div></div><div className="analysis-response"><h4>Millora proposada</h4><p>{item.improvement}</p><p className="analysis-why">{item.justification}</p></div><p className="analysis-category">Categories {item.category}</p></div>
          </details>)}
        </div>
      </div>
    </section>) },
{ id: 'resum-problemes', label: 'Taula comparativa', anchors: [], content: (<section className="section-space table-section">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="resum-problemes">Taula de problemes, decisions i millores</h2><p>La taula resumeix l’anàlisi textual anterior i relaciona cada problema amb una decisió i una millora.</p></div>
        <div className="table-scroll"><table className="work-table"><thead><tr><th>Pas i valoració</th><th>Problema principal</th><th>Punt de decisió</th><th>Millora proposada i categoria</th></tr></thead><tbody>{analysis.map((item) => <tr key={item.id}><th scope="row">{item.id} · {item.step}<small>{item.assessment}</small></th><td>{item.problemSummary}</td><td>{item.decision}</td><td>{item.improvementSummary}<small>{item.category}</small></td></tr>)}</tbody></table></div>
      </div>
    </section>) }
]} />

  </>
}

export function ImprovementPage() {
  return <>
    <Intro label="Millora" title="Proposta de millora">
      La proposta actua sobre els errors detectats sense canviar l’abast: acaba quan el material acceptat queda disponible per a producció.
    </Intro>
    <SectionBrowser page="millora" sections={[
{ id: 'canvis', label: 'Canvis proposats', anchors: ['prioritats'], content: (<section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="canvis">Millores proposades</h2><p>Les actuacions combinen canvis en el procés i suport de l’ERP. Les decisions de compres i qualitat continuen sota responsabilitat humana.</p></div>
        <p className="model-note">La reposició planificada es planteja com un canvi de la política de compres i s’ha de validar amb direcció. La proposta no pressuposa una ampliació aprovada ni un ERP ja adoptat.</p><div className="improvement-list">{improvementCategories.map((item, index) => <article key={item.title}>
          <span className="analysis-id">0{index + 1}</span>
          <div><h3>{item.title}</h3><p className="improvement-steps">Passos {item.steps}</p><p>{item.change}</p><p><strong>Justificació:</strong> {item.reason}</p></div>
        </article>)}</div>
      </div>
      <details className="project-followup" id="prioritats" open={readRoute().view === 'prioritats' || readRoute().section === 'prioritats'}><summary>Prioritats, indicadors i validació <span aria-hidden="true">+</span></summary><div className="followup-content"><h3>Prioritats</h3><ul>{improvementPriorities.map((item) => <li key={item.title}><strong>{item.level} · {item.title}.</strong> {item.detail}</li>)}</ul><h3>Indicadors</h3><ul>{indicators.map((item) => <li key={item}>{item}</li>)}</ul><p>Cal mesurar el punt de partida i validar les causes i els canvis amb producció, compres, magatzem i qualitat.</p></div></details>
    </section>) },
{ id: 'model-proposat', label: 'Model TO-BE', anchors: [], content: (<section id="model-proposat" className="section-space analysis-section">
      <div className="wrap"><ImageDiagram />
        {isProjectPagePublished('documents') && <a className="text-link next-link" href={pageHref('documents')}>Documents del projecte <span aria-hidden="true">↗</span></a>}
      </div>
    </section>) },

]} />

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
