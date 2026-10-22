export const analysis = [
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
    improvement: 'Usar una sol·licitud única amb aprovació segons import i tipus de compra. Assignar responsable i termini, avisar dels retards i simplificar el circuit per a compres habituals ja autoritzades.',
    category: '1.a · Revisar; 2.b · Resoldre colls d’ampolla; 4.a · Adaptar el programari',
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
    improvement: 'Registrar en el moment de l’arribada recepcions completes, parcials o amb incidència contra la comanda. Evitar copiar manualment les dades de l’albarà i avisar compres de les diferències.',
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
    improvement: 'Fixar criteris d’acceptació i terminis de revisió. Mantindre el lot bloquejat fins a la decisió, prioritzar els que afecten la fabricació i compartir l’estat amb producció i compres.',
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
    change: 'Aplicar l’estratègia de fabricar segons la demanda prevista: definir mínims d’estoc i punts de reposició per material segons els terminis dels proveïdors i la capacitat del magatzem.',
    reason: 'Ajuda a ajustar les compres a la demanda prevista sense acumular material innecessari ni deixar la producció sense subministrament.',
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
  { id: 'HU-01', role: 'planificador de producció', need: 'saber quines matèries primeres requereix cada versió del pla i en quina data', benefit: 'comunicar els canvis a compres abans que afecten la fabricació', task: 'Tasca d’usuari', differential: false, steps: '01' },
  { id: 'HU-02', role: 'responsable de magatzem', need: 'conéixer la quantitat que es pot utilitzar i quan caldrà reposar cada material', benefit: 'demanar només allò que falta i evitar ruptures d’estoc', task: 'Tasca de servei', differential: false, steps: '02' },
  { id: 'HU-03', role: 'responsable de compres', need: 'rebre sol·licituds amb l’estat de l’aprovació i un avís si s’esgota el termini', benefit: 'tramitar les compres sense perdre peticions', task: 'Tasca d’usuari', differential: false, steps: '03' },
  { id: 'HU-04', role: 'comprador', need: 'comparar les ofertes segons el preu, el termini i les especificacions', benefit: 'triar un proveïdor adequat i justificar la decisió', task: 'Tasca d’usuari', differential: false, steps: '04' },
  { id: 'HU-05', role: 'planificador de producció', need: 'saber quines ordres de fabricació quedarien afectades per un lliurament tardà o un lot bloquejat', benefit: 'decidir a temps si cal reclamar, buscar una alternativa o replanificar', task: 'Tasca de servei', differential: true, differentialReason: 'Relaciona cada retard i cada lot bloquejat amb les ordres de fabricació afectades. Cal comprovar si el producte ERP ofereix aquesta relació entre compres, qualitat i producció.', steps: '05 · 07' },
  { id: 'HU-06', role: 'operari de magatzem', need: 'distingir la part rebuda de la que encara falta i registrar qualsevol diferència', benefit: 'continuar el control de la quantitat rebuda sense tancar la comanda pendent', task: 'Tasca d’usuari', differential: false, steps: '06' },
  { id: 'HU-07', role: 'tècnic de qualitat', need: 'decidir si cada lot d’argila o esmalt compleix la fitxa tècnica vigent', benefit: 'mantindre bloquejat el material pendent o rebutjat i alliberar només l’acceptat', task: 'Tasca d’usuari', differential: true, differentialReason: 'Exigeix aplicar criteris d’acceptació segons el tipus de matèria primera i la versió de la seua fitxa tècnica, i traslladar el resultat a la disponibilitat per a producció.', steps: '07' },
  { id: 'HU-08', role: 'responsable de magatzem', need: 'veure les existències actualitzades i avisar producció quan es confirme la ubicació d’un lot acceptat', benefit: 'disposar de la mateixa dada sense repetir el registre manual', task: 'Tasca de servei', differential: false, steps: '08' },
]

export const differentialData = [
  { name: 'Ordres de fabricació afectades per un lot o lliurament', use: 'Relaciona la data requerida, la comanda i l’estat del lot amb les ordres que podrien quedar sense matèria primera. No és una dada bàsica de la fitxa del producte.', stories: 'HU-05' },
  { name: 'Criteris d’acceptació per matèria primera i versió de fitxa', use: 'Permet aplicar al lot els criteris vigents per a l’argila o l’esmalt rebut. Cal verificar si l’ERP pot guardar-los i usar-los en la decisió de qualitat.', stories: 'HU-07' },
]
