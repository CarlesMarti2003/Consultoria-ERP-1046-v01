import { useEffect, useState } from 'react'
import { caseStudies, departments, steps, team } from './content.js'
import { AnalysisPage, ImprovementPage, RequirementsPage } from './Practice4.jsx'

const asset = (file) => import.meta.env.BASE_URL + 'images/' + file

const navigation = [
  { label: 'Inici', href: '#/', page: 'inici' },
  { label: 'Casos d’èxit', href: '#/casos', page: 'casos' },
  { label: 'Qui som', href: '#/consultora', page: 'consultora' },
  { label: 'Contacte', href: '#/contacte', page: 'contacte' },
]

const caseNavigation = [
  { label: 'Empresa', href: '#/casos/ceramica-riu-sec', page: 'empresa' },
  { label: 'Procés actual', href: '#/casos/ceramica-riu-sec/proces', page: 'proces' },
  { label: 'Anàlisi', href: '#/casos/ceramica-riu-sec/analisi', page: 'analisi' },
  { label: 'Millora', href: '#/casos/ceramica-riu-sec/millora', page: 'millora' },
  { label: 'Requisits ERP', href: '#/casos/ceramica-riu-sec/requisits', page: 'requisits' },
]

const footerNavigation = [
  { label: 'Privacitat', href: '#/privacitat' },
  { label: 'Cookies', href: '#/cookies' },
]

const titles = {
  inici: 'Inici',
  casos: 'Casos d’èxit',
  empresa: 'Empresa',
  proces: 'Procés',
  analisi: 'Anàlisi',
  millora: 'Millora',
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

function pageFromHash() {
  const path = window.location.hash.replace(/\/$/, '') || '#'
  const routes = [...navigation, ...caseNavigation]
  const match = routes.find((item) => item.href.replace(/\/$/, '') === path)
  if (match) return match.page
  const legacy = { '#/empresa': 'empresa', '#/proces': 'proces', '#/analisi': 'analisi', '#/millora': 'millora', '#/requisits': 'requisits', '#/privacitat': 'privacitat', '#/cookies': 'cookies' }
  return titles[legacy[path]] ? legacy[path] : 'inici'
}

function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950) setMenuOpen(false)
    }
    const handleEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Saltar al contingut</a>
      <div className="wrap header-inner">
        <a className="brand" href="#/" aria-label="Nexe Consultoria ERP, tornar a l’inici" onClick={() => { setMenuOpen(false); if (page === 'inici') window.scrollTo(0, 0) }}>
          <img src={asset('nexe-logo.svg')} alt="Nexe Consultoria ERP" width="1200" height="420" />
        </a>
        <nav className="desktop-nav" aria-label="Navegació principal">
          {navigation.map((item) => (
            <a key={item.page} href={item.href} aria-current={(page === item.page || (item.page === 'casos' && caseNavigation.some((section) => section.page === page))) ? 'page' : undefined} onClick={() => { if (page === item.page) window.scrollTo(0, 0) }}>{item.label}</a>
          ))}
        </nav>
        <button
          type="button"
          className="menu-button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? 'Tancar' : 'Menú'}</span>
          <span className="menu-symbol" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Navegació mòbil" hidden={!menuOpen}>
        {navigation.map((item) => (
          <a key={item.page} href={item.href} aria-current={(page === item.page || (item.page === 'casos' && caseNavigation.some((section) => section.page === page))) ? 'page' : undefined} onClick={() => { setMenuOpen(false); if (page === item.page) window.scrollTo(0, 0) }}>{item.label}</a>
        ))}
      </nav>
    </header>
  )
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
    <section className="home-opening">
      <div className="wrap home-opening-grid">
        <div><p className="page-label">Processos de negoci i sistemes d’informació</p><h1>Nexe Consultoria ERP</h1></div>
        <div className="home-opening-side"><p>Ajudem les empreses a revisar com treballen i a definir què necessiten d’un ERP. Partim dels processos, de les dades i de les persones que els utilitzen cada dia.</p><a className="action-link" href="#/casos">Conéixer els nostres projectes <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
    <section className="section-space">
      <div className="wrap split-section">
        <div><h2>Com et podem ajudar</h2><p className="section-side-note">Des de l’anàlisi del procés fins a la planificació de la implantació.</p></div>
        <ol className="service-list">{services.map((service, index) => <li key={service}><span>{String(index + 1).padStart(2, '0')}</span><p>{service}</p></li>)}</ol>
      </div>
    </section>
    <section className="home-question section-space"><div className="wrap home-question-grid">
      <h2>Un equip amb funcions definides</h2><div><p>Nexe reuneix coneixements d’Enginyeria Informàtica i Matemàtica Computacional. Ens repartim la coordinació, l’anàlisi de processos, l’avaluació de solucions ERP i el treball amb dades.</p><a className="text-link" href="#/consultora">Conéixer l’equip <span aria-hidden="true">↗</span></a></div>
    </div></section>
    <section className="section-space"><div className="wrap split-section"><h2>El nostre treball</h2><div className="body-copy"><p>Actualment treballem amb Ceràmica Riu Sec en la revisió de l’aprovisionament de matèries primeres. Documentem la situació inicial i preparem una proposta de millora amb suport ERP.</p><a className="text-link next-link" href="#/casos">Veure els casos d’èxit <span aria-hidden="true">↗</span></a></div></div></section>
  </>
}

function Cases() {
  return <>
    <PageIntro label="El nostre treball" title="Casos d’èxit">Coneix les empreses amb què treballem, els processos que revisem i l’estat de cada projecte.</PageIntro>
    <section className="section-space cases-section"><div className="wrap case-list">
      {caseStudies.map((item) => <article className="client-case" key={item.slug}>
        <figure><img src={asset(item.image)} alt="Línia de fabricació de taulells ceràmics" width="1672" height="941" /><figcaption>Imatge il·lustrativa del sector</figcaption></figure>
        <div className="client-case-copy"><p className="page-label">{item.sector} · {item.location}</p><h2>{item.name}</h2><p className="case-status">{item.status}</p><p>{item.summary}</p><a className="text-link" href={'#/casos/' + item.slug}>Veure el projecte <span aria-hidden="true">↗</span></a></div>
      </article>)}
    </div></section>
  </>
}

function CaseNavigation({ page }) {
  return <div className="case-context"><div className="wrap">
    <p className="case-breadcrumb"><a href="#/casos">Casos d’èxit</a><span aria-hidden="true">/</span><strong>Ceràmica Riu Sec</strong></p>
    <nav className="case-navigation" aria-label="Apartats del projecte Ceràmica Riu Sec">{caseNavigation.map((item) => <a key={item.page} href={item.href} aria-current={page === item.page ? 'page' : undefined}>{item.label}</a>)}</nav>
  </div></div>
}

function Company() {
  const workforce = departments.reduce((total, department) => total + department.people, 0)
  const [management, ...areas] = departments

  return (
    <>
      <PageIntro label="Empresa" title="Ceràmica Riu Sec">
        Una fàbrica de taulells d’Onda amb una planta de producció, un magatzem propi i unes {workforce} persones. Fabrica per a distribuïdors i empreses de construcció.
      </PageIntro>
      <section className="case-overview section-space"><div className="wrap split-section">
        <h2>L’encàrrec de Nexe</h2><div className="body-copy"><p>Revisem l’aprovisionament de matèries primeres per identificar on es perd informació entre producció, compres, magatzem i qualitat. L’objectiu és definir un procés i uns requisits ERP que permeten treballar amb dades compartides.</p><p>El projecte està en fase d’anàlisi i proposta. La selecció i la implantació de l’ERP es treballaran després.</p><a className="text-link next-link" href="#/casos/ceramica-riu-sec/proces">Conéixer el procés actual <span aria-hidden="true">↗</span></a></div>
      </div></section>
      <section className="section-space company-overview">
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
            <h2>Com s’organitza</h2>
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
          <a className="text-link next-link" href="#/casos/ceramica-riu-sec/analisi">Llegir l’anàlisi del procés <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="section-space current-state">
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

function ProcessStep({ step, index, open, onToggle }) {
  const id = 'step-' + (index + 1)
  return (
    <li className="process-item">
      <h3>
        <button className="process-toggle" type="button" aria-expanded={open} aria-controls={id} onClick={onToggle}>
          <span className="step-number">{String(index + 1).padStart(2, '0')}</span>
          <span className="step-heading"><strong>{step.title}</strong><small>{step.summary}</small></span>
          <span className="step-symbol" aria-hidden="true">{open ? '−' : '+'}</span>
        </button>
      </h3>
      <div id={id} className="step-detail" hidden={!open}>
        <div><h4>Qui hi intervé i amb què</h4><p><strong>Responsable:</strong> {step.owner}</p><p><strong>Eines:</strong> {step.tools}</p></div>
        <div><h4>Entrada i resultat</h4><p><strong>Entrada:</strong> {step.input}</p><p><strong>Resultat:</strong> {step.output}</p></div>
        <div><h4>Deficiència i conseqüència</h4><p>{step.problem}</p><p><strong>Conseqüència:</strong> {step.consequence}</p></div>
      </div>
    </li>
  )
}

function Process() {
  const [openStep, setOpenStep] = useState(0)
  return (
    <>
      <PageIntro label="Procés" title="Aprovisionament de matèries primeres">
        L’objectiu del procés és garantir que producció dispose de les matèries primeres necessàries, en la quantitat adequada i a temps, amb l’estoc actualitzat. Comença quan producció identifica una necessitat i acaba quan el material acceptat queda registrat al magatzem.
      </PageIntro>
      <section className="scope-section">
        <div className="wrap scope-grid">
          <div><span>Inici</span><p>Producció comunica els materials que necessita.</p></div>
          <div><span>Final</span><p>El material acceptat queda disponible al magatzem.</p></div>
          <p className="scope-note">El consum durant la fabricació i el pagament de la factura queden fora de l’abast inicial.</p>
        </div>
      </section>
      <section className="section-space">
        <div className="wrap">
          <div className="section-heading-row process-heading">
            <h2>Les activitats actuals</h2>
            <p>Obri cada pas per veure qui hi intervé, quina informació utilitza i on apareix el problema.</p>
          </div>
          <div className="process-columns">
            {[0, 4].map((start) => (
              <ol className="process-list" start={start + 1} key={start}>
                {steps.slice(start, start + 4).map((step, offset) => {
                  const index = start + offset
                  return <ProcessStep key={step.title} step={step} index={index} open={openStep === index} onToggle={() => setOpenStep((current) => current === index ? null : index)} />
                })}
              </ol>
            ))}
          </div>
          <a className="text-link next-link" href="#/casos/ceramica-riu-sec/analisi">Llegir l’anàlisi de cada pas <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <section className="concerns section-space">
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
        <div className="wrap split-section">
          <div><h2>Què fem</h2><p className="section-side-note">Del procés actual a una proposta d’implantació.</p></div>
          <ol className="service-list">
            {services.map((service, index) => (
              <li key={service}><span>{String(index + 1).padStart(2, '0')}</span><p>{service}</p></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section-space">
        <div className="wrap">
          <div className="section-heading-row">
            <h2>Qui som</h2>
            <p>Formem l’equip de Nexe. Estes són les funcions de cada membre dins de la consultora.</p>
          </div>
          <ul className="team-list">
            {team.map((person) => (
              <li key={person.name}>
                <h3>{person.name}</h3>
                <dl>
                  <div><dt>Formació</dt><dd>{person.studies}</dd></div>
                  <div><dt>Funció</dt><dd>{person.role}</dd></div>
                  <div><dt>Responsabilitat</dt><dd>{person.responsibility}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

function Contact() {
  return (
    <>
      <PageIntro label="Contacte" title="Parlem del projecte">
        Pots preparar el teu missatge ací. El formulari encara no està connectat a cap servei d’enviament.
      </PageIntro>
      <section className="section-space info-section">
        <div className="wrap info-layout">
          <div><h2>Escriu-nos</h2><p>Quan activem el contacte, aquest espai permetrà enviar consultes a l’equip de Nexe.</p></div>
          <form className="contact-form" aria-describedby="contact-status">
            <label htmlFor="contact-name">Nom</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" disabled />
            <label htmlFor="contact-email">Correu electrònic</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" disabled />
            <label htmlFor="contact-message">Missatge</label>
            <textarea id="contact-message" name="message" rows="6" disabled />
            <button type="button" disabled>Enviar missatge</button>
            <p id="contact-status">Formulari en preparació. No es poden enviar missatges des d’aquesta pàgina.</p>
          </form>
        </div>
      </section>
    </>
  )
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
            <p>El formulari de contacte està desactivat. Ara mateix no pots enviar-hi dades ni missatges a través de la pàgina. No hem incorporat eines pròpies d’analítica ni de publicitat.</p>
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
  const [page, setPage] = useState(pageFromHash)

  useEffect(() => {
    const handleHashChange = () => setPage(pageFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    document.title = titles[page] + (caseNavigation.some((item) => item.page === page) ? ' · Ceràmica Riu Sec' : '') + ' · Nexe Consultoria ERP'
    window.scrollTo(0, 0)
  }, [page])

  return (
    <>
      <Header page={page} />
      <main id="main-content" tabIndex="-1">
        {caseNavigation.some((item) => item.page === page) && <CaseNavigation page={page} />}
        {page === 'inici' && <Home />}
        {page === 'casos' && <Cases />}
        {page === 'empresa' && <Company />}
        {page === 'proces' && <Process />}
        {page === 'analisi' && <AnalysisPage />}
        {page === 'millora' && <ImprovementPage />}
        {page === 'requisits' && <RequirementsPage />}
        {page === 'consultora' && <Consultancy />}
        {page === 'contacte' && <Contact />}
        {page === 'privacitat' && <Privacy />}
        {page === 'cookies' && <Cookies />}
      </main>
      <Footer page={page} />
    </>
  )
}
