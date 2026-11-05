import { useEffect, useState } from 'react'
import { caseStudies, departments, steps, team } from './content.js'
import { AnalysisPage, Diagram, ImprovementPage, RequirementsPage } from './Practice4.jsx'

import { mainNavigation as navigation, projectNavigation as caseNavigation, legalNavigation as footerNavigation, readRoute, pageHref, projectBase } from './navigation.js'
import { Documents, SectionBrowser, ProjectMenu, ProjectOverview, ProjectPager } from './ProjectUI.jsx'

const asset = (file) => import.meta.env.BASE_URL + 'images/' + file

const titles = {
  inici: 'Inici',
  casos: 'Casos d’èxit',
  serveis: 'Serveis',
  projecte: 'Resum del projecte',
  documents: 'Documents i fonts',
  notfound: 'Pàgina no trobada',
  empresa: 'Empresa',
  proces: 'Procés',
  analisi: 'Problemes detectats',
  millora: 'Proposta de millora',
  requisits: 'Requisits',
  consultora: 'Qui som',
  contacte: 'Contacte',
  privacitat: 'Privacitat',
  cookies: 'Cookies',
}

function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const isProject = caseNavigation.some((item) => item.page === page)
  useEffect(() => {
    const close = () => setMenuOpen(false)
    const onKey = (event) => { if (event.key === 'Escape') close() }
    window.addEventListener('hashchange', close)
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('hashchange', close); window.removeEventListener('keydown', onKey) }
  }, [])
  return <header className="site-header">
    <a className="skip-link" href="#main-content" onClick={(event) => { event.preventDefault(); document.getElementById('main-content')?.focus(); document.getElementById('main-content')?.scrollIntoView() }}>Saltar al contingut</a>
    <div className="wrap header-inner">
      <a className="brand" href="#/" aria-label="Nexe Consultoria ERP, tornar a l’inici"><img src={asset('nexe-logo.svg')} alt="Nexe Consultoria ERP" width="1200" height="420" /></a>
      <nav className="desktop-nav" aria-label="Navegació principal">{navigation.map((item) => <a key={item.page} href={item.href} aria-current={page === item.page || (item.page === 'casos' && isProject) ? 'page' : undefined}>{item.label}</a>)}</nav>
      <button type="button" className="menu-button" aria-expanded={menuOpen} aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Tancar' : 'Menú'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
    </div>
    <nav id="mobile-nav" className="mobile-nav" aria-label="Navegació mòbil" hidden={!menuOpen}>
      {navigation.map((item) => <a key={item.page} href={item.href} aria-current={page === item.page || (item.page === 'casos' && isProject) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
      <div className="mobile-project"><p>Ceràmica Riu Sec</p>{caseNavigation.map((item) => <a key={item.page} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}</div>
    </nav>
  </header>
}

function PageIntro({ label, title, children }) {
  return (
    <header className="page-intro wrap">
      <p className="page-label">{label}</p>
      <h1>{title}</h1>
      <p className="page-intro-copy">{children}</p>
    </header>
  )
}

function Home() {
  return <>
    <section className="home-opening"><div className="wrap home-opening-grid">
      <div><p className="page-label">Nexe Consultoria ERP</p><h1>Consultoria ERP <span>per a la teua empresa.</span></h1><p className="home-lead">Analitzem com treballen els departaments i definim què ha de resoldre el sistema abans de triar una solució ERP.</p><div className="home-actions"><a className="action-link" href="#/serveis">Els nostres serveis ↗</a><a className="text-link" href="#/consultora">Conéixer Nexe ↗</a></div></div>
      <aside className="home-introduction"><p className="page-label">Processos i sistemes d’informació</p><h2>Entendre el treball abans de canviar l’eina</h2><p>Quan les dades estan repartides entre correus i fulls de càlcul, la coordinació depén de comprovacions manuals. Revisem eixe recorregut amb les persones que hi intervenen.</p><p>El resultat del treball és una proposta de procés i uns requisits concrets amb què comparar les solucions.</p></aside>
    </div></section>
    <section className="section-space home-offering"><div className="wrap"><div className="section-heading-row"><h2>En què podem ajudar-te</h2><p>Des de l’anàlisi del procés fins a la preparació del canvi de sistema.</p></div><div className="home-offering-grid">{serviceOfferings.map((item,index) => <article key={item.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.result}</p></article>)}</div><a className="text-link next-link" href="#/serveis">Consultar els serveis ↗</a></div></section>
    <section className="home-method section-space"><div className="wrap home-method-copy"><h2>Com treballem</h2><p>Documentem les activitats i les dades actuals, localitzem els problemes i proposem canvis justificats. Les necessitats de cada perfil es tradueixen en requisits que es puguen comprovar durant l’avaluació de l’ERP.</p><p>Els models del procés actual i del procés proposat permeten revisar les decisions amb l’empresa abans de plantejar la implantació.</p></div></section>
    <section className="section-space home-featured"><div className="wrap home-featured-grid"><div><p className="page-label">Projecte en curs · Indústria ceràmica</p><h2>Ceràmica Riu Sec</h2><p>Revisem l’aprovisionament de matèries primeres d’una empresa d’Onda: des de la necessitat de producció fins al registre del material acceptat.</p><a className="action-link next-link" href={projectBase}>Conéixer el projecte ↗</a></div><dl><div><dt>Equips implicats</dt><dd>Producció, compres, magatzem i qualitat.</dd></div><div><dt>Objectiu</dt><dd>Disposar de material a temps i d’un estoc fiable.</dd></div><div><dt>Estat</dt><dd>Anàlisi i proposta de millora. Encara no s’ha implantat.</dd></div></dl></div></section>
    <section className="home-question section-space"><div className="wrap"><div className="section-heading-row"><h2>Les persones darrere de Nexe</h2><p>Un equip amb formació en Enginyeria Informàtica i Matemàtica Computacional, amb una funció definida per a cada àrea del projecte.</p></div><ul className="home-team">{team.map((person) => <li key={person.name}><strong>{person.name}</strong><span>{person.role}</span></li>)}</ul><a className="text-link next-link" href="#/consultora">Veure l’equip ↗</a></div></section>
  </>
}

const serviceOfferings = [
  { title:'Anàlisi de processos', description:'Revisem les activitats, els responsables i el recorregut de la informació. Identifiquem les decisions i les dificultats de coordinació.', result:'Mapa del procés actual i diagnòstic.' },
  { title:'Definició de requisits', description:'Recollim què necessita cada equip i com es comprovarà que una solució cobreix aquestes necessitats.', result:'Històries d’usuari i dades necessàries.' },
  { title:'Avaluació de solucions ERP', description:'Preparem criteris per comparar els productes i els mòduls amb les necessitats del procés.', result:'Criteris de comparació i punts a verificar.' },
  { title:'Planificació de la implantació', description:'Definim les fases, els responsables i les comprovacions que caldrà preparar per al canvi de sistema.', result:'Proposta de fases i validacions.' },
]
function Services() {
  return <><PageIntro label="Serveis" title="Anàlisi de processos i consultoria ERP">Analitzem el treball de cada departament i preparem una proposta perquè l’empresa puga avaluar una solució adequada.</PageIntro>
    <section className="section-space"><div className="wrap service-catalogue">{serviceOfferings.map((item,index) => <article key={item.title}><span className="service-number">{String(index + 1).padStart(2,'0')}</span><h2>{item.title}</h2><p>{item.description}</p><p className="service-result"><strong>Resultat del treball</strong>{item.result}</p></article>)}</div></section>
    <section className="section-space project-brief"><div className="wrap split-section"><h2>Com es concreta</h2><div className="body-copy"><p>El treball amb Ceràmica Riu Sec mostra les activitats que revisem, els problemes detectats i la proposta que estem desenvolupant.</p><a className="text-link next-link" href={projectBase}>Veure el projecte de Ceràmica Riu Sec ↗</a></div></div></section>
  </>
}

function Cases() {
  return <><PageIntro label="Projectes de Nexe" title="Casos d’èxit">Cada empresa té el seu espai, amb el context del projecte, l’anàlisi del procés i la proposta de millora.</PageIntro>
    <section className="section-space cases-section"><div className="wrap case-list">{caseStudies.map((item) => <article className="client-case" key={item.slug}>
      <figure><img src={asset(item.image)} alt="Línia de fabricació de taulells ceràmics" width="1672" height="941" /><figcaption>Imatge il·lustrativa del sector</figcaption></figure>
      <div className="client-case-copy"><p className="page-label">{item.sector} · {item.location}</p><h2>{item.name}</h2><p className="case-status">{item.status}</p><p>{item.summary}</p><a className="action-link" href={'#/casos/' + item.slug}>Entrar al projecte ↗</a></div>
    </article>)}</div></section>
  </>
}

function Company() {
  const workforce = departments.reduce((total,item) => total + item.people,0)
  return <>
    <PageIntro label="Ceràmica Riu Sec" title="L’empresa">Fàbrica de taulells d’Onda amb una planta, un magatzem propi i {workforce} persones. Treballa per a distribuïdors i empreses de construcció.</PageIntro>
    <section id="context" className="section-space"><div className="wrap company-essential"><div><h2 className="plain-section-title">Activitat i estratègia</h2><p>Planifica la fabricació segons la demanda i busca disposar dels materials a temps, evitant aturades i excés d’estoc.</p><dl className="company-purpose"><div><dt>Missió</dt><dd>Fabricar taulells de qualitat i complir els terminis.</dd></div><div><dt>Visió</dt><dd>Créixer mantenint el control de la producció i les existències.</dd></div></dl></div><div id="situacio"><h2 className="plain-section-title">Situació actual</h2><p>Disposa d’un programa de comptabilitat, però encara no té un ERP que connecte les àrees. Producció comunica necessitats per correu, compres prepara peticions i comandes en fitxers separats, i magatzem registra les entrades en un altre full.</p></div></div></section>
    <section id="organitzacio" className="section-space"><div className="wrap"><h2 className="plain-section-title">Organització</h2><ul className="org-areas">{departments.map((item) => <li key={item.name}><h3>{item.name}</h3><p>{item.task}</p><span>{item.people} persones</span></li>)}</ul></div></section>
  </>
}

function ProcessStep({ step, index }) {
  return <li className="process-item" id={'activitat-' + (index + 1)}>
    <div className="process-step-title"><span className="step-number">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3></div><p className="process-step-action">{step.summary}</p>
    <details className="activity-details"><summary>Responsables, documents i incidència <span aria-hidden="true">+</span></summary><dl className="process-fields"><div><dt>Responsables</dt><dd>{step.owner}</dd></div><div><dt>Entrada</dt><dd>{step.input}</dd></div><div><dt>Resultat</dt><dd>{step.output}</dd></div><div><dt>Eines</dt><dd>{step.tools}</dd></div><div><dt>Deficiència</dt><dd>{step.problem}</dd></div><div><dt>Conseqüència</dt><dd>{step.consequence}</dd></div></dl></details>
  </li>
}

function Process() {
  return <><PageIntro label="Procés actual" title="Aprovisionament de matèries primeres">L’objectiu és disposar de les matèries primeres en la quantitat adequada i a temps, amb l’estoc actualitzat. Comença amb la necessitat de producció i acaba amb el registre del material acceptat al magatzem.</PageIntro><p id="abast" className="process-scope wrap">Fora de l’abast: el consum en fabricació i el pagament de factures.</p><SectionBrowser page="proces" sections={[
{ id: 'activitats', label: 'Les huit activitats', anchors: ['abast','preocupacions','activitat-1', 'activitat-2', 'activitat-3', 'activitat-4', 'activitat-5', 'activitat-6', 'activitat-7', 'activitat-8'], content: (<section className="section-space">
        <div className="wrap">
          <div className="section-heading-row process-heading">
            <h2 id="activitats">Les huit activitats actuals</h2>
            <p>El recorregut té huit passos. Obri el detall d’una activitat per consultar qui intervé, els documents i la incidència detectada.</p>
          </div>
          <div className="process-columns">
            {[0, 4].map((start) => (
              <ol className="process-list" start={start + 1} key={start}>
                {steps.slice(start, start + 4).map((step, offset) => {
                  const index = start + offset
                  return <ProcessStep key={step.title} step={step} index={index} />
                })}
              </ol>
            ))}
          </div>
        </div>
        <div id="preocupacions" className="wrap process-management"><h3>Prioritats de direcció</h3><p>Estoc fiable, menys compres urgents i compliment dels terminis de fabricació.</p></div>
      </section>) },
{ id: 'model-actual', label: 'Model AS-IS', anchors: [], content: (<section id="model-actual" className="section-space analysis-section"><div className="wrap"><Diagram file="as-is.bpmn" title="Model del procés actual · AS-IS" caption="Des de la necessitat de producció fins al registre manual de l’entrada." /></div></section>) }
]} /></>
}

function Consultancy() {
  return (
    <>
      <PageIntro label="Qui som" title="L’equip de Nexe">
        Som quatre estudiants d’Enginyeria Informàtica i Matemàtica Computacional. Estudiem com treballa l’empresa, identifiquem on es perd informació i definim què hauria de resoldre una solució ERP.
      </PageIntro>
      <section className="section-space team-section" aria-label="Funcions de l’equip">
        <div className="wrap">
          <ul className="team-list">{team.map((person) => <li key={person.name}><h2>{person.name}</h2><p className="team-role">{person.role}</p><p className="team-responsibility">{person.responsibility}</p><p className="team-studies">{person.studies}</p></li>)}</ul>
        </div>
      </section>
    </>
  )
}

function Contact() {
  return <><PageIntro label="Contacte" title="Parlem del teu projecte">Consultes i coordinació de projectes amb l’equip de Nexe.</PageIntro><section className="section-space"><div className="wrap contact-editorial"><div><p className="page-label">Relació amb clients</p><h2>Héctor Balaguer Romero</h2><p>Gerent i responsable de relació amb clients.</p><a className="text-link next-link" href="#/consultora">Conéixer l’equip ↗</a></div><div className="contact-status"><h2>Canal de contacte en preparació</h2><p>El canal d’enviament encara no està actiu. Publicarem ací les dades de contacte quan estiguen disponibles.</p></div></div></section></>
}

function Privacy() {
  return (
    <>
      <PageIntro label="Privacitat" title="Informació de privacitat">
        Com presentem la informació de l’equip i què passa quan visites aquesta web.
      </PageIntro>
      <section className="section-space info-section">
        <div className="wrap info-layout">
          <h2>Dades a la web</h2>
          <div className="info-copy">
            <p>La web publica els noms, els estudis i les funcions dels membres de Nexe per presentar l’equip del projecte.</p>
            <p>El canal de contacte encara està en preparació. La web no recull dades de formularis ni missatges. No hem incorporat eines pròpies d’analítica ni de publicitat.</p>
            <p>La web s’allotja a GitHub Pages. GitHub pot tractar dades tècniques de navegació d’acord amb la seua <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">declaració de privacitat</a>.</p>
          </div>
        </div>
      </section>
    </>
  )
}

function Cookies() {
  return (
    <>
      <PageIntro label="Cookies" title="Ús de cookies">
        Informació sobre les tecnologies que utilitza actualment aquesta web.
      </PageIntro>
      <section className="section-space info-section">
        <div className="wrap info-layout">
          <h2>Estat actual</h2>
          <div className="info-copy">
            <p>Nexe no ha afegit cookies pròpies, eines d’analítica ni anuncis a aquesta web. Les pàgines, les imatges i les tipografies es carreguen des del mateix lloc.</p>
            <p>El lloc està publicat amb GitHub Pages. Consulta la <a href="https://docs.github.com/en/site-policy/privacy-policies/github-cookies" target="_blank" rel="noreferrer">informació de GitHub sobre cookies</a> per conéixer les tecnologies que pot utilitzar el proveïdor.</p>
            <p>Si en el futur afegim serveis que requerisquen cookies opcionals, actualitzarem aquesta informació abans d’activar-los.</p>
          </div>
        </div>
      </section>
    </>
  )
}

function Footer() {
  return <footer className="site-footer"><div className="wrap footer-inner">
    <div className="footer-meta"><strong>Nexe Consultoria ERP</strong><p>© {new Date().getFullYear()} Nexe. Tots els drets reservats.</p></div>
    <nav aria-label="Enllaços del peu de pàgina" className="footer-links">{[...navigation.filter((item) => item.page !== 'contacte'), ...footerNavigation].map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
  </div></footer>
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const { page, section, view } = route
  const isProject = caseNavigation.some((item) => item.page === page)
  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  useEffect(() => {
    document.title = titles[page] + (isProject ? ' · Ceràmica Riu Sec' : '') + ' · Nexe Consultoria ERP'
    const frame = requestAnimationFrame(() => {
      const target = section && document.getElementById(section)
      if (target) { target.scrollIntoView({ block: 'start' }); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }) }
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [page, section, view, isProject])
  const content = <>
    {page === 'inici' && <Home />}
    {page === 'serveis' && <Services />}
    {page === 'casos' && <Cases />}
    {page === 'projecte' && <ProjectOverview />}
    {page === 'empresa' && <Company />}
    {page === 'proces' && <Process />}
    {page === 'analisi' && <AnalysisPage />}
    {page === 'millora' && <ImprovementPage />}
    {page === 'requisits' && <RequirementsPage />}
    {page === 'documents' && <Documents />}
    {page === 'consultora' && <Consultancy />}
    {page === 'contacte' && <Contact />}
    {page === 'privacitat' && <Privacy />}
    {page === 'cookies' && <Cookies />}
    {page === 'notfound' && <><PageIntro label="Navegació" title="Pàgina no trobada">Pots tornar a l’inici o consultar l’índex del projecte.</PageIntro><div className="wrap section-space"><a className="action-link" href="#/">Tornar a l’inici</a><a className="text-link" href={projectBase}>Resum de Ceràmica Riu Sec</a></div></>}
  </>
  return <><Header page={page} /><main id="main-content" tabIndex="-1">
    {isProject ? <div className="project-shell wrap"><ProjectMenu page={page} /><div className="project-body"><nav className="project-breadcrumb" aria-label="Ruta de navegació"><a href="#/casos">Casos d’èxit</a><span aria-hidden="true">/</span>{page === 'projecte' ? <span>Ceràmica Riu Sec</span> : <><a href={projectBase}>Ceràmica Riu Sec</a><span aria-hidden="true">/</span><span aria-current="page">{caseNavigation.find((item) => item.page === page)?.label}</span></>}</nav>{content}<ProjectPager page={page} /></div></div> : content}
  </main><Footer page={page} /></>
}
