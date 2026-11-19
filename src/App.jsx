import { useEffect, useRef, useState } from 'react'
import { caseStudies, team } from './content.js'
import { ImprovementPage, ProcessPage, RequirementsPage } from './Practice4.jsx'

import { mainNavigation as navigation, projectNavigation as caseNavigation, legalNavigation as footerNavigation, readRoute, projectBase } from './navigation.js'
import { Documents, PageIntro, ProjectMenu, ProjectOverview, ProjectPager } from './ProjectUI.jsx'

const asset = (file) => import.meta.env.BASE_URL + 'images/' + file

const titles = {
  inici: 'Inici',
  casos: 'Projectes',
  serveis: 'Serveis',
  projecte: 'El projecte',
  documents: 'Documents i fonts',
  notfound: 'Pàgina no trobada',
  empresa: 'Empresa',
  proces: 'Procés actual',
  analisi: 'Problemes detectats',
  millora: 'Proposta de millora',
  requisits: 'Requisits ERP',
  consultora: 'Equip',
  contacte: 'Contacte',
  privacitat: 'Privacitat',
  cookies: 'Cookies',
}

function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef(null)
  const isProject = caseNavigation.some((item) => item.page === page)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  function skipToContent(event) {
    event.preventDefault()
    setMenuOpen(false)
    const heading = document.querySelector('main h1')
    heading?.focus({ preventScroll: true })
    heading?.scrollIntoView({ block: 'start' })
  }

  const links = navigation.map((item) => (
    <a key={item.page} href={item.href}
      aria-current={page === item.page ? 'page' : item.page === 'casos' && isProject ? 'location' : undefined}
      onClick={() => {
        if (menuOpen && item.href === window.location.hash) {
          setMenuOpen(false)
          menuButton.current?.focus()
        }
      }}>
      {item.label}
    </a>
  ))

  return <header className="site-header" onKeyDown={(event) => {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false)
      menuButton.current?.focus()
    }
  }}>
    <a className="skip-link" href="#main-content" onClick={skipToContent}>Saltar al contingut</a>
    <div className="wrap header-inner">
      <a className="brand" href="#/" aria-label="Nexe Consultoria ERP, tornar a l’inici">
        <img src={asset('nexe-logo.svg')} alt="" width="1200" height="420" />
      </a>
      <nav className="desktop-nav" aria-label="Navegació principal">{links}</nav>
      <button ref={menuButton} type="button" className="menu-button" aria-expanded={menuOpen}
        aria-controls="mobile-nav" onClick={() => setMenuOpen(!menuOpen)}>Menú <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span></button>
    </div>
    <nav id="mobile-nav" className="mobile-nav wrap" aria-label="Navegació principal" hidden={!menuOpen}>{links}</nav>
  </header>
}

function Home() {
  return <>
    <section className="home-hero" aria-labelledby="home-title">
      <div className="wrap home-hero-content">
        <div className="home-hero-copy">
          <h1 id="home-title" tabIndex={-1}>Consultoria ERP per a la teua empresa</h1>
          <p className="home-lead">Analitzem els processos i definim què necessita el teu negoci abans de triar una solució ERP.</p>
          <div className="home-actions">
            <a className="action-link" href={projectBase}>Veure el projecte de Ceràmica Riu Sec</a>
            <a className="text-link" href="#/serveis">Veure els serveis</a>
          </div>
        </div>
        <img className="home-hero-image" src={asset('consultoria-hero.jpg')} alt="" width="2400" height="1600" fetchPriority="high" />
      </div>
    </section>
    <section className="section-space home-featured">
      <div className="wrap home-featured-grid">
        <div><p className="page-label">Projecte en curs</p><h2>Ceràmica Riu Sec</h2><p>Revisem l’aprovisionament de matèries primeres d’un fabricant de taulells d’Onda, des del pla de fabricació fins al registre del material acceptat.</p></div>
        <dl>
          <div><dt>Equips implicats</dt><dd>Producció, compres, magatzem i qualitat.</dd></div>
          <div><dt>Objectiu</dt><dd>Disposar de material a temps i d’un estoc fiable.</dd></div>
        </dl>
      </div>
    </section>
    <section className="section-space home-offering">
      <div className="wrap">
        <h2 className="section-heading-row">En què podem ajudar-te</h2>
        <div className="home-offering-grid">{serviceOfferings.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.result}</p></article>)}</div>
      </div>
    </section>
    <section className="home-contact section-space">
      <div className="wrap"><h2>L’equip de Nexe</h2><a className="text-link" href="#/consultora">Conéixer l’equip</a></div>
    </section>
  </>
}

const serviceOfferings = [
  { title:'Anàlisi de processos', description:'Revisem les activitats, els responsables i el recorregut de la informació. Identifiquem les decisions i les dificultats de coordinació.', result:'Mapa del procés actual i diagnòstic.' },
  { title:'Definició de requisits', description:'Recollim què necessita cada equip i com es comprovarà que una solució cobreix aquestes necessitats.', result:'Històries d’usuari i dades necessàries.' },
  { title:'Avaluació de solucions ERP', description:'Preparem criteris per comparar els productes i els mòduls amb les necessitats del procés.', result:'Criteris de comparació i punts a verificar.' },
  { title:'Planificació de la implantació', description:'Definim les fases, els responsables i les comprovacions que caldrà preparar per al canvi de sistema.', result:'Proposta de fases i validacions.' },
]
function Services() {
  return <><PageIntro title="Serveis de consultoria ERP">Analitzem el treball de cada departament i preparem una proposta perquè l’empresa puga avaluar una solució adequada.</PageIntro>
    <section className="section-space"><div className="wrap service-catalogue">{serviceOfferings.map((item) => <article key={item.title}><h2>{item.title}</h2><p>{item.description}</p><p className="service-result"><strong>Resultat del treball</strong>{item.result}</p></article>)}</div></section>
    <section className="section-space project-brief"><div className="wrap split-section"><h2>Com es concreta</h2><div className="body-copy"><p>El treball amb Ceràmica Riu Sec mostra les activitats que revisem, els problemes detectats i la proposta que estem desenvolupant.</p><a className="text-link next-link" href={projectBase}>Veure el projecte de Ceràmica Riu Sec</a></div></div></section>
  </>
}

function Cases() {
  return <>
    <PageIntro title="Projectes">Treballs d’anàlisi i millora de processos.</PageIntro>
    <section className="section-space cases-section">
      <div className="wrap case-list">{caseStudies.map((item) => <article className="client-case" key={item.slug}>
        <div className="client-case-copy">
          <p className="page-label">{item.sector} · {item.location}</p>
          <h2>{item.name}</h2>
          <p className="case-status">{item.status}</p>
          <p>{item.summary}</p>
          <a className="action-link" href={'#/casos/' + item.slug}>Veure el projecte de {item.name}</a>
        </div>
        <figure><img src={asset(item.image)} alt="" width="1672" height="941" /></figure>
      </article>)}</div>
    </section>
  </>
}

function Consultancy() {
  return (
    <>
      <PageIntro title="L’equip de Nexe">
        Som quatre estudiants d’Enginyeria Informàtica i Matemàtica Computacional. Estudiem com treballa l’empresa, identifiquem on es perd informació i definim què hauria de resoldre una solució ERP.
      </PageIntro>
      <section className="section-space team-section" aria-label="Funcions de l’equip">
        <div className="wrap">
          <ul className="team-list" role="list">{team.map((person) => <li key={person.name}><h2>{person.name}</h2><p className="team-role">{person.role}</p><p className="team-responsibility">{person.responsibility}</p><p className="team-studies">{person.studies}</p></li>)}</ul>
        </div>
      </section>
    </>
  )
}

const contactFields = [
  { name: 'name', label: 'Nom', autoComplete: 'name', empty: 'Escriu el nom.' },
  { name: 'email', label: 'Correu electrònic', type: 'email', autoComplete: 'email', empty: 'Escriu el correu electrònic.' },
  { name: 'company', label: 'Empresa (opcional)', autoComplete: 'organization', wide: true },
  { name: 'message', label: 'Missatge', wide: true, empty: 'Escriu un missatge.' },
]

function Contact() {
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(false)

  function testForm(event) {
    event.preventDefault()
    const form = event.currentTarget
    const nextErrors = {}
    for (const field of contactFields) {
      const input = form.elements.namedItem(field.name)
      if (field.empty && !input.value.trim()) nextErrors[field.name] = field.empty
      else if (input.validity.typeMismatch) nextErrors[field.name] = 'Escriu una adreça de correu vàlida.'
    }
    const firstError = Object.keys(nextErrors)[0]
    setErrors(nextErrors)
    setValid(!firstError)
    if (firstError) requestAnimationFrame(() => form.elements.namedItem(firstError)?.focus())
  }

  return <>
    <PageIntro title="Contacte">Relació amb clients i coordinació amb l’equip de Nexe.</PageIntro>
    <section className="section-space">
      <div className="wrap contact-editorial">
        <div><h2>Héctor Balaguer Romero</h2><p>Gerent i responsable de relació amb clients.</p><a className="text-link next-link" href="#/consultora">Conéixer l’equip</a></div>
        <form className="contact-form" onSubmit={testForm} onChange={() => setValid(false)} noValidate aria-labelledby="contact-form-title" aria-describedby="contact-help">
          <h2 id="contact-form-title">Formulari de prova</h2>
          <p id="contact-help">Utilitza dades fictícies. La prova comprova el format dels camps sense enviar ni guardar informació. Tots els camps són obligatoris, tret del d’empresa.</p>
          <div className="contact-form-fields">
            {contactFields.map((field) => {
              const id = 'contact-' + field.name
              const props = { id, name: field.name, required: Boolean(field.empty), 'aria-invalid': errors[field.name] ? true : undefined, 'aria-describedby': errors[field.name] ? id + '-error' : undefined }
              return <div key={field.name} className={field.wide ? 'contact-form-full' : undefined}>
                <label htmlFor={id}>{field.label}</label>
                {field.name === 'message' ? <textarea {...props} rows="4" /> : <input {...props} type={field.type || 'text'} autoComplete={field.autoComplete} />}
                {errors[field.name] && <p className="field-error" id={id + '-error'}>{errors[field.name]}</p>}
              </div>
            })}
          </div>
          <button className="action-link" type="submit">Provar el formulari</button>
          <p className="contact-result" role="status">{valid && 'Prova completada. Els camps s’han validat. El missatge és una simulació.'}</p>
        </form>
      </div>
    </section>
  </>
}

function Privacy() {
  return (
    <>
      <PageIntro title="Informació de privacitat">
        Com presentem la informació de l’equip i què passa quan visites aquesta web.
      </PageIntro>
      <section className="section-space info-section">
        <div className="wrap info-layout">
          <h2>Dades a la web</h2>
          <div className="info-copy">
            <p>La web publica els noms, els estudis i les funcions dels membres de Nexe per presentar l’equip del projecte.</p>
            <p>El formulari de contacte és una prova local. Les dades escrites no s’envien ni s’emmagatzemen. No hem incorporat eines pròpies d’analítica ni de publicitat.</p>
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
      <PageIntro title="Ús de cookies">
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
    <nav aria-label="Enllaços del peu de pàgina" className="footer-links">{[...navigation, ...footerNavigation].map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
  </div></footer>
}

export default function App() {
  const [route, setRoute] = useState(readRoute)
  const routeChanged = useRef(false)
  const { page, section } = route
  const isProject = caseNavigation.some((item) => item.page === page)
  useEffect(() => {
    const handleHashChange = () => {
      routeChanged.current = true
      setRoute(readRoute())
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  useEffect(() => {
    document.title = titles[page] + (isProject ? ' · Ceràmica Riu Sec' : '') + ' · Nexe Consultoria ERP'
    const frame = requestAnimationFrame(() => {
      const target = section && document.getElementById(section)
      if (target) {
        const disclosure = target.closest('details')
        if (disclosure) disclosure.open = true
        target.tabIndex = -1
        target.focus({ preventScroll: true })
        target.scrollIntoView({ block: 'start' })
      } else {
        if (routeChanged.current) document.querySelector('main h1')?.focus({ preventScroll: true })
        window.scrollTo(0, 0)
      }
      routeChanged.current = false
    })
    return () => cancelAnimationFrame(frame)
  }, [route, page, section, isProject])
  const content = <>
    {page === 'inici' && <Home />}
    {page === 'serveis' && <Services />}
    {page === 'casos' && <Cases />}
    {page === 'projecte' && <ProjectOverview />}
    {page === 'proces' && <ProcessPage />}
    {page === 'millora' && <ImprovementPage />}
    {page === 'requisits' && <RequirementsPage />}
    {page === 'documents' && <Documents />}
    {page === 'consultora' && <Consultancy />}
    {page === 'contacte' && <Contact />}
    {page === 'privacitat' && <Privacy />}
    {page === 'cookies' && <Cookies />}
    {page === 'notfound' && <><PageIntro label="Navegació" title="Pàgina no trobada">Pots tornar a l’inici o consultar els projectes de Nexe.</PageIntro><div className="wrap section-space"><a className="action-link" href="#/">Tornar a l’inici</a><a className="text-link" href={projectBase}>Projecte de Ceràmica Riu Sec</a></div></>}
  </>
  return <><Header page={page} /><main id="main-content">
    {isProject ? <><ProjectMenu page={page} /><div className="project-body">{content}<ProjectPager page={page} /></div></> : content}
  </main><Footer /></>
}
