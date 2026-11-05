import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { erpTasks, userStories } from '../src/practice4Content.js'

const directory = join(process.cwd(), 'public', 'models')
mkdirSync(directory, { recursive: true })

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const node = (id, type, name, x, y, width = 164, height = 82) => ({ id, type, name, x, y, width, height })
const flow = (id, source, target, name = '', points = null) => ({ id, source, target, name, points })

const asIs = {
  id: 'AS_IS', name: 'Aprovisionament actual',
  nodes: [
    node('start', 'startEvent', 'Necessitat de material', 40, 292, 36, 36),
    node('need', 'userTask', 'Identificar necessitats', 130, 270),
    node('stock', 'userTask', 'Comprovar full d’estoc', 345, 270),
    node('stock_ok', 'exclusiveGateway', 'Hi ha estoc?', 560, 286, 50, 50),
    node('stock_end', 'endEvent', 'Material disponible', 677, 104, 36, 36),
    node('request', 'userTask', 'Preparar sol·licitud', 675, 270),
    node('order', 'userTask', 'Triar proveïdor i fer comanda', 890, 270),
    node('follow', 'userTask', 'Seguir lliurament', 1105, 270),
    node('receive', 'userTask', 'Rebre material', 1320, 270),
    node('qty_ok', 'exclusiveGateway', 'Quantitat correcta?', 1535, 286, 50, 50),
    node('qty_issue', 'userTask', 'Comunicar diferència', 1650, 85),
    node('qty_end', 'endEvent', 'Pendent de regularitzar', 1865, 108, 36, 36),
    node('quality', 'userTask', 'Comprovar qualitat', 1650, 270),
    node('quality_ok', 'exclusiveGateway', 'Lot acceptat?', 1865, 286, 50, 50),
    node('reject', 'userTask', 'Comunicar rebuig', 1980, 85),
    node('reject_end', 'endEvent', 'Lot rebutjat', 2195, 108, 36, 36),
    node('quality_pending', 'userTask', 'Mantindre en revisió', 1980, 465),
    node('quality_pending_end', 'endEvent', 'Pendent de qualitat', 2195, 488, 36, 36),
    node('register', 'userTask', 'Registrar entrada al full', 1980, 270),
    node('end', 'endEvent', 'Material disponible', 2195, 293, 36, 36),
  ],
  flows: [
    flow('f1', 'start', 'need'), flow('f2', 'need', 'stock'), flow('f3', 'stock', 'stock_ok'),
    flow('f4', 'stock_ok', 'stock_end', 'Sí'), flow('f5', 'stock_ok', 'request', 'No'),
    flow('f6', 'request', 'order'), flow('f7', 'order', 'follow'), flow('f8', 'follow', 'receive'),
    flow('f9', 'receive', 'qty_ok'), flow('f10', 'qty_ok', 'qty_issue', 'No'), flow('f11', 'qty_issue', 'qty_end'),
    flow('f12', 'qty_ok', 'quality', 'Sí'), flow('f13', 'quality', 'quality_ok'),
    flow('f14', 'quality_ok', 'reject', 'No'), flow('f15', 'reject', 'reject_end'),
    flow('f18', 'quality_ok', 'quality_pending', 'Revisar'), flow('f19', 'quality_pending', 'quality_pending_end'),
    flow('f16', 'quality_ok', 'register', 'Sí'), flow('f17', 'register', 'end'),
  ],
}

const toBe = {
  id: 'TO_BE', name: 'Aprovisionament millorat',
  nodes: [
    node('start', 'startEvent', 'Necessitat identificada', 40, 292, 36, 36),
    node('need', 'userTask', 'Registrar necessitat al pla (ERP)', 130, 270),
    node('calculate', 'serviceTask', 'Calcular estoc i reposició (ERP)', 345, 270),
    node('stock_ok', 'exclusiveGateway', 'Disponible suficient?', 560, 286, 50, 50),
    node('reserve', 'serviceTask', 'Reservar material (ERP)', 675, 85),
    node('reorder_check', 'exclusiveGateway', 'Cal reposar?', 890, 101, 50, 50),
    node('stock_end', 'endEvent', 'Necessitat coberta', 1100, 108, 36, 36),
    node('request', 'userTask', 'Revisar sol·licitud (ERP)', 1005, 270),
    node('approval_ok', 'exclusiveGateway', 'Decisió?', 1220, 286, 50, 50),
    node('request_correction', 'userTask', 'Corregir petició (ERP)', 1335, 475),
    node('request_rejected', 'userTask', 'Notificar rebuig (ERP)', 1335, 85),
    node('request_end', 'endEvent', 'Petició rebutjada', 1550, 108, 36, 36),
    node('supplier', 'userTask', 'Comparar ofertes (ERP)', 1335, 270),
    node('order', 'serviceTask', 'Emetre comanda (ERP)', 1550, 270),
    node('eta', 'serviceTask', 'Seguir data i avisar ordres afectades (ERP)', 1765, 270),
    node('date_ok', 'exclusiveGateway', 'Arriba a temps?', 1980, 286, 50, 50),
    node('delay_response', 'userTask', 'Reclamar, buscar alternativa o replanificar (ERP)', 2095, 475, 178, 82),
    node('alternative_needed', 'exclusiveGateway', 'Canvi de proveïdor?', 2300, 491, 50, 50),
    node('receive', 'userTask', 'Registrar recepció contra comanda (ERP)', 2200, 270),
    node('qty_ok', 'exclusiveGateway', 'Recepció?', 2415, 286, 50, 50),
    node('qty_issue', 'userTask', 'Bloquejar i reclamar (ERP)', 2530, 85),
    node('qty_end', 'endEvent', 'Incidència derivada', 2745, 108, 36, 36),
    node('partial', 'userTask', 'Registrar part rebuda i saldo pendent (ERP)', 2530, 475),
    node('quality', 'userTask', 'Inspeccionar lot (ERP)', 2630, 270),
    node('quality_ok', 'exclusiveGateway', 'Decisió de qualitat?', 2845, 286, 50, 50),
    node('reject', 'userTask', 'Bloquejar lot, avisar ordres i reclamar (ERP)', 2960, 85),
    node('reject_end', 'endEvent', 'Lot rebutjat', 3175, 108, 36, 36),
    node('quality_pending', 'userTask', 'Bloquejar lot, avisar ordres i completar proves (ERP)', 2960, 475),
    node('register', 'serviceTask', 'Actualitzar estoc i avisar (ERP)', 2960, 270),
    node('end', 'endEvent', 'Material acceptat registrat', 3175, 293, 36, 36),
  ],
  flows: [
    flow('f1', 'start', 'need'), flow('f2', 'need', 'calculate'), flow('f3', 'calculate', 'stock_ok'),
    flow('f4', 'stock_ok', 'reserve', 'Sí'), flow('f5', 'reserve', 'reorder_check'),
    flow('f6', 'reorder_check', 'stock_end', 'No'), flow('f7', 'reorder_check', 'request', 'Sí'),
    flow('f8', 'stock_ok', 'request', 'No'), flow('f9', 'request', 'approval_ok'),
    flow('f10', 'approval_ok', 'supplier', 'Aprovar'),
    flow('f11', 'approval_ok', 'request_correction', 'Corregir'),
    flow('f12', 'request_correction', 'request', '', [[1417, 557], [1417, 610], [1087, 610], [1087, 352]]),
    flow('f13', 'approval_ok', 'request_rejected', 'Rebutjar'), flow('f14', 'request_rejected', 'request_end'),
    flow('f15', 'supplier', 'order'), flow('f16', 'order', 'eta'), flow('f17', 'eta', 'date_ok'),
    flow('f18', 'date_ok', 'receive', 'Sí'), flow('f19', 'date_ok', 'delay_response', 'No'),
    flow('f20', 'delay_response', 'alternative_needed'),
    flow('f21', 'alternative_needed', 'eta', 'Reclamar o replanificar', [[2300, 516], [2300, 665], [1847, 665], [1847, 352]]),
    flow('f22', 'alternative_needed', 'supplier', 'Alternativa', [[2325, 541], [2325, 730], [1505, 730], [1505, 311], [1499, 311]]),
    flow('f23', 'receive', 'qty_ok'), flow('f24', 'qty_ok', 'quality', 'Completa'),
    flow('f25', 'qty_ok', 'partial', 'Parcial'), flow('f26', 'partial', 'quality'),
    flow('f27', 'qty_ok', 'qty_issue', 'Incidència'), flow('f28', 'qty_issue', 'qty_end'),
    flow('f29', 'quality', 'quality_ok'), flow('f30', 'quality_ok', 'register', 'Acceptar'),
    flow('f31', 'quality_ok', 'quality_pending', 'Revisar'),
    flow('f32', 'quality_pending', 'quality', '', [[3042, 557], [3042, 790], [2712, 790], [2712, 352]]),
    flow('f33', 'quality_ok', 'reject', 'Rebutjar'), flow('f34', 'reject', 'reject_end'),
    flow('f35', 'register', 'end'),
  ],
}

// Additional decisions and the human confirmation before stock is updated.
for (const item of toBe.nodes) {
  if (item.x >= 1550) item.x += 250
}
for (const edge of toBe.flows) {
  if (edge.points) edge.points = edge.points.map(([x,y]) => [x >= 1550 ? x + 250 : x, y])
}
toBe.nodes.push(node('offer_ok', 'exclusiveGateway', 'Oferta adequada?', 1550, 286, 50, 50))
const supplierFlow = toBe.flows.find((edge) => edge.id === 'f15')
supplierFlow.target = 'offer_ok'
toBe.flows.push(flow('f36','offer_ok','order','Sí'))
toBe.flows.push(flow('f37','offer_ok','supplier','No',[[1575,336],[1575,430],[1417,430],[1417,352]]))

// Keep usable stock assigned even when it does not cover the complete need.
toBe.nodes.push(node('reserve_partial','serviceTask','Reservar part disponible (ERP)',675,475))
toBe.flows.find((edge) => edge.id === 'f8').target = 'reserve_partial'
toBe.flows.push(flow('f38','reserve_partial','request'))

// Replacing a supplier must resolve the outstanding quantity of the original order.
toBe.nodes.push(node('cancel_order','userTask','Resoldre saldo original i vincular substitució (ERP)',1800,850))
const alternative = toBe.flows.find((edge) => edge.id === 'f22')
alternative.target = 'cancel_order'
alternative.name = 'Sí'
alternative.points = [[2575,541],[2575,891],[1964,891]]
toBe.flows.find((edge) => edge.id === 'f21').name = 'No: reclamar o replanificar'
toBe.flows.push(flow('f39','cancel_order','supplier','',[[1800,891],[1505,891],[1505,311],[1499,311]]))

const register = toBe.nodes.find((item) => item.id === 'register')
const locate = { ...register, id:'locate', type:'userTask', name:'Confirmar quantitat i ubicació (ERP)' }
register.x += 215
toBe.nodes.push(locate)
toBe.nodes.find((item) => item.id === 'end').x += 215
toBe.flows.find((edge) => edge.id === 'f30').target = 'locate'
toBe.flows.push(flow('f40','locate','register'))
toBe.nodes.find((item) => item.id === 'date_ok').name = 'Data compatible amb el pla?'
toBe.nodes.find((item) => item.id === 'calculate').name = 'Calcular disponible i proposta (ERP)'
toBe.nodes.find((item) => item.id === 'reorder_check').name = 'Reposició projectada?'

// Responsibility and requirement references remain inside the editable BPMN file.
for (const item of toBe.nodes) {
  const task = erpTasks.find((entry) => entry.id === item.id)
  if (task) {
    const stories = userStories.filter((story) => story.taskRefs.includes(item.id)).map((story) => story.id)
    item.documentation = `Responsable: ${task.owner}. Tipus: ${task.kind}. Pas: ${task.step}. Requisits: ${stories.join(', ')}.`
  }
}

// A single company process owns all sequence flows. The supplier is an
// external, black-box participant connected only through message flows.
function arrange(model) {
  const improved = model.id === 'TO_BE'
  const laneSpecs = improved
    ? [['production','Producció',180],['purchasing','Compres',400],['warehouse','Magatzem',340],['quality','Qualitat',360],['erp','Suport ERP',400]]
    : [['production','Producció',180],['purchasing','Compres',220],['warehouse','Magatzem',300],['quality','Qualitat',360]]
  let top = 40
  model.lanes = laneSpecs.map(([id,name,height]) => {
    const lane = { id:'Lane_' + id, key:id, name, y:top, height }
    top += height
    return lane
  })
  // The row indicates a branch within the same responsible area.
  const positions = improved ? {
    start:['production',140], need:['production',230], request_correction:['production',1620],
    request:['purchasing',1390], approval_ok:['purchasing',1620],
    request_rejected:['purchasing',1850,'upper'], request_end:['purchasing',2080,'upper'],
    supplier:['purchasing',1850], offer_ok:['purchasing',2080],
    delay_response:['purchasing',2770], alternative_needed:['purchasing',3000], cancel_order:['purchasing',3000,'upper'],
    receive:['warehouse',3000], qty_ok:['warehouse',3230], partial:['warehouse',3460,'lower'],
    qty_issue:['warehouse',3460,'upper'], qty_end:['warehouse',3690,'upper'], locate:['warehouse',4150], end:['warehouse',4610],
    quality:['quality',3690], quality_ok:['quality',3920], quality_pending:['quality',3920,'lower'],
    reject:['quality',4150,'upper'], reject_end:['quality',4380,'upper'],
    calculate:['erp',500], stock_ok:['erp',740], reserve:['erp',920,'upper'], reorder_check:['erp',1160,'upper'],
    stock_end:['erp',1390,'upper'], reserve_partial:['erp',920,'lower'],
    order:['erp',2310], eta:['erp',2540], date_ok:['erp',2770], register:['erp',4380],
  } : {
    start:['production',140], need:['production',230],
    request:['purchasing',840], order:['purchasing',1060], follow:['purchasing',1280],
    stock:['warehouse',455], stock_ok:['warehouse',660], stock_end:['warehouse',840,'upper'],
    receive:['warehouse',1500], qty_ok:['warehouse',1710], qty_issue:['warehouse',1930,'upper'], qty_end:['warehouse',2140,'upper'],
    register:['warehouse',2350], end:['warehouse',2570],
    quality:['quality',1930], quality_ok:['quality',2140], reject:['quality',2350,'upper'], reject_end:['quality',2570,'upper'],
    quality_pending:['quality',2350,'lower'], quality_pending_end:['quality',2570,'lower'],
  }
  for (const item of model.nodes) {
    const position = positions[item.id]
    if (!position) throw new Error('Falta el carril de ' + item.id)
    const [key,x,row='middle'] = position
    const lane = model.lanes.find((entry) => entry.key === key)
    const centerY = row === 'upper' ? lane.y + 65 : row === 'lower' ? lane.y + lane.height - 65 : lane.y + lane.height / 2
    Object.assign(item,{ x, y:centerY - item.height / 2, lane:lane.id })
  }
  model.pool = { x:40, y:40, width:Math.max(...model.nodes.map((item) => item.x + item.width)) + 90 - 40, height:top - 40 }
  model.supplier = { x:40, y:top + 130, width:model.pool.width, height:90 }
  // Distribute the supplier connection points underneath the relevant tasks.
  model.messages = [
    { id:'Message_order', source:'order', target:'Supplier', name:'Comanda' },
    { id:'Message_date', source:'Supplier', target:improved ? 'eta' : 'follow', name:'Confirmació de data' },
    { id:'Message_delivery', source:'Supplier', target:'receive', name:'Albarà i avís de lliurament' },
  ]
}
arrange(asIs)
arrange(toBe)

function waypoints(source, target, model) {
  const sx = source.x + source.width / 2
  const sy = source.y + source.height / 2
  const tx = target.x + target.width / 2
  const ty = target.y + target.height / 2
  // Return loops use a free corridor at the bottom of the source lane.
  if (target.x < source.x) {
    const lane = model.lanes.find((item) => item.id === source.lane)
    const gutter = lane.y + lane.height - 16
    return [[sx,source.y + source.height],[sx,gutter],[target.x - 28,gutter],[target.x - 28,ty],[target.x,ty]]
  }
  if (Math.abs(sy - ty) < 1) return [[source.x + source.width,sy],[target.x,ty]]
  // Nodes that share a column connect vertically, across lane boundaries.
  if (target.x < source.x + source.width && source.x < target.x + target.width) {
    const down = ty > sy
    const startY = down ? source.y + source.height : source.y
    const endY = down ? target.y : target.y + target.height
    const middleY = (startY + endY) / 2
    return [[sx,startY],[sx,middleY],[tx,middleY],[tx,endY]]
  }
  const candidates = [(source.x + source.width + target.x) / 2, target.x - 28, source.x + source.width + 28]
  for (const middleX of candidates) {
    const points = [[source.x + source.width,sy],[middleX,sy],[middleX,ty],[target.x,ty]]
    const crossesTask = model.nodes.some((item) => {
      if (item === source || item === target) return false
      return points.slice(1).some(([x2,y2],index) => {
        const [x1,y1] = points[index]
        return x1 === x2 && item.x < x1 && x1 < item.x + item.width && Math.min(y1,y2) < item.y + item.height && Math.max(y1,y2) > item.y ||
          y1 === y2 && item.y < y1 && y1 < item.y + item.height && Math.min(x1,x2) < item.x + item.width && Math.max(x1,x2) > item.x
      })
    })
    if (!crossesTask) return points
  }
  throw new Error('Cal revisar la connexió entre ' + source.id + ' i ' + target.id)
}

function labelBounds(item) {
  const width = item.type.endsWith('Event') ? 120 : 140
  return `<bpmndi:BPMNLabel><dc:Bounds x="${item.x + item.width / 2 - width / 2}" y="${item.y + item.height + 8}" width="${width}" height="30" /></bpmndi:BPMNLabel>`
}

function sequenceLabel(points, name, model) {
  if (!name) return ''
  const width = Math.min(190, Math.max(24, name.length * 6 + 12))
  const height = 26
  const clear = (x,y) => !model.nodes.some((node) => x < node.x + node.width && x + width > node.x && y < node.y + node.height && y + height > node.y)
  const segments = points.slice(1).map((point,index) => [points[index],point])
  const horizontal = segments.filter(([[x1,y1],[x2,y2]]) => y1 === y2 && Math.abs(x2-x1) > width + 12).sort((a,b) => Math.abs(b[1][0]-b[0][0])-Math.abs(a[1][0]-a[0][0]))
  const candidates = horizontal.flatMap(([[x1,y1],[x2]]) => [[(x1+x2-width)/2,y1-height-4],[(x1+x2-width)/2,y1+4]])
  candidates.push(...segments.filter(([[x1,y1],[x2,y2]]) => x1 === x2 && Math.abs(y2-y1) > height + 12).map(([[x1,y1],[,y2]]) => [x1+8,(y1+y2-height)/2]))
  const [x,y] = candidates.find(([x,y]) => clear(x,y)) || [points[0][0]+8,points[0][1]-30]
  return `<bpmndi:BPMNLabel><dc:Bounds x="${x}" y="${y}" width="${width}" height="${height}" /></bpmndi:BPMNLabel>`
}

function build(model) {
  const incoming = new Map(model.nodes.map((item) => [item.id, []]))
  const outgoing = new Map(model.nodes.map((item) => [item.id, []]))
  for (const edge of model.flows) {
    outgoing.get(edge.source).push(edge.id)
    incoming.get(edge.target).push(edge.id)
  }
  const lanes = `<bpmn:laneSet id="LaneSet_${model.id}">${model.lanes.map((lane) => `<bpmn:lane id="${lane.id}" name="${escape(lane.name)}">${model.nodes.filter((item) => item.lane === lane.id).map((item) => `<bpmn:flowNodeRef>${item.id}</bpmn:flowNodeRef>`).join('')}</bpmn:lane>`).join('')}</bpmn:laneSet>`
  const elements = model.nodes.map((item) => `    <bpmn:${item.type} id="${item.id}" name="${escape(item.name)}">\n${item.documentation ? `      <bpmn:documentation>${escape(item.documentation)}</bpmn:documentation>\n` : ''}${incoming.get(item.id).map((id) => `      <bpmn:incoming>${id}</bpmn:incoming>`).join('\n')}\n${outgoing.get(item.id).map((id) => `      <bpmn:outgoing>${id}</bpmn:outgoing>`).join('\n')}\n    </bpmn:${item.type}>`).join('\n')
  const sequences = model.flows.map((edge) => `    <bpmn:sequenceFlow id="${edge.id}" sourceRef="${edge.source}" targetRef="${edge.target}"${edge.name ? ` name="${escape(edge.name)}"` : ''} />`).join('\n')
  const shapes = model.nodes.map((item) => `      <bpmndi:BPMNShape id="${item.id}_di" bpmnElement="${item.id}"${item.type === 'exclusiveGateway' ? ' isMarkerVisible="true"' : ''}><dc:Bounds x="${item.x}" y="${item.y}" width="${item.width}" height="${item.height}" />${item.type.endsWith('Event') || item.type === 'exclusiveGateway' ? labelBounds(item) : ''}</bpmndi:BPMNShape>`).join('\n')
  const edges = model.flows.map((edge) => {
    const source = model.nodes.find((item) => item.id === edge.source)
    const target = model.nodes.find((item) => item.id === edge.target)
    const points = waypoints(source, target, model).map(([x, y]) => `<di:waypoint x="${x}" y="${y}" />`).join('')
    const label = sequenceLabel(waypoints(source,target,model),edge.name,model)
    return `      <bpmndi:BPMNEdge id="${edge.id}_di" bpmnElement="${edge.id}">${points}${label}</bpmndi:BPMNEdge>`
  }).join('\n')
  const poolShape = `<bpmndi:BPMNShape id="Participant_${model.id}_di" bpmnElement="Participant_${model.id}" isHorizontal="true"><dc:Bounds x="${model.pool.x}" y="${model.pool.y}" width="${model.pool.width}" height="${model.pool.height}" /></bpmndi:BPMNShape>`
  const laneShapes = model.lanes.map((lane) => `<bpmndi:BPMNShape id="${lane.id}_di" bpmnElement="${lane.id}" isHorizontal="true"><dc:Bounds x="${model.pool.x + 30}" y="${lane.y}" width="${model.pool.width - 30}" height="${lane.height}" /></bpmndi:BPMNShape>`).join('\n')
  const supplierShape = `<bpmndi:BPMNShape id="Supplier_di" bpmnElement="Supplier" isHorizontal="true"><dc:Bounds x="${model.supplier.x}" y="${model.supplier.y}" width="${model.supplier.width}" height="${model.supplier.height}" /></bpmndi:BPMNShape>`
  const messageEdges = model.messages.map((message,index) => {
    const task = model.nodes.find((item) => item.id === (message.source === 'Supplier' ? message.target : message.source))
    const x = task.x + task.width / 2
    const taskY = task.y + task.height
    const supplierY = model.supplier.y
    const fromY = message.source === 'Supplier' ? supplierY : taskY
    const toY = message.source === 'Supplier' ? taskY : supplierY
    const labelY = model.supplier.y - 100 + index * 27
    return `<bpmndi:BPMNEdge id="${message.id}_di" bpmnElement="${message.id}"><di:waypoint x="${x}" y="${fromY}" /><di:waypoint x="${x}" y="${toY}" /><bpmndi:BPMNLabel><dc:Bounds x="${x + 10}" y="${labelY}" width="150" height="24" /></bpmndi:BPMNLabel></bpmndi:BPMNEdge>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_${model.id}" targetNamespace="https://nexe.example/processos">
  <bpmn:process id="Process_${model.id}" name="${escape(model.name)}" isExecutable="false">
${lanes}
${elements}
${sequences}
  </bpmn:process>
  <bpmn:collaboration id="Collaboration_${model.id}">
    <bpmn:participant id="Participant_${model.id}" name="Ceràmica Riu Sec" processRef="Process_${model.id}" />
    <bpmn:participant id="Supplier" name="Proveïdors" />
${model.messages.map((message) => `    <bpmn:messageFlow id="${message.id}" name="${escape(message.name)}" sourceRef="${message.source}" targetRef="${message.target}" />`).join('\n')}
  </bpmn:collaboration>
  <bpmndi:BPMNDiagram id="Diagram_${model.id}">
    <bpmndi:BPMNPlane id="Plane_${model.id}" bpmnElement="Collaboration_${model.id}">
${poolShape}
${laneShapes}
${supplierShape}
${shapes}
${edges}
${messageEdges}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`
}

writeFileSync(join(directory, 'as-is.bpmn'), build(asIs))
writeFileSync(join(directory, 'to-be.bpmn'), build(toBe))
