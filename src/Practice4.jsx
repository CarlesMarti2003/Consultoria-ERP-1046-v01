import { useEffect, useRef, useState } from 'react'
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer'
import { analysis, differentialData, improvementCategories, improvementPriorities, indicators, userStories } from './practice4Content.js'

const base = import.meta.env.BASE_URL

function Intro({ label, title, children }) {
  return <header className="page-intro wrap"><p className="page-label">{label}</p><h1>{title}</h1><p className="page-intro-copy">{children}</p></header>
}

function Diagram({ file, title, caption, improved = false }) {
  const mount = useRef(null)
  const viewer = useRef(null)
  const [error, setError] = useState('')
  const url = base + 'models/' + file

  useEffect(() => {
    let active = true
    const instance = new NavigatedViewer({ container: mount.current })
    viewer.current = instance
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error('No s’ha pogut carregar el model.')
        return response.text()
      })
      .then((xml) => instance.importXML(xml))
      .then(() => {
        if (!active) return
        instance.get('canvas').zoom('fit-viewport')
        if (improved) {
          for (const id of ['need', 'calculate', 'reserve', 'request', 'request_correction', 'request_rejected', 'supplier', 'order', 'eta', 'delay_response', 'receive', 'partial', 'qty_issue', 'quality', 'reject', 'quality_pending', 'register']) {
            instance.get('canvas').addMarker(id, 'erp-task')
          }
        }
      })
      .catch(() => { if (active) setError('No s’ha pogut mostrar el model. Descarrega el fitxer BPMN per obrir-lo en Camunda Modeler.') })
    return () => { active = false; viewer.current = null; instance.destroy() }
  }, [url, improved])

  const zoom = (factor) => {
    const canvas = viewer.current?.get('canvas')
    if (canvas) canvas.zoom(canvas.zoom() * factor)
  }

  return (
    <figure className="model-figure">
      <div className="model-heading">
        <div><h2>{title}</h2><p>{caption}</p></div>
        <div className="model-actions">
          <button type="button" onClick={() => zoom(1.25)} aria-label="Ampliar el model">+</button>
          <button type="button" onClick={() => zoom(.8)} aria-label="Reduir el model">−</button>
          <button type="button" onClick={() => viewer.current?.get('canvas').zoom('fit-viewport')}>Ajustar</button>
          <a href={url} download>Descarregar BPMN</a>
        </div>
      </div>
      <div className="bpmn-canvas" ref={mount} role="img" aria-label={title + '. El fitxer BPMN es pot descarregar amb l’enllaç de damunt.'} />
      {error && <p className="model-error" role="alert">{error}</p>}
      <figcaption>Amplia el model amb «+» i arrossega'l per llegir cada pas. {improved && 'Les tasques ressaltades tenen suport de l’ERP. Les fletxes que tornen a un pas anterior mostren correccions, canvis de proveïdor o revisions pendents. Les peticions rebutjades i els lots no conformes es deriven fora del recorregut principal.'}</figcaption>
    </figure>
  )
}

export function AnalysisPage() {
  return <>
    <Intro label="Anàlisi" title="Com funciona ara el procés">
      El model AS-IS recull el recorregut actual. Revisem cada pas, els punts de decisió i l’efecte que poden tindre els problemes en l’equip.
    </Intro>
    <section className="section-space analysis-section">
      <div className="wrap"><Diagram file="as-is.bpmn" title="Model AS-IS" caption="Des de la necessitat de producció fins al registre manual de l’entrada." /></div>
    </section>
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2>Revisió de cada activitat</h2><p>La insatisfacció indicada és una possibilitat deduïda del procés; cal contrastar-la amb el personal de cada departament.</p></div>
        <div className="analysis-list">
          {analysis.map((item) => <article key={item.id} className="analysis-item">
            <span className="analysis-id">{item.id}</span>
            <div><h3>{item.step}</h3><p className="analysis-owner">{item.owner} · {item.assessment}</p><p>{item.diagnosis}</p><p><strong>Possible insatisfacció:</strong> {item.participantConcern}</p><p><strong>Punt de decisió:</strong> {item.decision}</p><p><strong>Conseqüència:</strong> {item.consequence}</p><p><strong>Millora:</strong> {item.improvement}</p><p className="analysis-category">Categories {item.category}</p></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section-space table-section">
      <div className="wrap">
        <div className="section-heading-row"><h2>Problemes i decisions</h2><p>La taula condensa l’anàlisi anterior i relaciona cada problema amb la resposta proposada.</p></div>
        <div className="table-scroll"><table className="work-table"><thead><tr><th>Pas i valoració</th><th>Problema principal</th><th>Punt de decisió</th><th>Millora i categoria</th></tr></thead><tbody>{analysis.map((item) => <tr key={item.id}><th scope="row">{item.id} · {item.step}<small>{item.assessment}</small></th><td>{item.problemSummary}</td><td>{item.decision}</td><td>{item.improvement}<small>Categories {item.category}</small></td></tr>)}</tbody></table></div>
        <a className="text-link next-link" href="#/millora">Veure les millores i el TO-BE <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </>
}

export function ImprovementPage() {
  return <>
    <Intro label="Millora" title="Del procés actual al procés proposat">
      La proposta actua sobre els errors detectats sense canviar l’abast: acaba quan el material acceptat queda disponible per a producció.
    </Intro>
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2>Quatre línies de millora</h2><p>Les actuacions combinen canvis en el procés i suport de l’ERP. Les decisions de compres i qualitat continuen sota responsabilitat humana.</p></div>
        <div className="improvement-list">{improvementCategories.map((item, index) => <article key={item.title}>
          <span className="analysis-id">0{index + 1}</span>
          <div><h3>{item.title}</h3><p className="improvement-steps">Passos {item.steps}</p><p>{item.change}</p><p><strong>Justificació:</strong> {item.reason}</p></div>
        </article>)}</div>
      </div>
    </section>
    <section className="section-space priority-section">
      <div className="wrap">
        <div className="section-heading-row"><h2>Per on començar</h2><p>Prioritzem els problemes que poden fer prendre decisions amb dades incorrectes o aturar la fabricació.</p></div>
        <ol className="priority-list">{improvementPriorities.map((item) => <li key={item.title}><span>{item.level}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ol>
        <div className="validation-note"><h3>Validació amb els participants</h3><p>Abans de donar per confirmades les causes i la insatisfacció, cal parlar amb producció, magatzem, compres i qualitat. Les entrevistes poden revelar excepcions i ajudar a ajustar les prioritats.</p></div>
        <div className="validation-note"><h3>Com mesurarem el canvi</h3><p>Estos indicadors necessiten un valor inicial abans de fixar objectius:</p><ul className="indicator-list">{indicators.map((indicator) => <li key={indicator}>{indicator}</li>)}</ul></div>
      </div>
    </section>
    <section className="section-space analysis-section">
      <div className="wrap"><Diagram file="to-be.bpmn" title="Model TO-BE · BPMN2" caption="El model separa les decisions humanes de les tasques amb suport de l’ERP." improved />
        <div className="to-be-notes"><h2>Què canvia en el recorregut</h2><p>Primer es comprova si l’estoc utilitzable cobreix la necessitat actual. Si la cobreix, es reserva el material i es revisa igualment el punt de reposició. Per tant, pot iniciar-se una compra encara que la fabricació immediata tinga material. Si no cal reposar, el cas es tanca sense compra. Si la necessitat no està coberta, la sol·licitud és directa. Una petició retornada torna a revisió després de corregir-la. Una petició rebutjada es tanca sense emetre cap comanda.</p><p>Quan la data confirmada posa en risc la fabricació, compres decideix si reclama al proveïdor, en busca un altre o replanifica. Després torna a comprovar la data o repeteix la selecció de proveïdor. Una recepció parcial deixa obert el saldo pendent i envia només la part rebuda a qualitat. Quan arribe la resta, es registra una altra recepció contra la mateixa comanda. Un material incorrecte es bloqueja i passa a reclamació. Un lot pendent continua bloquejat i torna a inspecció quan es completen les proves. Els lots bloquejats o rebutjats s’associen a les ordres de fabricació afectades. Només la quantitat acceptada s’incorpora a l’estoc i es comunica a producció.</p></div>
        <p className="model-note">Aquest és un model proposat per avaluar solucions ERP. No representa una implantació ja feta ni beneficis mesurats.</p>
        <a className="text-link next-link" href={base + 'presentacio/Nexe-P4-analisi-i-millora-v4.pptx'} download>Descarregar la presentació de dues diapositives <span aria-hidden="true">↗</span></a>
        <a className="text-link next-link" href="#/requisits">Consultar els requisits ERP <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </>
}

export function RequirementsPage() {
  return <>
    <Intro label="Requisits" title="Què ha de permetre l’ERP">
      Les històries d’usuari descriuen què necessiten les persones que participen en el procés. Serviran per comprovar les solucions ERP durant la selecció posterior.
    </Intro>
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2>Històries d’usuari</h2><p>Les funcions habituals, com les reserves, la comparació d’ofertes i els punts de reposició, també són necessàries. Marquem com a candidats diferencials només els requisits vinculats a particularitats del procés ceràmic que cal verificar en cada ERP.</p></div>
        <ol className="story-list">{userStories.map((story) => <li key={story.id}>
          <div className="story-meta"><span>{story.id}</span><span>Pas {story.steps}</span><span>{story.task}</span>{story.differential && <strong>Candidat diferencial</strong>}</div>
          <p>Com a <strong>{story.role}</strong>, vull {story.need} per a {story.benefit}.</p>
          {story.differentialReason && <p className="story-reason"><strong>Per què cal verificar-lo:</strong> {story.differentialReason}</p>}
        </li>)}</ol>
        <p className="story-note">«Diferencial» no significa que cap ERP ho puga fer. Vol dir que no podem donar per suposada aquesta capacitat a partir de les funcions bàsiques i l’hem de comprovar en el producte concret. En el model, les tasques d’usuari requereixen una decisió o entrada humana. Les tasques de servei fan càlculs o envien avisos a partir de dades confirmades.</p>
      </div>
    </section>
    <section className="section-space table-section">
      <div className="wrap"><div className="section-heading-row"><h2>Dades específiques a verificar</h2><p>Les dades habituals d’estoc, reserves, dates i punts de reposició continuen sent necessàries, però no les presentem com a diferencials. Estes dues relacions responen al control del procés que hem proposat.</p></div>
        <div className="table-scroll"><table className="work-table"><thead><tr><th>Dada</th><th>Per què cal</th><th>Històries</th></tr></thead><tbody>{differentialData.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.use}</td><td>{item.stories}</td></tr>)}</tbody></table></div>
      </div>
    </section>
    <section className="section-space sources-inline"><div className="wrap"><h2>Documents de consulta</h2><p>La notació del model segueix <a href="https://www.omg.org/spec/BPMN/2.0/" target="_blank" rel="noopener noreferrer">BPMN 2.0 de l’OMG</a>. Les categories de millora parteixen de la <a href="https://tallyfy.com/business-process-improvement-ideas/" target="_blank" rel="noopener noreferrer">guia de Tallyfy</a>. Per redactar les històries hem seguit l’estructura descrita per <a href="https://www.atlassian.com/es/agile/project-management/user-stories" target="_blank" rel="noopener noreferrer">Atlassian</a>. La <a href="https://learn.microsoft.com/en-us/dynamics365/business-central/setup-best-practices-planning-parameters" target="_blank" rel="noopener noreferrer">documentació de Business Central</a> mostra que els punts de reposició i les reserves són funcions de planificació habituals.</p></div></section>
  </>
}
