export const analysis = [
  {
    id: '01', step: 'Identificar les necessitats', owner: 'Producció',
    diagnosis: 'Producció revisa el pla setmanal i comunica els materials per correu o verbalment. Quan el pla canvia, la llista inicial pot continuar circulant sense una versió identificable.',
    decision: 'Cal distingir un pla confirmat d’un canvi pendent de validar.',
    consequence: 'Compres pot treballar amb quantitats antigues i iniciar una compra urgent.',
    improvement: 'Registrar una única necessitat vinculada a la versió del pla, amb data requerida i responsable. Els canvis actualitzen la mateixa petició.',
    category: 'Anàlisi i millora',
  },
  {
    id: '02', step: 'Comprovar les existències', owner: 'Magatzem',
    diagnosis: 'El personal compara la llista amb un full d’estoc separat. Les entrades pendents de registrar i el material reservat poden fer que la quantitat del fitxer no siga la disponible.',
    decision: 'La quantitat disponible cobreix la necessitat després de descomptar les reserves?',
    consequence: 'Es compra material que ja hi és o es confia en estoc que no es pot utilitzar.',
    improvement: 'Consultar existències, reserves i material pendent de control en un registre compartit. Calcular automàticament la quantitat que falta.',
    category: 'Adopció de programari o TIC',
  },
  {
    id: '03', step: 'Preparar la sol·licitud', owner: 'Producció, magatzem i compres',
    diagnosis: 'Una petició pot passar per diversos correus i fulls abans de l’autorització. No sempre es veu qui ha de decidir ni des de quan espera.',
    decision: 'L’import supera el llindar d’autorització acordat per direcció?',
    consequence: 'L’aprovació es converteix en un coll d’ampolla i la compra arriba tard.',
    improvement: 'Usar una sol·licitud única amb aprovació segons l’import, responsable assignat i avisos quan supere el termini previst.',
    category: 'Resolució de problemes',
  },
  {
    id: '04', step: 'Seleccionar el proveïdor i fer la comanda', owner: 'Compres',
    diagnosis: 'Les ofertes i les condicions dels proveïdors es guarden en fitxers diferents. Costa reconstruir per què es va triar una oferta.',
    decision: 'L’oferta compleix preu, termini i especificació del material?',
    consequence: 'Una elecció basada només en el preu pot provocar retards o incidències de qualitat.',
    improvement: 'Comparar les ofertes amb criteris comuns i conservar la decisió junt amb la comanda i la versió de la sol·licitud.',
    category: 'Anàlisi i millora',
  },
  {
    id: '05', step: 'Seguir el lliurament', owner: 'Compres',
    diagnosis: 'La data promesa queda en correus o telefonades. Producció no veu quan un material crític arribarà després de la data que necessita.',
    decision: 'La data confirmada permet mantindre el pla de fabricació?',
    consequence: 'La fàbrica descobreix massa tard que haurà de reprogramar una ordre.',
    improvement: 'Registrar data confirmada i criticitat del material. Si el lliurament amenaça el pla, avisar producció i activar un proveïdor alternatiu.',
    category: 'Noves necessitats del negoci',
  },
  {
    id: '06', step: 'Rebre el material', owner: 'Magatzem',
    diagnosis: 'Magatzem confronta el material amb l’albarà i la comanda. Les diferències de quantitat es comuniquen després de la descàrrega i poden quedar sense seguiment.',
    decision: 'La quantitat i la referència rebudes coincideixen amb la comanda?',
    consequence: 'Es pot donar per disponible material incomplet o equivocat.',
    improvement: 'Registrar la recepció contra la comanda en el moment de l’arribada i obrir una incidència per a qualsevol diferència.',
    category: 'Adopció de programari o TIC',
  },
  {
    id: '07', step: 'Comprovar la qualitat', owner: 'Qualitat i magatzem',
    diagnosis: 'Les mostres i fitxes tècniques es revisen abans d’alliberar el material. L’estat pendent no sempre arriba a producció.',
    decision: 'El lot compleix les especificacions i les condicions de seguretat aplicables?',
    consequence: 'Producció pot planificar amb material immobilitzat o rebutjat.',
    improvement: 'Mantindre el lot bloquejat fins a la decisió de qualitat. Compartir l’estat i la incidència amb producció i compres.',
    category: 'Resolució de problemes',
  },
  {
    id: '08', step: 'Registrar l’entrada', owner: 'Magatzem',
    diagnosis: 'Després de l’acceptació, magatzem actualitza el full d’estoc i avisa producció. Són dos passos manuals i poden fer-se en moments diferents.',
    decision: 'El lot està acceptat i situat en una ubicació disponible?',
    consequence: 'L’estoc consultat per altres àrees queda desactualitzat.',
    improvement: 'Confirmar la ubicació i registrar l’entrada una sola vegada; el sistema actualitza l’estoc i avisa producció.',
    category: 'Adopció de programari o TIC',
  },
]

export const improvementCategories = [
  {
    title: 'Anàlisi i millora', steps: '01 · 04',
    change: 'Una versió del pla per necessitat i un criteri compartit per comparar ofertes.',
    reason: 'Evita repetir peticions i permet justificar la selecció del proveïdor amb la mateixa informació.',
  },
  {
    title: 'Resolució de problemes', steps: '03 · 07',
    change: 'Aprovacions amb responsable i termini; lots bloquejats fins a la decisió de qualitat.',
    reason: 'Actua sobre dos punts on la feina queda aturada sense que la resta de l’equip ho veja.',
  },
  {
    title: 'Noves necessitats del negoci', steps: '05',
    change: 'Marcar els materials crítics per al pla i gestionar una alternativa si el lliurament es retarda.',
    reason: 'Permet assumir més comandes sense descobrir els riscos de subministrament quan ja és massa tard.',
  },
  {
    title: 'Adopció de programari o TIC', steps: '02 · 06 · 08',
    change: 'Una dada d’estoc compartida, recepcions vinculades a la comanda i actualització automàtica després de l’acceptació.',
    reason: 'Elimina la còpia manual de la mateixa informació en diversos fitxers.',
  },
]

export const userStories = [
  { id: 'HU-01', role: 'planificador de producció', need: 'registrar les necessitats de cada versió del pla i la data en què necessite els materials', benefit: 'avisar compres a temps quan canvie la fabricació', task: 'Tasca d’usuari', differential: true, steps: '01' },
  { id: 'HU-02', role: 'responsable de magatzem', need: 'veure existències, reserves i lots pendents de qualitat en una mateixa consulta', benefit: 'calcular la quantitat realment disponible', task: 'Tasca de servei', differential: true, steps: '02' },
  { id: 'HU-03', role: 'responsable de compres', need: 'rebre sol·licituds amb l’estat de l’aprovació i un avís si s’esgota el termini', benefit: 'tramitar les compres sense perdre peticions', task: 'Tasca d’usuari', differential: false, steps: '03' },
  { id: 'HU-04', role: 'comprador', need: 'comparar ofertes amb preu, termini i especificació del material', benefit: 'deixar constància del motiu de la selecció', task: 'Tasca d’usuari', differential: true, steps: '04' },
  { id: 'HU-05', role: 'planificador de producció', need: 'rebre un avís quan la data confirmada d’un material crític supere la data necessària', benefit: 'reprogramar la fabricació o demanar una alternativa', task: 'Tasca de servei', differential: true, steps: '05' },
  { id: 'HU-06', role: 'operari de magatzem', need: 'registrar les quantitats rebudes contra la comanda i obrir una incidència si no coincideixen', benefit: 'evitar que una recepció incompleta es considere disponible', task: 'Tasca d’usuari', differential: false, steps: '06' },
  { id: 'HU-07', role: 'tècnic de qualitat', need: 'bloquejar o alliberar cada lot segons el resultat de la inspecció', benefit: 'impedir que producció utilitze material no acceptat', task: 'Tasca d’usuari', differential: true, steps: '07' },
  { id: 'HU-08', role: 'responsable de magatzem', need: 'actualitzar l’estoc i avisar producció quan confirme la ubicació d’un lot acceptat', benefit: 'mantindre les existències al dia sense un segon registre manual', task: 'Tasca de servei', differential: false, steps: '08' },
]

export const differentialData = [
  { name: 'Versió del pla de fabricació', use: 'Relaciona cada necessitat amb el pla vigent i els seus canvis.', stories: 'HU-01' },
  { name: 'Data requerida per material', use: 'Permet comparar la necessitat de producció amb la data confirmada del proveïdor.', stories: 'HU-01 · HU-05' },
  { name: 'Estoc reservat i pendent de qualitat', use: 'Separa el material físic de la quantitat realment utilitzable.', stories: 'HU-02 · HU-07' },
  { name: 'Criticitat per a l’ordre de fabricació', use: 'Prioritza els avisos quan un retard pot aturar una ordre concreta.', stories: 'HU-05' },
  { name: 'Especificació ceràmica del material', use: 'Guarda el requisit tècnic que qualitat compara amb el lot rebut.', stories: 'HU-04 · HU-07' },
  { name: 'Estat i causa de la incidència de recepció', use: 'Manté traçables les diferències de quantitat o de qualitat.', stories: 'HU-06 · HU-07' },
]
