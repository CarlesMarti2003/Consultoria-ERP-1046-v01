import { projectNavigation, pageHref } from './navigation.js'

export function PageContents({ page, items }) {
  return <nav className="page-contents wrap" aria-label="Índex d’aquesta pàgina"><strong>En aquesta pàgina</strong><ul>{items.map(([id, label]) => <li key={id}><a href={pageHref(page) + '?seccio=' + id}>{label}<span aria-hidden="true">↓</span></a></li>)}</ul></nav>
}

export function ProjectMenu({ page }) {
  return <aside className="project-menu" aria-label="Projecte Ceràmica Riu Sec">
    <a className="back-to-cases" href="#/casos">← Tots els casos</a>
    <p className="project-menu-name">Ceràmica Riu Sec</p><p className="project-menu-status">Projecte en curs</p>
    <nav aria-label="Apartats del projecte"><ol>{projectNavigation.map((item, index) => <li key={item.page}><a href={item.href} aria-current={page === item.page ? 'page' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{item.label}</a></li>)}</ol></nav>
    <a className="project-download" href={pageHref('documents')}>Models i presentació ↗</a>
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
    <div className="project-facts wrap"><div><span>Procés</span><strong>Aprovisionament de matèries primeres</strong></div><div><span>Estat</span><strong>Anàlisi i proposta de millora</strong></div><div><span>Objectiu</span><strong>Disposar de material a temps i dades d’estoc fiables</strong></div></div>
    <section className="section-space"><div className="wrap"><div className="section-heading-row"><h2>Explora el projecte</h2><p>Cada apartat respon a una pregunta del treball. Pots llegir-los en ordre o anar directament al que necessites.</p></div>
      <ol className="project-directory">{projectNavigation.slice(1).map((item, index) => <li key={item.page}><a href={item.href}><span className="directory-number">{String(index + 2).padStart(2, '0')}</span><div><h3>{item.label}</h3><p>{item.description}</p></div><span aria-hidden="true">↗</span></a></li>)}</ol>
    </div></section>
    <section className="section-space project-brief"><div className="wrap split-section"><h2>L’encàrrec</h2><div className="body-copy"><p>L’empresa treballa amb correus i fulls de càlcul separats. Nexe revisa el procés actual, identifica problemes i defineix una proposta amb suport ERP.</p><p>El treball comença quan producció identifica una necessitat de matèria primera i acaba quan el material acceptat queda registrat al magatzem. El consum en fabricació i el pagament queden fora de l’abast.</p><p>La proposta encara no s’ha implantat. La selecció del producte ERP i els resultats de la implantació corresponen a fases posteriors.</p></div></div></section>
  </>
}

const downloads = [
  { title: 'Model del procés actual', detail: 'AS-IS · fitxer BPMN editable', file: 'models/as-is.bpmn' },
  { title: 'Model del procés proposat', detail: 'TO-BE · fitxer BPMN editable', file: 'models/to-be.bpmn' },
  { title: 'Presentació del projecte', detail: 'PowerPoint · dues diapositives', file: 'presentacio/Nexe-P4-analisi-i-millora-v4.pptx' },
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
    <PageContents page="documents" items={[["descarregues","Descarregar fitxers"],["fonts","Fonts de consulta"]]} />
    <section id="descarregues" className="section-space"><div className="wrap"><h2 className="plain-section-title">Descarregar fitxers</h2><ul className="download-list">{downloads.map((item) => <li key={item.file}><div><h3>{item.title}</h3><p>{item.detail}</p></div><a href={import.meta.env.BASE_URL + item.file} download>Descarregar <span aria-hidden="true">↓</span></a></li>)}</ul><p className="document-help">Pots consultar els models en la web, en «Procés actual» i «Proposta de millora». Els fitxers BPMN també es poden obrir amb Camunda Modeler.</p></div></section>
    <Sources />
  </>
}
