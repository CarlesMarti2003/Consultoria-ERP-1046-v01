import { projectNavigation, pageHref, readRoute } from './navigation.js'
import { modelUrl } from './modelAssets.js'

export function SectionBrowser({ page, sections }) {
  const route = readRoute()
  const legacy = sections.find((item) => item.id === route.section || (item.anchors?.includes(route.section) || item.anchors?.includes(route.view)))
  const active = sections.find((item) => item.id === route.view) || legacy || sections[0]
  return <div className="section-browser wrap">
    <nav className="section-navigation" aria-label="Continguts d’aquest apartat">
      {sections.map((item) => <a key={item.id} href={pageHref(page) + '?vista=' + item.id} aria-current={active.id === item.id ? 'page' : undefined}>{item.label}{item.count && <span>{item.count}</span>}</a>)}
    </nav>
    <div className="section-panel" key={active.id} data-view={active.id}>{active.content}</div>
  </div>
}

export function ProjectMenu({ page }) {
  const current = projectNavigation.find((item) => item.page === page)
  const links = <ol>{projectNavigation.map((item,index) => <li key={item.page}><a href={item.href} aria-current={page === item.page ? 'page' : undefined}><span>{String(index + 1).padStart(2,'0')}</span>{item.label}</a></li>)}</ol>
  return <aside className="project-menu" aria-label="Projecte Ceràmica Riu Sec">
    <a className="back-to-cases" href="#/casos">← Tots els casos</a>
    <p className="project-menu-name">Ceràmica Riu Sec</p><p className="project-menu-status">Projecte en curs</p>
    <nav className="desktop-project-index" aria-label="Apartats del projecte">{links}</nav>
    <details className="mobile-project-index" key={page}><summary>{current.label}<span>Canviar apartat ⌄</span></summary><nav aria-label="Apartats del projecte">{links}</nav></details>
  </aside>
}

export function ProjectPager({ page }) {
  const index = projectNavigation.findIndex((item) => item.page === page)
  const previous = projectNavigation[index - 1]
  const next = projectNavigation[index + 1]
  return <nav className="project-pager wrap" aria-label="Continuar pel projecte">
    {previous ? <a href={previous.href}><small>← Apartat anterior</small><strong>{previous.label}</strong></a> : <a href="#/casos"><small>← Tornar</small><strong>Casos d’èxit</strong></a>}
    {next ? <a href={next.href}><small>A continuació →</small><strong>{next.label}</strong></a> : <a href={pageHref('projecte')}><small>Tornar al començament →</small><strong>Resum del projecte</strong></a>}
  </nav>
}

export function ProjectOverview() {
  return <>
    <header className="page-intro wrap"><p className="page-label">Indústria ceràmica · Onda</p><h1>Ceràmica Riu Sec</h1><p className="page-intro-copy">Revisió de l’aprovisionament de matèries primeres per coordinar producció, compres, magatzem i qualitat.</p></header>
    <section className="project-opening wrap"><div className="project-opening-copy"><p className="page-label">L’encàrrec</p><p className="project-opening-lead">Disposar de material a temps i treballar amb dades d’estoc fiables.</p><p>L’empresa utilitza correus i fulls de càlcul separats. Nexe revisa el procés actual, identifica problemes i prepara una proposta amb suport ERP.</p></div><dl className="project-facts"><div><dt>Procés</dt><dd>Aprovisionament de matèries primeres</dd></div><div><dt>Estat</dt><dd>Anàlisi i proposta de millora</dd></div></dl></section>
    <section className="section-space"><div className="wrap"><h2 className="plain-section-title">Recorregut del projecte</h2><ol className="project-stages">
      {[{ title: 'Entendre el cas', pages: ['empresa','proces'] }, { title: 'Analitzar i millorar', pages: ['analisi','millora'] }, { title: 'Definir la solució', pages: ['requisits','documents'] }].map((stage,index) => <li key={stage.title}><span>{String(index + 1).padStart(2,'0')}</span><h3>{stage.title}</h3><div>{stage.pages.map((page) => <a key={page} href={pageHref(page)}>{projectNavigation.find((item) => item.page === page).label} ↗</a>)}</div></li>)}
    </ol></div></section>
    <section className="section-space project-brief"><div className="wrap split-section"><h2>Abast del treball</h2><div className="body-copy"><p>Comença quan producció identifica una necessitat de matèria primera i acaba quan el material acceptat queda registrat al magatzem. El consum en fabricació i el pagament queden fora de l’abast.</p><p>La proposta encara no s’ha implantat. La selecció del producte ERP i els resultats de la implantació corresponen a fases posteriors.</p></div></div></section>
  </>
}

const downloads = [
  { title: 'Model del procés actual', detail: 'AS-IS · fitxer BPMN editable', file: 'models/as-is.bpmn' },
  { title: 'Model del procés proposat', detail: 'TO-BE · fitxer BPMN editable', file: 'models/to-be.bpmn' },
  { title: 'Presentació del projecte', detail: 'PowerPoint · dues diapositives', file: 'presentacio/Nexe-P4-analisi-i-millora-v5.pptx' },
]
export function Sources() {
  return <section id="fonts" className="section-space sources-inline"><div className="wrap"><h2>Fonts de consulta</h2><ul className="source-list">
    <li><a href="https://www.omg.org/spec/BPMN/2.0/" target="_blank" rel="noopener noreferrer">OMG · BPMN 2.0 ↗</a><p>Notació utilitzada en els models de procés.</p></li>
    <li><a href="https://tallyfy.com/business-process-improvement-ideas/" target="_blank" rel="noopener noreferrer">Tallyfy · Millora de processos ↗</a><p>Categories que orienten les propostes de millora.</p></li>
    <li><a href="https://www.atlassian.com/es/agile/project-management/user-stories" target="_blank" rel="noopener noreferrer">Atlassian · Històries d’usuari ↗</a><p>Estructura de les necessitats dels participants.</p></li>
    <li><a href="https://learn.microsoft.com/en-us/dynamics365/business-central/setup-best-practices-planning-parameters" target="_blank" rel="noopener noreferrer">Microsoft · Paràmetres de planificació ↗</a><p>Referència funcional sobre reserves i reposició. L’ERP encara no està seleccionat.</p></li>
  </ul></div></section>
}
export function Documents() {
  return <>
    <header className="page-intro wrap"><p className="page-label">Ceràmica Riu Sec</p><h1>Documents i fonts</h1><p className="page-intro-copy">Tots els fitxers del projecte i les referències consultades, en un mateix lloc.</p></header>
    <section id="descarregues" className="section-space"><div className="wrap"><h2 className="plain-section-title">Descarregar fitxers</h2><ul className="download-list">{downloads.map((item) => <li key={item.file}><div><h3>{item.title}</h3><p>{item.detail}</p></div><a href={item.file.startsWith('models/') ? modelUrl(item.file.slice(7)) : import.meta.env.BASE_URL + item.file} download>Descarregar <span aria-hidden="true">↓</span></a></li>)}</ul><p className="document-help">Pots consultar els models en la web, en «Procés actual» i «Proposta de millora». Els fitxers BPMN també es poden obrir amb bpmn.io o Camunda Modeler.</p></div></section>
    <Sources />
  </>
}
