import { useEffect, useState } from 'react'
import { caseStudies, departments, steps, team } from './content.js'
import { CurrentProcessDiagram, ImprovementPage, RequirementsPage } from './Practice4.jsx'

import { mainNavigation as navigation, projectNavigation as caseNavigation, legalNavigation as footerNavigation, readRoute, projectBase } from './navigation.js'
import { Documents, ProjectMenu, ProjectOverview, ProjectPager } from './ProjectUI.jsx'

const asset = (file) => import.meta.env.BASE_URL + 'images/' + file

const titles = {
  inici: 'Inici',
  casos: 'Casos d’èxit',
  serveis: 'Serveis',
  projecte: 'El projecte',
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
    <section className="home-hero" aria-labelledby="home-title">
      <img className="home-hero-image" src={asset('consultoria-hero.jpg')} alt="" width="2400" height="1600" fetchPriority="high" />
      <div className="wrap home-hero-content"><p className="page-label">Nexe Consultoria ERP</p><h1 id="home-title">Consultoria ERP <span>per a la teua empresa.</span></h1><p className="home-lead">Analitzem els processos i definim què necessita el teu negoci abans de triar una solució ERP.</p><div className="home-actions"><a className="action-link" href="#/serveis">Els nostres serveis ↗</a><a className="text-link" href="#/consultora">Conéixer Nexe ↗</a></div></div>
    </section>
    <section className="section-space home-offering"><div className="wrap"><div className="section-heading-row"><h2>En què podem ajudar-te</h2><p>Des de l’anàlisi del procés fins a la preparació del canvi de sistema.</p></div><div className="home-offering-grid">{serviceOfferings.map((item,index) => <article key={item.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{item.title}</h3><p>{item.result}</p></article>)}</div><a className="text-link next-link" href="#/serveis">Consultar els serveis ↗</a></div></section>
    <section className="section-space home-featured"><div className="wrap home-featured-grid"><div><p className="page-label">Projecte en curs · Indústria ceràmica</p><h2>Ceràmica Riu Sec</h2><p>Revisem l’aprovisionament de matèries primeres d’una empresa d’Onda: des de la necessitat de producció fins al registre del material acceptat.</p><a className="action-link next-link" href={projectBase}>Conéixer el projecte ↗</a></div><dl><div><dt>Equips implicats</dt><dd>Producció, compres, magatzem i qualitat.</dd></div><div><dt>Objectiu</dt><dd>Disposar de material a temps i d’un estoc fiable.</dd></div><div><dt>Estat</dt><dd>Anàlisi i proposta de millora. Encara no s’ha implantat.</dd></div></dl></div></section>
    <section className="home-contact section-space"><div className="wrap"><div><h2>Comencem pel teu procés</h2><p>Expliquem com treballem i qui formarà part del projecte.</p></div><a className="action-link" href="#/consultora">Conéixer l’equip ↗</a></div></section>
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
      <figure><img src={asset(item.image)} alt="Línia de fabricació de taulells ceràmics" width="1672" height="941" /></figure>
      <div className="client-case-copy"><p className="page-label">{item.sector} · {item.location}</p><h2>{item.name}</h2><p className="case-status">{item.status}</p><p>{item.summary}</p><a className="action-link" href={'#/casos/' + item.slug}>Entrar al projecte ↗</a></div>
    </article>)}</div></section>
  </>
}

function Company() {
  const workforce = departments.reduce((total,item) => total + item.people,0)
  return <section id="empresa" className="section-space wrap company-section">
    <div className="section-heading-row"><h2>L’empresa</h2><p>Fàbrica de taulells d’Onda amb una planta, un magatzem propi i {workforce} persones. Treballa per a distribuïdors i empreses de construcció.</p></div>
    <div className="company-essential"><div><h3>Activitat i estratègia</h3><p>Planifica la fabricació segons la demanda i busca disposar dels materials a temps, evitant aturades i excés d’estoc.</p><dl className="company-purpose"><div><dt>Missió</dt><dd>Fabricar taulells de qualitat i complir els terminis.</dd></div><div><dt>Visió</dt><dd>Créixer mantenint el control de la producció i les existències.</dd></div></dl></div><div id="situacio"><h3>Situació actual</h3><p>Disposa d’un programa de comptabilitat. Producció comunica necessitats per correu, compres prepara peticions i comandes en fitxers separats, i magatzem registra les entrades en un altre full.</p><p>Direcció necessita un estoc fiable, menys compres urgents i complir els terminis de fabricació.</p></div></div>
    <details id="organitzacio" className="content-disclosure"><summary>Organització i funcions dels departaments <span aria-hidden="true">+</span></summary><ul className="org-areas">{departments.map((item) => <li key={item.name}><h3>{item.name}</h3><p>{item.task}</p><span>{item.people} persones</span></li>)}</ul></details>
  </section>
}

function ProcessStep({ step, index }) {
  return <li className="process-item" id={'activitat-' + (index + 1)}>
    <div className="process-step-title"><span className="step-number">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3></div><p className="process-step-action">{step.summary}</p>
    <details className="activity-details"><summary>Responsables, documents i incidència <span aria-hidden="true">+</span></summary><dl className="process-fields"><div><dt>Responsables</dt><dd>{step.owner}</dd></div><div><dt>Entrada</dt><dd>{step.input}</dd></div><div><dt>Resultat</dt><dd>{step.output}</dd></div><div><dt>Eines</dt><dd>{step.tools}</dd></div><div><dt>Deficiència</dt><dd>{step.problem}</dd></div><div><dt>Conseqüència</dt><dd>{step.consequence}</dd></div></dl></details>
  </li>
}

function Process() {
  return <>
    <PageIntro label="Aprovisionament de matèries primeres" title="El procés actual">De la necessitat de producció al registre del material acceptat. El treball es coordina amb correus, telefonades i fulls de càlcul separats.</PageIntro>
    <section id="model-actual" className="section-space wrap"><CurrentProcessDiagram /></section>
    <section id="activitats" className="section-space wrap"><div className="section-heading-row"><h2>Les huit activitats</h2><p>Responsables, informació i problemes del recorregut actual.</p></div><div className="process-columns">{[0,4].map((start) => <ol className="process-list" start={start+1} key={start}>{steps.slice(start,start+4).map((step,offset) => <ProcessStep key={step.title} step={step} index={start+offset} />)}</ol>)}</div></section>
    <p id="abast" className="process-scope wrap">Objectiu: disposar de matèries primeres en la quantitat adequada i a temps, amb l’estoc actualitzat. El consum en fabricació i el pagament queden fora de l’abast.</p>
  </>
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
  return <>
    <PageIntro label="Contacte" title="Parlem del teu projecte">Consultes i coordinació de projectes amb l’equip de Nexe.</PageIntro>
    <section className="section-space"><div className="wrap contact-editorial">
      <div><p className="page-label">Relació amb clients</p><h2>Héctor Balaguer Romero</h2><p>Gerent i responsable de relació amb clients.</p><a className="text-link next-link" href="#/consultora">Conéixer l’equip ↗</a></div>
      <form className="contact-form" onSubmit={(event) => event.preventDefault()} aria-labelledby="contact-form-title">
        <h2 id="contact-form-title">Escriu-nos</h2>
        <div className="contact-form-fields">
          <label htmlFor="contact-name">Nom<input id="contact-name" type="text" autoComplete="name" /></label>
          <label htmlFor="contact-email">Correu electrònic<input id="contact-email" type="email" autoComplete="email" /></label>
          <label className="contact-form-full" htmlFor="contact-company">Empresa <span>(opcional)</span><input id="contact-company" type="text" autoComplete="organization" /></label>
          <label className="contact-form-full" htmlFor="contact-message">Missatge<textarea id="contact-message" rows="4" /></label>
        </div>
        <button className="action-link" type="submit">Enviar missatge ↗</button>
      </form>
    </div></section>
  </>
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
            <p>Les dades escrites en el formulari de contacte no s’envien ni s’emmagatzemen. No hem incorporat eines pròpies d’analítica ni de publicitat.</p>
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
      if (target) {
        let details = target.closest('details')
        while (details) { details.open = true; details = details.parentElement?.closest('details') }
      }
      if (target) { target.scrollIntoView({ block: 'start' }); target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }) }
      else window.scrollTo(0, 0)
    })
    return () => cancelAnimationFrame(frame)
  }, [page, section, view, isProject])
  const content = <>
    {page === 'inici' && <Home />}
    {page === 'serveis' && <Services />}
    {page === 'casos' && <Cases />}
    {page === 'projecte' && <><ProjectOverview /><Company /></>}
    {page === 'proces' && <Process />}
    {page === 'millora' && <ImprovementPage />}
    {page === 'requisits' && <RequirementsPage />}
    {page === 'documents' && <Documents />}
    {page === 'consultora' && <Consultancy />}
    {page === 'contacte' && <Contact />}
    {page === 'privacitat' && <Privacy />}
    {page === 'cookies' && <Cookies />}
    {page === 'notfound' && <><PageIntro label="Navegació" title="Pàgina no trobada">Pots tornar a l’inici o consultar els projectes de Nexe.</PageIntro><div className="wrap section-space"><a className="action-link" href="#/">Tornar a l’inici</a><a className="text-link" href={projectBase}>Projecte de Ceràmica Riu Sec</a></div></>}
  </>
  return <><Header page={page} /><main id="main-content" tabIndex="-1">
    {isProject ? <><ProjectMenu page={page} /><div className="project-body">{content}<ProjectPager page={page} /></div></> : content}
  </main><Footer page={page} /></>
}
