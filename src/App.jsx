import { useEffect, useState } from 'react'
import { caseStudies, departments, steps, team } from './content.js'
import { AnalysisPage, Diagram, ImprovementPage, RequirementsPage } from './Practice4.jsx'

import { mainNavigation as navigation, projectNavigation as caseNavigation, legalNavigation as footerNavigation, readRoute, pageHref, projectBase } from './navigation.js'
import { Documents, PageContents, ProjectMenu, ProjectOverview, ProjectPager } from './ProjectUI.jsx'

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

const records = [
  { title: 'Producció', detail: 'Necessitats comunicades per correu o verbalment.' },
  { title: 'Compres', detail: 'Peticions i comandes en correus i fulls de càlcul.' },
  { title: 'Magatzem', detail: 'Entrades de material registrades en un altre fitxer.' },
]

const concerns = [
  { title: 'Estoc poc fiable', detail: 'Els fitxers separats dificulten saber quina quantitat de material hi ha disponible.' },
  { title: 'Compres urgents', detail: 'Les peticions tardanes poden forçar comandes no planificades i elevar costos.' },
  { title: 'Retards de fabricació', detail: 'Si el material no arriba a temps, es poden incomplir els terminis de lliurament.' },
]

const services = [
  'Analitzar el procés actual i les dades que utilitza cada departament.',
  'Definir les necessitats que ha de cobrir el sistema.',
  'Comparar solucions ERP i proposar millores del procés.',
  'Planificar una implantació ajustada al treball de cada empresa.',
]

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
      <div><p className="page-label">Nexe Consultoria ERP</p><h1>Consultoria ERP per a la teua empresa.</h1><p className="home-lead">Ajudem les empreses a definir com ha de treballar el seu ERP a partir dels processos i les necessitats de cada equip.</p><div className="home-actions"><a className="action-link" href="#/serveis">Els nostres serveis ↗</a><a className="text-link" href="#/consultora">Conéixer l’equip ↗</a></div></div>
      <aside className="home-project-preview"><figure><img src={asset('ceramica-illustrativa.png')} alt="Línia de producció de taulells ceràmics" width="1672" height="941" /><figcaption>Imatge il·lustrativa</figcaption></figure><p className="page-label">Projecte en curs</p><h2>Ceràmica Riu Sec</h2><p>Aprovisionament de matèries primeres en una empresa ceràmica d’Onda.</p><a className="action-link" href={projectBase}>Explorar el projecte ↗</a><nav aria-label="Accés directe al projecte">{caseNavigation.filter((item) => ['proces','millora','documents'].includes(item.page)).map((item) => <a key={item.page} href={item.href}>{item.label}<span aria-hidden="true">↗</span></a>)}</nav></aside>
    </div></section>
    <section className="section-space"><div className="wrap"><div className="section-heading-row"><h2>Com treballem</h2><p>Primer entenem el funcionament de l’empresa. Després definim els canvis del procés i els requisits amb què avaluarem l’ERP.</p></div><ol className="service-list home-services">{services.map((service, index) => <li key={service}><span>{String(index + 1).padStart(2, '0')}</span><p>{service}</p></li>)}</ol></div></section>
    <section className="home-question section-space"><div className="wrap home-question-grid"><h2>L’equip de Nexe</h2><div><p>Quatre membres amb funcions de coordinació, anàlisi de processos, solucions ERP i dades. La nostra formació combina Enginyeria Informàtica i Matemàtica Computacional.</p><a className="text-link" href="#/consultora">Veure qui fa cada funció ↗</a></div></div></section>
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
      <nav className="case-quick-links" aria-label={'Continguts de ' + item.name}>{caseNavigation.map((section) => <a key={section.page} href={section.href}>{section.label}<span aria-hidden="true">↗</span></a>)}</nav>
    </article>)}</div></section>
  </>
}

function Company() {
  const workforce = departments.reduce((total, department) => total + department.people, 0)
  const [management, ...areas] = departments

  return (
    <>
      <PageIntro label="Ceràmica Riu Sec" title="L’empresa">
        Una fàbrica de taulells d’Onda amb una planta de producció, un magatzem propi i unes {workforce} persones. Fabrica per a distribuïdors i empreses de construcció.
      </PageIntro>
      <PageContents page="empresa" items={[["context","Context i estratègia"],["organitzacio","Organització"],["situacio","Situació actual"]]} />
      <section id="context" className="section-space company-overview">
        <div className="wrap split-section">
          <h2>El context</h2>
          <div className="body-copy">
            <p>Ceràmica Riu Sec va començar a Onda com una fàbrica de taulells amb un equip més menut. A mesura que van augmentar les comandes de distribuïdors i empreses de construcció, va ampliar la producció i el magatzem fins a arribar a les {workforce} persones actuals.</p>
            <p>Hui treballa amb una planta de producció i un magatzem propi. Els registres d’estoc, les peticions de materials i les compres continuen repartits entre fulls de càlcul i correus, cosa que complica la coordinació quan canvia el pla de fabricació.</p>
            <p>La seua estratègia és fabricar segons la demanda prevista, disposar dels materials a temps i evitar tant les aturades com l’excés d’estoc.</p>
          </div>
        </div>
        <div className="wrap goals-grid">
          <div><h3>Missió</h3><p>Fabricar taulells de qualitat i entregar les comandes dins del termini acordat.</p></div>
          <div><h3>Visió</h3><p>Créixer sense perdre el control de la producció, les existències ni els lliuraments.</p></div>
        </div>
      </section>
      <section className="section-space">
        <div className="wrap">
          <div className="section-heading-row">
            <h2 id="organitzacio">Com s’organitza</h2>
            <p>Unes {workforce} persones repartides en set àrees. Producció, magatzem, compres i qualitat intervenen directament en l’aprovisionament.</p>
          </div>
          <div className="org-chart" aria-label="Estructura de Ceràmica Riu Sec">
            <div className="org-management">
              <h3>{management.name}</h3>
              <p>{management.task}</p>
              <span>{management.people} persones</span>
            </div>
            <p className="org-level-label">Departaments</p>
            <ul className="org-areas">
              {areas.map((department) => (
                <li key={department.name}>
                  <h3>{department.name}</h3>
                  <p>{department.task}</p>
                  <span>{department.people} persones</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section id="situacio" className="section-space current-state">
        <div className="wrap">
          <div className="section-heading-row">
            <h2>Informació repartida</h2>
            <p>L’empresa utilitza un programa de comptabilitat, però encara no té un ERP que connecte aquestes àrees.</p>
          </div>
          <div className="record-grid">
            {records.map((record) => (
              <div key={record.title}><h3>{record.title}</h3><p>{record.detail}</p></div>
            ))}
          </div>
          <p className="record-conclusion">La diferència entre l’estoc físic i el registrat es pot descobrir quan producció ja necessita el material.</p>
        </div>
      </section>
    </>
  )
}

function ProcessStep({ step, index }) {
  return <li className="process-item" id={'activitat-' + (index + 1)}>
    <div className="process-step-title"><span className="step-number">{String(index + 1).padStart(2, '0')}</span><h3>{step.title}</h3></div><p className="process-step-action">{step.summary}</p>
    <dl className="process-fields"><div><dt>Responsables</dt><dd>{step.owner}</dd></div><div><dt>Entrada</dt><dd>{step.input}</dd></div><div><dt>Resultat</dt><dd>{step.output}</dd></div><div><dt>Eines</dt><dd>{step.tools}</dd></div><div><dt>Deficiència</dt><dd>{step.problem}</dd></div><div><dt>Conseqüència</dt><dd>{step.consequence}</dd></div></dl>
  </li>
}

function Process() {
  return (
    <>
      <PageIntro label="Procés" title="Aprovisionament de matèries primeres">
        L’objectiu del procés és garantir que producció dispose de les matèries primeres necessàries, en la quantitat adequada i a temps, amb l’estoc actualitzat. Comença quan producció identifica una necessitat i acaba quan el material acceptat queda registrat al magatzem.
      </PageIntro>
      <PageContents page="proces" items={[["abast","Objectiu i abast"],["activitats","Les huit activitats"],["model-actual","Model AS-IS"],["preocupacions","Necessitats de direcció"]]} />
      <section id="abast" className="scope-section">
        <div className="wrap scope-grid">
          <div><span>Inici</span><p>Producció comunica els materials que necessita.</p></div>
          <div><span>Final</span><p>El material acceptat queda disponible al magatzem.</p></div>
          <p className="scope-note">El consum durant la fabricació i el pagament de la factura queden fora de l’abast inicial.</p>
        </div>
      </section>
      <section className="section-space">
        <div className="wrap">
          <div className="section-heading-row process-heading">
            <h2 id="activitats">Les huit activitats actuals</h2>
            <p>Cada activitat mostra els responsables, les entrades i eixides, les eines i la deficiència detectada.</p>
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
      </section>
      <section id="model-actual" className="section-space analysis-section"><div className="wrap"><Diagram file="as-is.bpmn" title="Model del procés actual · AS-IS" caption="Des de la necessitat de producció fins al registre manual de l’entrada." /></div></section>
      <section id="preocupacions" className="concerns section-space">
        <div className="wrap">
          <div className="section-heading-row"><h2>Què preocupa la direcció</h2><p>Els errors de coordinació es traslladen a les compres i als terminis de fabricació.</p></div>
          <div className="concern-grid">
            {concerns.map((concern) => (
              <div key={concern.title}><h3>{concern.title}</h3><p>{concern.detail}</p></div>
            ))}
          </div>
          <p className="concern-end">La proposta estudiarà com compartir dades d’estoc, necessitats de producció i estat de les compres mitjançant un ERP.</p>
        </div>
      </section>
    </>
  )
}

function Consultancy() {
  return (
    <>
      <PageIntro label="Qui som" title="L’equip de Nexe">
        Som quatre estudiants d’Enginyeria Informàtica i Matemàtica Computacional. Estudiem com treballa l’empresa, identifiquem on es perd informació i definim què hauria de resoldre una solució ERP.
      </PageIntro>
      <section className="section-space">
        <div className="wrap">
          <div className="section-heading-row">
            <h2>Funcions de l’equip</h2>
            <p>Formem l’equip de Nexe. Estes són les funcions de cada membre dins de la consultora.</p>
          </div>
          <ul className="team-list">{team.map((person) => <li key={person.name}><p className="team-role">{person.role}</p><h3>{person.name}</h3><p className="team-responsibility">{person.responsibility}</p><p className="team-studies">{person.studies}</p></li>)}</ul>
        </div>
      </section>
    </>
  )
}

function Contact() {
  return <><PageIntro label="Contacte" title="Parlem del teu projecte">La coordinació de consultes i la relació amb clients formen part de les funcions de l’equip de Nexe.</PageIntro><section className="section-space"><div className="wrap contact-editorial"><div><p className="page-label">Relació amb clients</p><h2>Héctor Balaguer Romero</h2><p>Gerent i responsable de relació amb clients.</p><a className="text-link next-link" href="#/consultora">Conéixer l’equip ↗</a></div><div className="contact-status"><h2>Canal de contacte en preparació</h2><p>Encara no disposem d’un formulari o d’una adreça de contacte publicada. Quan activem aquest canal, indicarem ací com enviar una consulta a Nexe.</p></div></div></section></>
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

function Footer({ page }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-directory"><div><h2>Nexe</h2>{navigation.filter((item) => item.page !== 'contacte').map((item) => <a key={item.page} href={item.href}>{item.label}</a>)}</div><div><h2>Ceràmica Riu Sec</h2>{caseNavigation.map((item) => <a key={item.page} href={item.href}>{item.label}</a>)}</div></div>
      <div className="wrap footer-inner">
        <div className="footer-meta">
          <strong>Nexe Consultoria ERP</strong>
          <p>© {new Date().getFullYear()} Nexe. Tots els drets reservats.</p>
        </div>
        <nav aria-label="Enllaços del peu de pàgina" className="footer-links">
          {footerNavigation.map((item) => <a key={item.href} href={item.href} aria-current={page === item.href.slice(2) ? 'page' : undefined} onClick={() => { if (page === item.href.slice(2)) window.scrollTo(0, 0) }}>{item.label}</a>)}
        </nav>
      </div>
    </footer>
  )
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const { page, section } = route
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
  }, [page, section, isProject])
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
