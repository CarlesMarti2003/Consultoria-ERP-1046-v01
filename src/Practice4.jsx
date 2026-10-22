import { useEffect, useRef, useState } from 'react'
import NavigatedViewer from 'bpmn-js/lib/NavigatedViewer'
import { analysis, differentialData, improvementCategories, userStories } from './practice4Content.js'

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
          for (const id of ['need', 'calculate', 'reserve', 'request', 'supplier', 'order', 'eta', 'receive', 'qty_issue', 'quality', 'reject', 'register']) {
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
      {improved && <figcaption>Les tasques ressaltades tenen suport de l’ERP. Les passarel·les indiquen decisions; els finals alternatius deixen el material pendent o rebutjat.</figcaption>}
    </figure>
  )
}

export function AnalysisPage() {
  return <>
    <Intro label="Anàlisi" title="Com funciona ara el procés">
      El model AS-IS recull el recorregut actual. Cada pas mostra què falla, quina decisió cal prendre i l’efecte sobre la fabricació.
    </Intro>
    <section className="section-space analysis-section">
      <div className="wrap"><Diagram file="as-is.bpmn" title="Model AS-IS" caption="Des de la necessitat de producció fins al registre manual de l’entrada." /></div>
    </section>
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2>Revisió de cada activitat</h2><p>Els problemes s’han examinat abans de formular les millores. Les decisions del model corresponen als punts on cal comprovar un resultat.</p></div>
        <div className="analysis-list">
          {analysis.map((item) => <article key={item.id} className="analysis-item">
            <span className="analysis-id">{item.id}</span>
            <div><h3>{item.step}</h3><p className="analysis-owner">{item.owner}</p><p>{item.diagnosis}</p><p><strong>Decisió:</strong> {item.decision}</p><p><strong>Conseqüència:</strong> {item.consequence}</p></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section-space table-section">
      <div className="wrap">
        <div className="section-heading-row"><h2>Problemes i resposta</h2><p>La taula resumeix el diagnòstic i la proposta que es desenvolupa en l’apartat següent.</p></div>
        <div className="table-scroll"><table className="work-table"><thead><tr><th>Pas</th><th>Problema</th><th>Conseqüència</th><th>Millora proposada</th></tr></thead><tbody>{analysis.map((item) => <tr key={item.id}><th scope="row">{item.id} · {item.step}</th><td>{item.diagnosis}</td><td>{item.consequence}</td><td>{item.improvement}</td></tr>)}</tbody></table></div>
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
        <div className="section-heading-row"><h2>Quatre línies de millora</h2><p>Hi ha almenys una actuació de cadascuna de les categories exigides. Les decisions de compres i qualitat continuen sota responsabilitat humana.</p></div>
        <div className="improvement-list">{improvementCategories.map((item, index) => <article key={item.title}>
          <span className="analysis-id">0{index + 1}</span>
          <div><h3>{item.title}</h3><p className="improvement-steps">Passos {item.steps}</p><p>{item.change}</p><p><strong>Justificació:</strong> {item.reason}</p></div>
        </article>)}</div>
      </div>
    </section>
    <section className="section-space analysis-section">
      <div className="wrap"><Diagram file="to-be.bpmn" title="Model TO-BE · BPMN2" caption="El model separa les decisions humanes de les tasques amb suport de l’ERP." improved />
        <div className="to-be-notes"><h2>Què canvia en el recorregut</h2><p>La necessitat es vincula al pla de fabricació. L’ERP calcula la disponibilitat descomptant reserves i lots bloquejats. Si falta material, l’aprovació i la comparació d’ofertes queden registrades abans d’emetre la comanda.</p><p>La data confirmada es contrasta amb la data requerida. En la recepció es comprova la quantitat; qualitat allibera o bloqueja el lot. Només el material acceptat actualitza l’estoc i genera l’avís a producció. Les diferències i els rebutjos segueixen camins d’incidència visibles.</p></div>
        <p className="model-note">Aquest és un model proposat per avaluar solucions ERP. No representa una implantació ja feta ni beneficis mesurats.</p>
        <a className="text-link next-link" href={base + 'presentacio/Nexe-P4-analisi-i-millora.pptx'} download>Descarregar la presentació de dues diapositives <span aria-hidden="true">↗</span></a>
        <a className="text-link next-link" href="#/requisits">Consultar els requisits ERP <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </>
}

export function RequirementsPage() {
  return <>
    <Intro label="Requisits" title="Què ha de permetre l’ERP">
      Les històries d’usuari descriuen les necessitats que sorgeixen del TO-BE. Serviran per comparar productes durant la selecció posterior.
    </Intro>
    <section className="section-space">
      <div className="wrap">
        <div className="section-heading-row"><h2>Històries d’usuari</h2><p>Una necessitat per perfil i benefici. Les marcades com a diferencials són les que caldrà comprovar amb especial atenció en les demostracions de l’ERP.</p></div>
        <ol className="story-list">{userStories.map((story) => <li key={story.id}>
          <div className="story-meta"><span>{story.id}</span><span>Pas {story.steps}</span><span>{story.task}</span>{story.differential && <strong>Diferencial</strong>}</div>
          <p>Com a <strong>{story.role}</strong>, vull {story.need} per a {story.benefit}.</p>
        </li>)}</ol>
        <p className="story-note">En el model, les tasques d’usuari requereixen una decisió o entrada humana. Les tasques de servei calculen, registren o envien avisos després d’una acció confirmada.</p>
      </div>
    </section>
    <section className="section-space table-section">
      <div className="wrap"><div className="section-heading-row"><h2>Dades diferencials</h2><p>Estes dades van més enllà de les fitxes habituals de productes, proveïdors i comandes.</p></div>
        <div className="table-scroll"><table className="work-table"><thead><tr><th>Dada</th><th>Per què cal</th><th>Històries</th></tr></thead><tbody>{differentialData.map((item) => <tr key={item.name}><th scope="row">{item.name}</th><td>{item.use}</td><td>{item.stories}</td></tr>)}</tbody></table></div>
      </div>
    </section>
    <section className="section-space sources-inline"><div className="wrap"><h2>Documents de consulta</h2><p>La notació del model segueix <a href="https://www.omg.org/spec/BPMN/2.0/" target="_blank" rel="noopener noreferrer">BPMN 2.0 de l’OMG</a>. Les categories de millora parteixen de la <a href="https://tallyfy.com/business-process-improvement-ideas/" target="_blank" rel="noopener noreferrer">guia de Tallyfy</a>. Per redactar les històries hem seguit l’estructura descrita per <a href="https://www.atlassian.com/es/agile/project-management/user-stories" target="_blank" rel="noopener noreferrer">Atlassian</a>.</p></div></section>
  </>
}
