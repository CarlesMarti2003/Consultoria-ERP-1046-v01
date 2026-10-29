import { useEffect, useRef, useState } from 'react'
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer'
import { analysis, differentialData, erpTasks, improvementCategories, improvementPriorities, indicators, userStories } from './practice4Content.js'

import { PageContents } from './ProjectUI.jsx'
import { pageHref } from './navigation.js'

const base = import.meta.env.BASE_URL

function Intro({ label, title, children }) {
  return <header className="page-intro wrap"><p className="page-label">{label}</p><h1>{title}</h1><p className="page-intro-copy">{children}</p></header>
}

export function Diagram({ file, title, caption, improved = false }) {
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
          for (const id of erpTasks.map((task) => task.id)) {
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
    <Intro label="Anàlisi" title="Problemes detectats">
      Revisem cada activitat del procés actual, els punts de decisió i les conseqüències dels problemes per als departaments.
    </Intro>
    <PageContents page="analisi" items={[["diagnostic","Anàlisi de les huit activitats"],["resum-problemes","Taula de problemes i millores"]]} />
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="diagnostic">Anàlisi de les huit activitats</h2><p>La insatisfacció indicada és una possibilitat deduïda del procés; cal contrastar-la amb el personal de cada departament.</p></div>
        <div className="analysis-list">
          {analysis.map((item) => <article key={item.id} className="analysis-item">
            <span className="analysis-id">{item.id}</span>
            <div><h3>{item.step}</h3><p className="analysis-owner">{item.owner} · {item.assessment}</p><p>{item.diagnosis}</p><p><strong>Possible insatisfacció:</strong> {item.participantConcern}</p><p><strong>Punt de decisió:</strong> {item.decision}</p><p><strong>Conseqüència:</strong> {item.consequence}</p><p><strong>Millora:</strong> {item.improvement}</p><p><strong>Justificació:</strong> {item.justification}</p><p className="analysis-category">Categories {item.category}</p></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section-space table-section">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="resum-problemes">Taula de problemes, decisions i millores</h2><p>La taula resumeix l’anàlisi textual anterior i relaciona cada problema amb una decisió i una millora.</p></div>
        <div className="table-scroll"><table className="work-table"><thead><tr><th>Pas i valoració</th><th>Problema principal</th><th>Punt de decisió</th><th>Millora proposada i categoria</th></tr></thead><tbody>{analysis.map((item) => <tr key={item.id}><th scope="row">{item.id} · {item.step}<small>{item.assessment}</small></th><td>{item.problemSummary}</td><td>{item.decision}</td><td>{item.improvementSummary}<small>{item.category}</small></td></tr>)}</tbody></table></div>
      </div>
    </section>

  </>
}

export function ImprovementPage() {
  return <>
    <Intro label="Millora" title="Proposta de millora">
      La proposta actua sobre els errors detectats sense canviar l’abast: acaba quan el material acceptat queda disponible per a producció.
    </Intro>
    <PageContents page="millora" items={[["canvis","Millores proposades"],["model-proposat","Model TO-BE"],["tasques-erp","Responsables i suport ERP"],["prioritats","Prioritats i indicadors"]]} />
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="canvis">Millores proposades</h2><p>Les actuacions combinen canvis en el procés i suport de l’ERP. Les decisions de compres i qualitat continuen sota responsabilitat humana.</p></div>
        <p className="model-note">La reposició planificada es planteja com un canvi de la política de compres i s’ha de validar amb direcció. La proposta no pressuposa una ampliació aprovada ni un ERP ja adoptat.</p><div className="improvement-list">{improvementCategories.map((item, index) => <article key={item.title}>
          <span className="analysis-id">0{index + 1}</span>
          <div><h3>{item.title}</h3><p className="improvement-steps">Passos {item.steps}</p><p>{item.change}</p><p><strong>Justificació:</strong> {item.reason}</p></div>
        </article>)}</div>
      </div>
    </section>
    <section id="model-proposat" className="section-space analysis-section">
      <div className="wrap"><Diagram file="to-be.bpmn" title="Model TO-BE · BPMN2" caption="El model separa les decisions humanes de les tasques amb suport de l’ERP." improved />
        <div className="to-be-notes"><h2>Què canvia en el recorregut</h2><p>Primer es calcula la disponibilitat i una proposta de reposició amb el consum previst i les entrades confirmades. Les reserves es consideren una sola vegada. Es comprova si l’estoc utilitzable cobreix la necessitat actual. Si la cobreix, es reserva el material i es revisa igualment el punt de reposició. Per tant, pot iniciar-se una compra encara que la fabricació immediata tinga material. Si no cal reposar, el cas es tanca sense compra. Si no està coberta, es reserva la part utilitzable i es demana la quantitat pendent, junt amb la reposició que pertoque. Una petició retornada torna a revisió després de corregir-la. Una petició rebutjada es tanca sense emetre cap comanda.</p><p>Quan la data confirmada posa en risc la fabricació, compres decideix si reclama al proveïdor, en busca un altre o replanifica. Després torna a comprovar la data. Si cal un altre proveïdor, primer resol el saldo substituït de la comanda original i després repeteix la selecció. Si cap oferta és adequada, torna a buscar-ne abans d’emetre una comanda. Una recepció parcial deixa obert el saldo pendent i envia només la part rebuda a qualitat. Quan arribe la resta, es registra una altra recepció contra la mateixa comanda. Un material incorrecte es bloqueja i passa a reclamació. Un lot pendent continua bloquejat i torna a inspecció quan es completen les proves. Els lots bloquejats o rebutjats s’associen a les ordres de fabricació afectades. Magatzem confirma la quantitat acceptada i la ubicació. A partir d’aquesta confirmació, el servei de l’ERP actualitza l’estoc i avisa producció.</p></div>
        <p className="model-note">Aquest és un model proposat per avaluar solucions ERP. No representa una implantació ja feta ni beneficis mesurats.</p>
        <a className="text-link next-link" href={pageHref('documents')}>Models i presentació del projecte <span aria-hidden="true">↗</span></a>
      </div>
    </section>
    <section id="tasques-erp" className="section-space"><div className="wrap"><div className="section-heading-row"><h2>Responsables i suport ERP</h2><p>Les tasques d’usuari impliquen una entrada o una decisió humana. Les tasques de servei automatitzen el càlcul, l’emissió o el registre després de dades confirmades. El fitxer BPMN conserva els responsables i les HU associades en la documentació de cada tasca.</p></div><div className="table-scroll" role="region" aria-label="Tasques amb suport ERP" tabIndex="0"><table className="work-table"><thead><tr><th>Pas i tasca del TO-BE</th><th>Responsable</th><th>Tipus de tasca</th><th>Històries d’usuari</th></tr></thead><tbody>{erpTasks.map((task) => <tr key={task.id}><th scope="row">{task.step} · {task.label}</th><td>{task.owner}</td><td>{task.kind}</td><td>{userStories.filter((story) => story.taskRefs.includes(task.id)).map((story) => story.id).join(' · ')}</td></tr>)}</tbody></table></div></div></section>
    <section className="section-space priority-section">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="prioritats">Prioritats d’actuació</h2><p>Prioritzem els problemes que poden fer prendre decisions amb dades incorrectes o aturar la fabricació.</p></div>
        <ol className="priority-list">{improvementPriorities.map((item) => <li key={item.title}><span>{item.level}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ol>
        <div className="validation-note"><h3>Validació amb els participants</h3><p>Abans de donar per confirmades les causes i la insatisfacció, cal parlar amb producció, magatzem, compres i qualitat. Les entrevistes poden revelar excepcions i ajudar a ajustar les prioritats.</p></div>
        <div className="validation-note"><h3>Com mesurarem el canvi</h3><p>Estos indicadors necessiten un valor inicial abans de fixar objectius:</p><ul className="indicator-list">{indicators.map((indicator) => <li key={indicator}>{indicator}</li>)}</ul></div>
      </div>
    </section>

  </>
}

export function RequirementsPage() {
  return <>
    <Intro label="Requisits" title="Què ha de permetre l’ERP">
      Les històries d’usuari descriuen què necessiten les persones que participen en el procés. Serviran per comprovar les solucions ERP durant la selecció posterior.
    </Intro>
    <PageContents page="requisits" items={[["histories","Històries d’usuari"],["dades","Dades específiques"]]} />
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2 id="histories">Històries d’usuari</h2><p>Les funcions habituals, com les reserves, la comparació d’ofertes i els punts de reposició, també són necessàries. Marquem com a candidats diferencials només els requisits vinculats a particularitats del procés ceràmic que cal verificar en cada ERP.</p></div>
        <ol className="story-list">{userStories.map((story) => <li key={story.id}>
          <div className="story-meta"><span>{story.id}</span><span>Pas {story.steps}</span><span>{[...new Set(erpTasks.filter((task) => story.taskRefs.includes(task.id)).map((task) => task.kind))].join(' + ')}</span>{story.differential && <strong>Candidat diferencial</strong>}</div>
          <p>Com a <strong>{story.role}</strong>, vull {story.need} per a {story.benefit}.</p>
          <p className="story-reason"><strong>Com comprovarem el requisit:</strong> {story.acceptance}</p><p className="story-reason"><strong>Tasques relacionades:</strong> {erpTasks.filter((task) => story.taskRefs.includes(task.id)).map((task) => task.label).join(' · ')}.</p>
          {story.differentialReason && <p className="story-reason"><strong>Per què cal verificar-lo:</strong> {story.differentialReason}</p>}
        </li>)}</ol>
        <p className="story-note">«Diferencial» no significa que cap ERP ho puga fer. Vol dir que no podem donar per suposada aquesta capacitat a partir de les funcions bàsiques i l’hem de comprovar en el producte concret. En el model, les tasques d’usuari requereixen una decisió o entrada humana. Les tasques de servei fan càlculs o envien avisos a partir de dades confirmades.</p>
      </div>
    </section>
    <section className="section-space table-section">
      <div className="wrap"><div className="section-heading-row"><h2 id="dades">Dades específiques a verificar</h2><p>Les dades habituals d’estoc, reserves, dates i punts de reposició continuen sent necessàries, però no les presentem com a diferencials. Les dades següents detallen la configuració específica de qualitat i la relació amb producció que cal verificar en cada producte ERP.</p></div>
        <div className="table-scroll"><table className="work-table"><thead><tr><th>Dada i camps necessaris</th><th>Origen i ús en el procés</th><th>Històries</th></tr></thead><tbody>{differentialData.map((item) => <tr key={item.name}><th scope="row">{item.name}<small>{item.fields}</small></th><td><strong>{item.source}.</strong> {item.use}</td><td>{item.stories}</td></tr>)}</tbody></table></div>
      </div>
    </section>

  </>
}
