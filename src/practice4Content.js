const initialAnalysis = [
  {
    id: '01', step: 'Identificar les necessitats', owner: 'Producció',
    assessment: 'Parcialment correcta',
    diagnosis: 'Producció revisa el pla setmanal i comunica els materials per correu o verbalment. Quan el pla canvia, la llista inicial pot continuar circulant sense una versió identificable.',
    problemSummary: 'Els canvis del pla arriben tard a compres.',
    participantConcern: 'Producció pot quedar-se sense material; compres pot rebre peticions urgents que no havia pogut preveure.',
    decision: 'La necessitat coincideix amb el pla confirmat? Si el pla canvia, cal revisar les quantitats i les dates.',
    consequence: 'Compres pot treballar amb quantitats antigues i iniciar una compra urgent.',
    improvement: 'Estandarditzar una petició amb material, quantitat, prioritat i data requerida, vinculada a la versió del pla. Compartir els canvis amb compres des del mateix registre.',
    category: '1.b · Estandarditzar; 4.b · Automatitzar',
  },
  {
    id: '02', step: 'Comprovar les existències', owner: 'Magatzem',
    assessment: 'No prou fiable',
    diagnosis: 'El personal compara la llista amb un full d’estoc separat. Les entrades pendents de registrar i el material reservat poden fer que la quantitat del fitxer no siga la disponible.',
    problemSummary: 'L’inventari pot mostrar quantitats que no es poden utilitzar.',
    participantConcern: 'Compres pot desconfiar de la dada d’estoc; magatzem ha de repetir comprovacions i corregir diferències.',
    decision: 'L’estoc utilitzable cobreix la necessitat? Si no, quina quantitat cal comprar tenint en compte reserves i recepcions pendents?',
    consequence: 'Es compra material que ja hi és o es confia en estoc que no es pot utilitzar.',
    improvement: 'Unificar el registre d’existències, reserves i lots pendents de qualitat. Fer recomptes amb un procediment comú i calcular la quantitat que falta. Definir mínims de reposició segons demanda prevista, termini del proveïdor i capacitat de magatzem.',
    category: '1.b · Estandarditzar; 2.a · Eliminar duplicats; 3 · Noves necessitats; 4.b · Automatitzar',
  },
  {
    id: '03', step: 'Preparar la sol·licitud', owner: 'Producció, magatzem i compres',
    assessment: 'Parcialment correcta',
    diagnosis: 'Una petició pot passar per diversos correus i fulls abans de l’autorització. No sempre es veu qui ha de decidir ni des de quan espera.',
    problemSummary: 'Les peticions poden quedar pendents sense responsable visible.',
    participantConcern: 'Producció pot patir retards sense conéixer la causa; compres ha de perseguir les autoritzacions.',
    decision: 'La petició està justificada, té la quantitat correcta i compleix el pressupost? Cal aprovar-la, retornar-la per a corregir-la o rebutjar-la.',
    consequence: 'L’aprovació es converteix en un coll d’ampolla i la compra arriba tard.',
    improvement: 'Usar una sol·licitud única amb aprovació segons import i tipus de compra. Assignar responsable, termini i una persona suplent per a absències. Avisar dels retards i simplificar el circuit per a compres habituals ja autoritzades.',
    category: '1.a · Revisar; 2.b · Resoldre colls d’ampolla; 4.b · Automatitzar',
  },
  {
    id: '04', step: 'Seleccionar el proveïdor i fer la comanda', owner: 'Compres',
    assessment: 'Parcialment correcta',
    diagnosis: 'Les ofertes i les condicions dels proveïdors es guarden en fitxers diferents. Costa reconstruir per què es va triar una oferta.',
    problemSummary: 'Les ofertes i l’historial dels proveïdors estan dispersos.',
    participantConcern: 'Compres dedica temps a reconstruir comparacions; producció pot rebre tard el material si l’elecció no considera el termini.',
    decision: 'Quina oferta compleix preu, termini, disponibilitat i especificació? Si cap ho fa, cal buscar una alternativa.',
    consequence: 'Una elecció basada només en el preu pot provocar retards o incidències de qualitat.',
    improvement: 'Comparar ofertes amb criteris comuns i guardar el motiu de l’elecció. Per a compres recurrents, aprofitar proveïdors homologats i condicions acordades; mantindre l’historial junt amb la comanda.',
    category: '1.a · Revisar; 1.b · Estandarditzar; 4.b · Automatitzar',
  },
  {
    id: '05', step: 'Seguir el lliurament', owner: 'Compres',
    assessment: 'Poc eficient',
    diagnosis: 'La data promesa queda en correus o telefonades. Producció no veu quan un material crític arribarà després de la data que necessita.',
    problemSummary: 'Els retards es coneixen massa tard i no són visibles per a producció.',
    participantConcern: 'Producció treballa amb incertesa; compres respon repetidament a consultes sobre les mateixes comandes.',
    decision: 'La data confirmada permet mantindre el pla? Si no, cal reclamar, buscar subministrament alternatiu o reprogramar.',
    consequence: 'La fàbrica descobreix massa tard que haurà de reprogramar una ordre.',
    improvement: 'Registrar la data confirmada i els seus canvis, marcar materials crítics i prioritzar les comandes amb risc. Avisar producció abans que el retard afecte el pla.',
    category: '1.b · Estandarditzar; 2.b · Resoldre colls d’ampolla; 4.b · Automatitzar',
  },
  {
    id: '06', step: 'Rebre el material', owner: 'Magatzem',
    assessment: 'Parcialment correcta',
    diagnosis: 'Magatzem confronta el material amb l’albarà i la comanda. Les diferències de quantitat es comuniquen després de la descàrrega i poden quedar sense seguiment.',
    problemSummary: 'Les diferències de recepció es comuniquen tard.',
    participantConcern: 'Magatzem repeteix comprovacions; compres disposa de menys temps per a reclamar i producció pot rebre menys material del previst.',
    decision: 'La recepció és completa, parcial o presenta una incidència? Cal registrar la diferència i comunicar-la.',
    consequence: 'Es pot donar per disponible material incomplet o equivocat.',
    improvement: 'Registrar en el moment de l’arribada recepcions completes, parcials o amb incidència contra la comanda. Evitar tornar a copiar les dades de l’albarà, conservar el document original i avisar compres de les diferències.',
    category: '1.b · Estandarditzar; 2.c · Eliminar documentació innecessària; 4.b · Automatitzar',
  },
  {
    id: '07', step: 'Comprovar la qualitat', owner: 'Qualitat i magatzem',
    assessment: 'Parcialment correcta',
    diagnosis: 'Les mostres i fitxes tècniques es revisen abans d’alliberar el material. L’estat pendent no sempre arriba a producció.',
    problemSummary: 'L’estat dels lots pendents de revisió no arriba a producció.',
    participantConcern: 'Producció pot planificar amb un lot bloquejat; qualitat pot rebre pressió per a resoldre una revisió urgent.',
    decision: 'El lot compleix les especificacions? Cal acceptar-lo, mantindre’l bloquejat per a revisar-lo o rebutjar-lo.',
    consequence: 'Producció pot planificar amb material immobilitzat o rebutjat.',
    improvement: 'Fixar criteris d’acceptació i terminis de revisió. Repartir la cua de revisió entre el personal de qualitat disponible segons la criticitat del lot. Mantindre el lot bloquejat fins a la decisió, prioritzar els que afecten la fabricació i compartir l’estat amb producció i compres.',
    category: '1.b · Estandarditzar; 2.b · Resoldre colls d’ampolla; 4.b · Automatitzar',
  },
  {
    id: '08', step: 'Registrar l’entrada', owner: 'Magatzem',
    assessment: 'Poc eficient',
    diagnosis: 'Després de l’acceptació, magatzem actualitza el full d’estoc i avisa producció. Són dos passos manuals i poden fer-se en moments diferents.',
    problemSummary: 'El registre i l’avís es fan manualment i poden arribar tard.',
    participantConcern: 'Producció pot ajornar la fabricació esperant informació; magatzem duplica el treball administratiu.',
    decision: 'La quantitat acceptada i la ubicació estan confirmades? Només llavors el material pot quedar disponible.',
    consequence: 'L’estoc consultat per altres àrees queda desactualitzat.',
    improvement: 'Unificar el registre d’entrada i l’avís a producció. En confirmar quantitat, qualitat i ubicació, actualitzar l’estoc una sola vegada i enviar l’avís automàticament.',
    category: '1.a · Revisar; 2.a · Eliminar duplicats; 4.b · Automatitzar',
  },
]

const reviewDetails = [
  ['Petició única vinculada al pla i avís dels canvis.', 'Evita que compres utilitze una llista antiga quan es modifica la fabricació.'],
  ['Estoc compartit, recomptes i reposició planificada.', 'Una mateixa dada de disponibilitat redueix compres duplicades i permet anticipar la falta de material. El canvi a reposició planificada és una proposta pendent de validació estratègica.'],
  ['Responsable, termini i suplència de l’aprovació.', 'Fa visible la petició pendent i evita que una absència interrompa l’autorització.'],
  ['Criteris comuns per comparar ofertes i guardar la decisió.', 'Permet justificar la selecció considerant qualitat i termini, a més del preu. Si cap oferta és adequada, cal repetir la cerca.'],
  ['Data confirmada compartida i resposta al risc de retard.', 'Permet reaccionar abans que la falta de material afecte la fabricació. Si es canvia de proveïdor, cal tancar el saldo substituït de la comanda original per evitar una compra duplicada.'],
  ['Recepció contra comanda, quantitat parcial i incidència única.', 'Manté pendent la quantitat que falta i evita tornar a transcriure l’albarà. La part rebuda continua cap al control de qualitat.'],
  ['Criteris i terminis de qualitat amb lot bloquejat.', 'Impedeix que un lot sense decisió favorable es planifique com a disponible. Els lots pendents tornen a revisió quan hi ha proves suficients.'],
  ['Confirmació de quantitat i ubicació amb actualització única.', 'Separa la confirmació humana del registre automàtic i evita diferències entre el material acceptat i l’estoc consultat.'],
]
export const analysis = initialAnalysis.map((item, index) => ({ ...item, improvementSummary: reviewDetails[index][0], justification: reviewDetails[index][1] }))

export const improvementCategories = [
  {
    title: 'Anàlisi i millora', steps: '01–08',
    change: 'Estandarditzar la petició, els recomptes, la comparació d’ofertes, la recepció i el control de qualitat. Simplificar les compres recurrents i unir el registre d’entrada amb l’avís.',
    reason: 'Redueix les variants del procés i permet reconstruir les decisions sense buscar dades en fitxers separats.',
  },
  {
    title: 'Resolució de problemes', steps: '02 · 03 · 05 · 06 · 07 · 08',
    change: 'Eliminar registres duplicats, assignar terminis a les aprovacions, prioritzar retards i revisions de qualitat, i registrar les incidències una sola vegada.',
    reason: 'Atén els colls d’ampolla i evita que una tasca pendent quede invisible per als altres departaments.',
  },
  {
    title: 'Noves necessitats del negoci', steps: '02',
    change: 'Proposar a direcció el pas d’una compra reactiva a una reposició planificada. Definir punts de reposició i quantitats objectiu segons demanda, terminis i capacitat de magatzem. És un canvi estratègic proposat que cal validar amb direcció.',
    reason: 'La proposta permet anticipar les compres i donar suport a l’objectiu de créixer mantenint el control de les existències. No es dona per aprovat cap pla d’ampliació de la fàbrica.',
  },
  {
    title: 'Adopció de programari o TIC', steps: '01–08',
    change: 'Compartir dades del pla, estoc, aprovacions, ofertes, comandes, recepcions i qualitat en un ERP, amb avisos quan hi haja canvis o retards.',
    reason: 'Substitueix la transcripció manual entre correus i fulls per un estat consultable per cada departament.',
  },
]

export const improvementPriorities = [
  { level: 'Alta', title: 'Una dada de material fiable', detail: 'Relacionar el pla, l’inventari i les comandes perquè compres actue sobre quantitats actualitzades.' },
  { level: 'Alta', title: 'Peticions i lliuraments visibles', detail: 'Mostrar qui ha d’aprovar cada sol·licitud i avisar dels materials que poden arribar tard.' },
  { level: 'Alta', title: 'Qualitat abans de disponibilitat', detail: 'Impedir que un lot pendent o rebutjat es considere material utilitzable.' },
  { level: 'Mitjana', title: 'Procediments comuns', detail: 'Unificar la selecció de proveïdors, les recepcions parcials i la gestió d’incidències.' },
  { level: 'Mitjana', title: 'Una sola entrada de dades', detail: 'Eliminar còpies manuals de quantitats, albarans i avisos entre departaments.' },
]

export const indicators = [
  'Comandes rebudes dins del termini confirmat',
  'Diferències entre estoc registrat i recompte físic',
  'Temps d’autorització de les sol·licituds',
  'Temps de revisió dels lots pendents de qualitat',
  'Nombre de compres urgents',
]

export const userStories = [
  { id: 'HU-01', role: 'planificador de producció', need: 'conéixer les matèries primeres i les dates requerides de cada versió del pla', benefit: 'comunicar els canvis a compres abans que afecten la fabricació', differential: false, steps: '01', taskRefs: ['need'], acceptance: 'Un canvi del pla conserva la versió anterior i identifica la nova quantitat i data requerides.' },
  { id: 'HU-02', role: 'responsable de magatzem', need: 'conéixer la quantitat utilitzable, les entrades pendents i la necessitat de reposició', benefit: 'evitar ruptures d’estoc i compres duplicades', differential: false, steps: '02', taskRefs: ['calculate'], acceptance: 'La consulta distingeix existències físiques, reserves, lots bloquejats i entrades confirmades. La reposició considera el consum previst sense comptar dues vegades una reserva.' },
  { id: 'HU-03', role: 'responsable de compres', need: 'saber qui ha de decidir cada petició i si està aprovada, retornada o rebutjada', benefit: 'tramitar les compres autoritzades sense perdre les correccions pendents', differential: false, steps: '03', taskRefs: ['request','request_correction','request_rejected'], acceptance: 'Aprovar permet continuar. Retornar exigeix una correcció i una nova revisió. Rebutjar tanca la petició i guarda el motiu. El responsable i el suplent poden consultar les pendents.' },
  { id: 'HU-04', role: 'comprador', need: 'comparar les ofertes segons el preu, el termini i l’especificació del material', benefit: 'triar un proveïdor adequat i justificar la decisió', differential: false, steps: '04', taskRefs: ['supplier'], acceptance: 'Queden guardades les ofertes i el motiu de selecció. Si cap compleix les condicions, no s’emet la comanda i es repeteix la cerca.' },
  { id: 'HU-05', role: 'planificador de producció', need: 'saber quines ordres quedarien afectades per un lliurament tardà o un lot bloquejat', benefit: 'decidir a temps si cal reclamar, buscar una alternativa o replanificar', differential: true, differentialReason: 'El requisit concret és relacionar el lot d’argila o esmalt, la seua decisió de qualitat i les ordres que en depenen. Aquesta relació entre qualitat, compres i planificació s’ha de verificar en la solució i els mòduls avaluats.', steps: '05 · 07', taskRefs: ['eta','quality_pending','reject'], acceptance: 'L’avís identifica el material, la causa, la quantitat afectada i les ordres vinculades. Un avís genèric de retard no dona per satisfet aquest requisit.' },
  { id: 'HU-06', role: 'operari de magatzem', need: 'distingir la part rebuda de la que encara falta i registrar qualsevol diferència', benefit: 'continuar el control de la quantitat rebuda sense tancar la comanda pendent', differential: false, steps: '06', taskRefs: ['receive','partial','qty_issue'], acceptance: 'Una recepció parcial manté el saldo pendent. Només la part rebuda passa a qualitat. Una recepció incorrecta es bloqueja i genera una reclamació identificable.' },
  { id: 'HU-07', role: 'tècnic de qualitat', need: 'avaluar cada lot d’argila o esmalt amb els criteris de la fitxa tècnica vigent', benefit: 'alliberar només material acceptat i deixar constància de la decisió', differential: true, differentialReason: 'Cal associar a cada tipus de matèria primera una versió de fitxa, els criteris aplicables i els resultats de la mostra. No n’hi ha prou amb un camp genèric «acceptat/rebutjat». Els paràmetres i límits concrets els ha de validar qualitat.', steps: '07', taskRefs: ['quality','quality_pending','reject'], acceptance: 'Es conserva la versió de fitxa usada i el resultat de cada criteri. Un resultat pendent bloqueja el lot. Completar les proves torna a obrir la decisió d’acceptació.' },
  { id: 'HU-08', role: 'responsable de magatzem', need: 'confirmar la quantitat acceptada i la ubicació abans que el material figure disponible', benefit: 'mantindre les existències al dia i avisar producció amb una sola confirmació', differential: false, steps: '08', taskRefs: ['locate','register'], acceptance: 'L’operari confirma quantitat i ubicació. Després s’actualitza l’estoc i s’envia l’avís una sola vegada. Un lot pendent o rebutjat no es pot donar d’alta com a utilitzable.' },
  { id: 'HU-09', role: 'planificador de producció', need: 'assignar el material disponible a la necessitat confirmada', benefit: 'evitar que la mateixa quantitat es prometa a dues ordres diferents', differential: false, steps: '02', taskRefs: ['reserve','reserve_partial'], acceptance: 'La reserva queda vinculada a una necessitat. La comprovació de reposició considera la disponibilitat projectada després del consum previst i les entrades ja confirmades.' },
  { id: 'HU-10', role: 'comprador', need: 'obtenir una comanda amb les condicions de l’oferta seleccionada i la petició aprovada', benefit: 'enviar al proveïdor una ordre coherent sense tornar a copiar les dades', differential: false, steps: '04', taskRefs: ['order'], acceptance: 'L’emissió exigeix petició aprovada i oferta adequada. Es conserva la relació entre petició, oferta i comanda, i s’evita una segona emissió de la mateixa ordre.' },
  { id: 'HU-11', role: 'responsable de compres', need: 'registrar la resposta a un retard i controlar les quantitats que es substitueixen per un altre proveïdor', benefit: 'recuperar el subministrament sense deixar dues comandes obertes per a la mateixa necessitat', differential: false, steps: '05', taskRefs: ['delay_response','cancel_order'], acceptance: 'Reclamar o replanificar torna a comprovar la data. Canviar de proveïdor exigeix resoldre el saldo substituït de la comanda original i enllaçar la nova compra.' },
]

export const erpTasks = [
  { id:'need', label:'Registrar necessitat i versió del pla', owner:'Producció', kind:'Tasca d’usuari', step:'01' },
  { id:'calculate', label:'Calcular disponibilitat i proposta de reposició', owner:'Magatzem / ERP', kind:'Tasca de servei', step:'02' },
  { id:'reserve_partial', label:'Reservar la part disponible quan hi ha una falta', owner:'Producció / ERP', kind:'Tasca de servei', step:'02' },
  { id:'reserve', label:'Reservar material per a la necessitat', owner:'Producció / ERP', kind:'Tasca de servei', step:'02' },
  { id:'request', label:'Revisar i decidir la petició', owner:'Responsable autoritzador de compres', kind:'Tasca d’usuari', step:'03' },
  { id:'request_correction', label:'Corregir la petició retornada', owner:'Producció i magatzem', kind:'Tasca d’usuari', step:'03' },
  { id:'request_rejected', label:'Notificar el rebuig amb el motiu', owner:'Compres', kind:'Tasca d’usuari', step:'03' },
  { id:'supplier', label:'Comparar i seleccionar una oferta adequada', owner:'Compres', kind:'Tasca d’usuari', step:'04' },
  { id:'order', label:'Emetre la comanda aprovada', owner:'Compres / ERP', kind:'Tasca de servei', step:'04' },
  { id:'eta', label:'Contrastar dates i avisar les ordres afectades', owner:'Compres i producció / ERP', kind:'Tasca de servei', step:'05' },
  { id:'delay_response', label:'Decidir la resposta al retard', owner:'Compres i producció', kind:'Tasca d’usuari', step:'05' },
  { id:'cancel_order', label:'Resoldre el saldo de la comanda substituïda', owner:'Compres', kind:'Tasca d’usuari', step:'05' },
  { id:'receive', label:'Registrar el lliurament contra comanda', owner:'Magatzem', kind:'Tasca d’usuari', step:'06' },
  { id:'partial', label:'Registrar quantitat rebuda i saldo pendent', owner:'Magatzem', kind:'Tasca d’usuari', step:'06' },
  { id:'qty_issue', label:'Bloquejar una recepció incorrecta i reclamar', owner:'Magatzem i compres', kind:'Tasca d’usuari', step:'06' },
  { id:'quality', label:'Inspeccionar el lot segons la fitxa tècnica', owner:'Qualitat', kind:'Tasca d’usuari', step:'07' },
  { id:'quality_pending', label:'Completar proves amb el lot bloquejat', owner:'Qualitat', kind:'Tasca d’usuari', step:'07' },
  { id:'reject', label:'Bloquejar el lot rebutjat i obrir la reclamació', owner:'Qualitat i compres', kind:'Tasca d’usuari', step:'07' },
  { id:'locate', label:'Confirmar quantitat acceptada i ubicació', owner:'Magatzem', kind:'Tasca d’usuari', step:'08' },
  { id:'register', label:'Actualitzar existències i avisar producció', owner:'Magatzem / ERP', kind:'Tasca de servei', step:'08' },
]

export const differentialData = [
  { name:'Versió de la fitxa d’acceptació per argila o esmalt', fields:'Material, versió, vigència i criteris aplicables', use:'Permet saber amb quina especificació s’ha acceptat o rebutjat cada lot. És una configuració específica de qualitat que cal verificar.', stories:'HU-07', source:'Fitxa tècnica validada per qualitat' },
  { name:'Criteris i resultats de la mostra del lot', fields:'Criteri, unitat si correspon, límit admés, resultat i evidència', use:'Conserva el detall que fonamenta la decisió. Els valors i límits no estan inventats: els ha de definir qualitat per a cada material.', stories:'HU-07', source:'Inspecció del lot i fitxa vigent' },
  { name:'Dependència entre lot o lliurament i ordre de fabricació', fields:'Lot/comanda, ordre afectada, quantitat, data requerida i causa del risc', use:'Permet concretar l’impacte d’un retard o bloqueig sobre la fabricació. Cal comprovar la relació entre els mòduls de qualitat, compres i planificació.', stories:'HU-05 · HU-07', source:'Planificació i assignació de material' },
]
