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
    summary: 'Revisa el pla de fabricació i determina quines matèries primeres calen i per a quan.',
    input: 'Pla de fabricació vigent', output: 'Llista d’argila i esmalts necessaris, amb quantitats i dates',
    tools: 'Ordinador i revisió setmanal del pla',
    problem: 'Els canvis es comuniquen per correu o verbalment i no sempre arriben a compres a temps.',
    consequence: 'Compres pot treballar amb quantitats antigues i haver de tramitar una compra urgent.',
  },
  {
    title: 'Comprovar les existències', owner: 'Magatzem',
    summary: 'Compara les quantitats necessàries amb les existències que mostra el full d’estoc.',
    input: 'Llista de matèries primeres i full d’estoc', output: 'Quantitats que falten per comprar',
    tools: 'Material emmagatzemat, fitxes i full de càlcul',
    problem: 'El full separat pot no reflectir les últimes entrades o el material reservat.',
    consequence: 'Es pot comprar material que ja hi és o comptar amb existències que no es poden utilitzar.',
  },
  {
    title: 'Preparar la sol·licitud', owner: 'Producció, magatzem i compres',
    summary: 'Preparen la petició i demanen l’autorització per comprar allò que falta.',
    input: 'Quantitats que falten i pressupost disponible', output: 'Sol·licitud aprovada, retornada per corregir o rebutjada',
    tools: 'Correu electrònic, full de sol·licitud i autorització segons l’import',
    problem: 'La petició passa per diversos correus i no sempre queda clar qui l’ha d’autoritzar.',
    consequence: 'Pot quedar pendent sense seguiment i retardar la comanda.',
  },
  {
    title: 'Seleccionar el proveïdor i fer la comanda', owner: 'Compres',
    summary: 'Compara les ofertes, tria el proveïdor i li envia la comanda.',
    input: 'Sol·licitud aprovada, catàleg de proveïdors i ofertes', output: 'Ordre de compra enviada al proveïdor',
    tools: 'Catàleg de proveïdors, ofertes i ordre de compra',
    problem: 'Les condicions i els motius de l’elecció queden repartits en fitxers i correus.',
    consequence: 'Costa revisar la decisió i es pot passar per alt un termini de lliurament inadequat.',
  },
  {
    title: 'Seguir el lliurament', owner: 'Compres',
    summary: 'Contrasta la data confirmada pel proveïdor amb la data en què producció necessita el material.',
    input: 'Comanda, confirmació del proveïdor i data requerida', output: 'Data prevista comunicada a producció o avís de retard',
    tools: 'Correu, telèfon i termini acordat',
    problem: 'Els canvis de data queden en correus o telefonades i poden no arribar a producció.',
    consequence: 'Producció pot descobrir el retard massa tard per buscar una alternativa o replanificar.',
  },
  {
    title: 'Rebre el material', owner: 'Magatzem',
    summary: 'Comprova la quantitat i la identitat del material rebut contra l’albarà i la comanda.',
    input: 'Comanda, albarà i material lliurat', output: 'Recepció completa, parcial o amb una diferència registrada',
    tools: 'Moll de descàrrega, equips de moviment i mesures de prevenció de riscos',
    problem: 'Les diferències de quantitat es comuniquen a compres després de la descàrrega.',
    consequence: 'La reclamació es retarda i es pot donar per rebuda una quantitat incorrecta.',
  },
  {
    title: 'Comprovar la qualitat', owner: 'Qualitat i magatzem',
    summary: 'Revisa mostres i fitxes tècniques per decidir si el lot es pot utilitzar.',
    input: 'Lot rebut, mostres i especificacions tècniques', output: 'Lot acceptat, pendent de revisió o rebutjat',
    tools: 'Mostres, fitxes tècniques i fitxes de dades de seguretat quan corresponga',
    problem: 'L’estat dels lots pendents de revisió no sempre es comunica a producció.',
    consequence: 'Producció pot planificar amb material que encara no està autoritzat per a l’ús.',
  },
  {
    title: 'Registrar l’entrada', owner: 'Magatzem',
    summary: 'Anota la quantitat acceptada i la ubicació, i informa producció que ja està disponible.',
    input: 'Lot acceptat, quantitat validada i ubicació de magatzem', output: 'Existències actualitzades i avís a producció',
    tools: 'Full d’estoc, ordinador i ubicacions del magatzem',
    problem: 'L’entrada al full d’estoc i l’avís a producció són dos passos manuals separats.',
    consequence: 'La dada d’estoc pot quedar desactualitzada encara que el material ja estiga acceptat.',
  },
]
