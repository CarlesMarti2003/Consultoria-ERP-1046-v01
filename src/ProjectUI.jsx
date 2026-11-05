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
  return <div className="project-navigation wrap">
    <div className="project-context"><a href="#/casos">← Casos d’èxit</a><span>Ceràmica Riu Sec</span></div>
    <nav aria-label="Apartats del projecte">{projectNavigation.map((item) => <a key={item.page} href={item.href} aria-current={page === item.page ? 'page' : undefined}>{item.label}</a>)}</nav>
  </div>
}

export function ProjectPager({ page }) {
  const index = projectNavigation.findIndex((item) => item.page === page)
  const previous = projectNavigation[index - 1]
  const next = projectNavigation[index + 1]
  return <nav className="project-pager wrap" aria-label="Continuar pel projecte">
    {previous ? <a href={previous.href}><small>← Apartat anterior</small><strong>{previous.label}</strong></a> : <a href="#/casos"><small>← Tornar</small><strong>Casos d’èxit</strong></a>}
    {next ? <a href={next.href}><small>A continuació →</small><strong>{next.label}</strong></a> : <a href={pageHref('projecte')}><small>Tornar al començament →</small><strong>El projecte</strong></a>}
  </nav>
}

export function ProjectOverview() {
  return <>
    <header className="page-intro wrap"><p className="page-label">Indústria ceràmica · Onda</p><h1>Ceràmica Riu Sec</h1><p className="page-intro-copy">Fabricant de taulells amb 64 persones. Ajudem l’empresa a coordinar l’aprovisionament de matèries primeres.</p></header>
    <section className="section-space wrap case-brief"><article><h2>El repte</h2><p>Els correus i fulls separats dificulten conéixer l’estoc real i provoquen compres urgents i avisos tardans.</p></article><article><h2>L’objectiu</h2><p>Tindre el material a temps i compartir la informació entre producció, compres, magatzem i qualitat.</p></article><article id="abast"><h2>L’abast</h2><p>De la necessitat de producció al registre del material acceptat. La fabricació i el pagament queden fora.</p></article></section>
    <p className="project-status wrap"><strong>Projecte en curs.</strong> Millores proposades, pendents d’implantació.</p>
  </>
}

const downloads = [
  { title: 'Model del procés actual', detail: 'AS-IS · imatge PNG', file: 'models/as-is-diagrama.png' },
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
