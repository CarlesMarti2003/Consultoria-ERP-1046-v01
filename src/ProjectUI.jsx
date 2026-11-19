import { projectNavigation, pageHref } from './navigation.js'
import { modelUrl } from './modelAssets.js'

export function PageIntro({ label, title, children }) {
  return <header className="page-intro wrap">
    {label && <p className="page-label">{label}</p>}
    <h1 tabIndex={-1}>{title}</h1>
    <p className="page-intro-copy">{children}</p>
  </header>
}

export function SectionLinks({ page, links }) {
  return <nav className="section-navigation wrap" aria-label="En aquesta pàgina">
    {links.map(([id, label]) => <a key={id} href={pageHref(page) + '?seccio=' + id}>{label}</a>)}
  </nav>
}

export function ProjectMenu({ page }) {
  return <div className="project-navigation wrap">
    <div className="project-context"><a href="#/casos">← Projectes</a><span>Ceràmica Riu Sec</span></div>
    <nav aria-label="Apartats del projecte">{projectNavigation.map((item) => <a key={item.page} href={item.href} aria-current={page === item.page ? 'page' : undefined}>{item.label}</a>)}</nav>
  </div>
}

export function ProjectPager({ page }) {
  const index = projectNavigation.findIndex((item) => item.page === page)
  const previous = projectNavigation[index - 1]
  const next = projectNavigation[index + 1]
  return <nav className="project-pager wrap" aria-label="Continuar pel projecte">
    {previous ? <a href={previous.href}><small>← Apartat anterior</small><strong>{previous.label}</strong></a> : <a href="#/casos"><small>← Tornar</small><strong>Projectes</strong></a>}
    {next ? <a href={next.href}><small>A continuació →</small><strong>{next.label}</strong></a> : <a href={pageHref('projecte')}><small>Tornar al començament →</small><strong>El projecte</strong></a>}
  </nav>
}

export function ProjectOverview() {
  return <>
    <PageIntro label="Indústria ceràmica · Onda" title="Ceràmica Riu Sec">Fabricant de taulells amb 64 persones. El projecte analitza com coordinar l’aprovisionament de matèries primeres.</PageIntro>
    <section className="section-space wrap case-brief"><article><h2>El repte</h2><p>Els correus i fulls separats dificulten conéixer l’estoc real i provoquen compres urgents i avisos tardans.</p></article><article><h2>L’objectiu</h2><p>Tindre el material a temps i compartir la informació entre producció, compres, magatzem i qualitat.</p></article><article id="abast"><h2>L’abast</h2><p>De la necessitat de producció al registre del material acceptat. La fabricació i el pagament queden fora.</p></article></section>
    <p className="project-status wrap"><strong>Projecte en curs.</strong> Millores proposades, pendents d’implantació.</p>
  </>
}

const downloads = [
  { title: 'Model del procés actual', detail: 'AS-IS · imatge PNG', file: 'models/as-is-diagrama.png' },
  { title: 'Model actual editable', detail: 'AS-IS · fitxer BPMN editable', file: 'models/as-is.bpmn' },
  { title: 'Model del procés proposat', detail: 'TO-BE · fitxer BPMN editable', file: 'models/to-be.bpmn' },
  { title: 'Presentació del projecte', detail: 'PowerPoint · dues diapositives', file: 'presentacio/Nexe-P4-Ceramica-Riu-Sec.pptx' },
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
    <PageIntro title="Documents i fonts">Descarrega els models del procés i la presentació per a la posada en comú.</PageIntro>
    <section id="descarregues" className="section-space"><div className="wrap"><h2 className="plain-section-title">Descarregar fitxers</h2><ul className="download-list">{downloads.map((item) => <li key={item.file}><div><h3>{item.title}</h3><p>{item.detail}</p></div><a href={item.file.startsWith('models/') ? modelUrl(item.file.slice(7)) : import.meta.env.BASE_URL + item.file} download aria-label={'Descarregar: ' + item.title}>Descarregar <span aria-hidden="true">↓</span></a></li>)}</ul><p className="document-help">Pots consultar els models en la web, en «Procés actual» i «Proposta de millora». Els fitxers BPMN també es poden obrir amb bpmn.io o Camunda Modeler.</p></div></section>
    <Sources />
  </>
}
