import { isProjectPagePublished } from './publication.js'
export const projectBase = '#/casos/ceramica-riu-sec'
export const mainNavigation = [
  { page: 'inici', label: 'Inici', href: '#/' },
  { page: 'serveis', label: 'Serveis', href: '#/serveis' },
  { page: 'casos', label: 'Casos d’èxit', href: '#/casos' },
  { page: 'consultora', label: 'Equip', href: '#/consultora' },
  { page: 'contacte', label: 'Contacte', href: '#/contacte' },
]
const projectPages = [
  { page: 'projecte', label: 'El projecte', href: projectBase, description: 'L’empresa, el repte i l’objectiu.' },
  { page: 'empresa', label: 'L’empresa', href: projectBase + '/empresa', description: 'Context, organització i situació de Ceràmica Riu Sec.' },
  { page: 'proces', label: 'Procés actual', href: projectBase + '/proces', description: 'Model AS-IS i resum de les huit activitats.' },
  { page: 'analisi', label: 'Problemes detectats', href: projectBase + '/analisi', description: 'Diagnòstic, decisions i conseqüències de cada activitat.' },
  { page: 'millora', label: 'Proposta de millora', href: projectBase + '/millora', description: 'Millores principals i model TO-BE.' },
  { page: 'requisits', label: 'Requisits ERP', href: projectBase + '/requisits', description: 'Històries d’usuari i dades necessàries per avaluar l’ERP.' },
  { page: 'documents', label: 'Documents i fonts', href: projectBase + '/documents', description: 'Models BPMN, presentació i referències de consulta.' },
]
export const projectNavigation = projectPages.filter((page) => !['empresa','analisi'].includes(page.page) && isProjectPagePublished(page.page))
export const legalNavigation = [
  { page: 'privacitat', label: 'Privacitat', href: '#/privacitat' },
  { page: 'cookies', label: 'Cookies', href: '#/cookies' },
]
export const allNavigation = [...mainNavigation, ...projectPages, ...legalNavigation]
const aliases = { '#/empresa': 'empresa', '#/proces': 'proces', '#/analisi': 'analisi', '#/millora': 'millora', '#/requisits': 'requisits', '#/documents': 'documents', '#/equip': 'consultora' }
export function readRoute(hash = window.location.hash) {
  const [rawPath, query = ''] = hash.split('?')
  const path = rawPath.replace(/\/$/, '') || '#'
  const found = allNavigation.find((item) => item.href.replace(/\/$/, '') === path)
  const params = new URLSearchParams(query)
  const page = found?.page || aliases[path] || 'notfound'
  const view = params.get('vista') || ''
  const mergedViews = { empresa: ['context','organitzacio','situacio'], proces: ['abast','preocupacions'], millora: ['prioritats'], requisits: ['planificacio','compres','recepcio','coordinacio'] }
  let section = params.get('seccio') || (mergedViews[page]?.includes(view) ? view : '')
  if (page === 'empresa') return { page: 'projecte', section: '', view: '' }
  if (page === 'analisi') return { page: 'millora', section: 'canvis', view: '' }
  if (page === 'proces' && view) section ||= view === 'abast' ? 'abast' : view
  if (page === 'millora' && view) section ||= view
  if (page === 'millora' && section === 'tasques-erp') return isProjectPagePublished('requisits') ? { page: 'requisits', section: 'tasques-erp', view: 'tasques-erp' } : { page:'projecte', section:'', view:'' }
  if (page === 'millora' && !['canvis','model-proposat'].includes(section)) section = ''
  if (page === 'proces' && !['model-actual','activitats',...Array.from({length:8},(_,index) => 'activitat-' + (index + 1))].includes(section)) section = ''
  return isProjectPagePublished(page) ? { page, section, view } : { page:'projecte', section:'', view:'' }
}
export const pageHref = (page) => !isProjectPagePublished(page) ? projectBase : page === 'empresa' ? projectBase : page === 'analisi' ? projectBase + '/millora?seccio=canvis' : allNavigation.find((item) => item.page === page)?.href || '#/'
