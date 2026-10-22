export const team = [
  { name: 'Héctor Balaguer Romero', studies: 'Grau en Enginyeria Informàtica (en curs)', role: 'Gerent i responsable de relació amb clients', responsibility: 'Coordina la consultora, defineix les prioritats dels projectes i gestiona la captació i el seguiment de clients.' },
  { name: 'Carles Martí Corredor', studies: 'Grau en Enginyeria Informàtica (en curs)', role: 'Responsable d’anàlisi de processos', responsibility: 'Documenta el funcionament actual, identifica punts de millora i defineix els processos proposats.' },
  { name: 'Domingo Zurera González', studies: 'Grau en Enginyeria Informàtica (en curs)', role: 'Responsable de solucions ERP', responsibility: 'Analitza els requisits funcionals, compara solucions ERP i prepara la proposta d’implantació.' },
  { name: 'Pau Mollar Belis', studies: 'Grau en Matemàtica Computacional (en curs)', role: 'Responsable d’anàlisi de dades', responsibility: 'Defineix les dades i els indicadors necessaris per a avaluar el procés i donar suport a les decisions.' },
]

export const departments = [
  { name: 'Direcció', people: 2, task: 'Defineix les prioritats i supervisa els resultats.' },
  { name: 'Producció', people: 34, task: 'Planifica i fabrica els taulells.' },
  { name: 'Magatzem i logística', people: 10, task: 'Rep, guarda i registra els materials.' },
  { name: 'Compres', people: 3, task: 'Selecciona proveïdors i tramita les comandes.' },
  { name: 'Comercial', people: 7, task: 'Gestiona les comandes dels clients.' },
  { name: 'Qualitat', people: 4, task: 'Controla materials rebuts i producte fabricat.' },
  { name: 'Administració i finances', people: 4, task: 'Gestiona factures, pagaments i comptabilitat.' },
]

export const steps = [
  {
    title: 'Identificar les necessitats', owner: 'Producció',
    summary: 'El pla de fabricació marca quins materials faran falta.',
    input: 'Pla de fabricació', output: 'Llista d’argila, esmalts i embalatges necessaris',
    tools: 'Ordinador i revisió setmanal del pla',
    problem: 'Els canvis del pla no sempre arriben a compres a temps.',
  },
  {
    title: 'Comprovar les existències', owner: 'Magatzem',
    summary: 'Es compara la necessitat amb l’estoc registrat.',
    input: 'Llista de materials i fitxer d’estoc', output: 'Quantitats que falten',
    tools: 'Material emmagatzemat, fitxes i full de càlcul',
    problem: 'El fitxer pot mostrar una quantitat diferent de la disponible físicament.',
  },
  {
    title: 'Preparar la sol·licitud', owner: 'Producció, magatzem i compres',
    summary: 'Es demana autorització per comprar allò que falta.',
    input: 'Quantitats que falten i pressupost', output: 'Sol·licitud de compra autoritzada',
    tools: 'Correu electrònic, full de sol·licitud i autorització segons l’import',
    problem: 'Algunes peticions es perden entre correus o queden pendents.',
  },
  {
    title: 'Seleccionar el proveïdor i fer la comanda', owner: 'Compres',
    summary: 'Es comparen ofertes i s’envia l’ordre de compra.',
    input: 'Sol·licitud i ofertes dels proveïdors', output: 'Comanda enviada',
    tools: 'Catàleg de proveïdors, ofertes i ordre de compra',
    problem: 'La informació de proveïdors i comandes està repartida en fitxers.',
  },
  {
    title: 'Seguir el lliurament', owner: 'Compres',
    summary: 'Es confirma la data prevista d’arribada.',
    input: 'Comanda i confirmació del proveïdor', output: 'Data de lliurament prevista',
    tools: 'Correu, telèfon i termini acordat',
    problem: 'Producció no sempre sap si el material arribarà abans de fabricar.',
  },
  {
    title: 'Rebre el material', owner: 'Magatzem',
    summary: 'Es comproven les quantitats rebudes amb l’albarà i la comanda.',
    input: 'Comanda, albarà i material rebut', output: 'Comprovació de quantitats',
    tools: 'Moll de descàrrega, equips de moviment i mesures de prevenció de riscos',
    problem: 'Les diferències de quantitat es comuniquen tard a compres.',
  },
  {
    title: 'Comprovar la qualitat', owner: 'Qualitat i magatzem',
    summary: 'El material es revisa abans de posar-lo a disposició de producció.',
    input: 'Material rebut i especificacions', output: 'Acceptació o incidència',
    tools: 'Mostres, fitxes tècniques i fitxes de dades de seguretat quan corresponga',
    problem: 'El material pot quedar pendent de revisió sense que producció ho sàpia.',
  },
  {
    title: 'Registrar l’entrada', owner: 'Magatzem',
    summary: 'El material acceptat s’incorpora a l’estoc i s’avisa producció.',
    input: 'Material acceptat', output: 'Estoc actualitzat i avís a producció',
    tools: 'Full d’estoc, ordinador i ubicacions del magatzem',
    problem: 'El registre manual es pot fer tard i deixar l’estoc desactualitzat.',
  },
]
