# Revisió de la pràctica 4

Revisió de la V01 amb l’enunciat de 10 pàgines, inclosos els annexos de bpmn.io i Camunda Web Modeler. Es manté el procés d’aprovisionament de matèries primeres de Ceràmica Riu Sec.

## Primera sessió: anàlisi i propostes

L’enunciat (pàgines 2 i 3) demana analitzar cada activitat abans de resumir-la en una taula. S’han d’identificar problemes, possible insatisfacció i punts de decisió, i justificar millores de les quatre categories.

La V01 ja tenia les huit activitats, els responsables, els problemes i les decisions. Ara inclou:

- Valoració textual de cada activitat abans de la taula.
- Millora i justificació explícita en cada activitat.
- Taula final amb problema, decisió, millora i categoria.
- Quatre categories de millora amb justificació global.
- El pas de compra reactiva a reposició planificada com a canvi estratègic proposat. És una hipòtesi de la proposta que cal validar amb direcció, no una ampliació de fàbrica que es done per feta.

On és: **Procés actual**, **Problemes detectats** i **Proposta de millora → Millores proposades**.

La insatisfacció està expressada com a possible conseqüència del procés. No s’han fet passar entrevistes inventades per testimonis reals.

## Segona sessió: model millorat

L’enunciat (pàgines 3 i 4) demana un model TO-BE en BPMN 2.0 coherent amb les millores i que identifique el suport ERP.

S’han revisat aquests recorreguts:

- Petició retornada: correcció i nova revisió. Petició rebutjada: tancament amb motiu.
- Falta d’estoc: reserva de la part disponible i compra de la necessitat pendent.
- Estoc suficient: comprovació independent de la necessitat de reposar.
- Cap oferta adequada: nova cerca abans d’emetre la comanda.
- Retard: reclamació o replanificació, o substitució amb resolució del saldo original.
- Recepció parcial: la part rebuda passa a qualitat i el saldo queda pendent en la comanda. El lliurament posterior genera una altra recepció.
- Lot pendent: bloqueig i retorn a inspecció quan es completen les proves.
- Material acceptat: confirmació humana de quantitat i ubicació, seguida del servei d’actualització d’estoc i avís.

Les incidències no conformes es deriven a reclamació. La resolució comercial de reclamacions i devolucions queda fora del recorregut principal i no es confon amb material disponible.

On és: **Proposta de millora → Model TO-BE** i **Responsables i suport ERP**. La taula i la documentació del BPMN identifiquen qui executa cada tasca i les HU associades.

## Tercera sessió: requisits i presentació

L’enunciat (pàgines 4, 5 i 7) demana històries d’usuari, dades diferencials i una presentació de dues pàgines.

La revisió deixa:

- 11 HU en format perfil, necessitat i benefici.
- Un criteri de comprovació i tasques del TO-BE associades a cada HU.
- 20 tasques ERP cobertes per les HU, amb distinció entre tasques d’usuari i de servei.
- HU-05 i HU-07 com a particularitats a verificar, amb justificació concreta. Reserves, punts de reposició i ofertes no s’etiqueten com a diferencials.
- Taula de dades de qualitat i dependència amb fabricació, amb camps, origen i HU. Els criteris i límits tècnics concrets els ha de definir qualitat.
- Presentació actualitzada de dues diapositives amb problemes, millores i les 11 HU.

On és: **Requisits ERP** i **Documents i fonts**.

El text de l’enunciat esmenta user tasks, service tasks i script tasks com a tipus de tasques que poden donar lloc a requisits. No obliga a inventar una tasca de script quan l’automatització proposada es resol amb serveis ERP.

## Què queda per fer en classe

- Validar amb el grup i la professora la proposta de política de reposició i l’abast dels requisits específics.
- Fer la posada en comú de les dues diapositives.
- Incorporar qualsevol canvi acordat en la validació. Els valors inicials dels indicadors i les entrevistes continuen pendents si es volen presentar com a dades reals.

La selecció del producte ERP i una implantació amb resultats mesurats no es donen per fetes en aquesta pràctica.
