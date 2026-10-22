import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const directory = join(process.cwd(), 'public', 'models')
mkdirSync(directory, { recursive: true })

const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const node = (id, type, name, x, y, width = 164, height = 82) => ({ id, type, name, x, y, width, height })
const flow = (id, source, target, name = '') => ({ id, source, target, name })

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
    node('start', 'startEvent', 'Pla confirmat', 40, 292, 36, 36),
    node('need', 'userTask', 'Registrar necessitat al pla (ERP)', 130, 270),
    node('calculate', 'serviceTask', 'Calcular estoc i reposició (ERP)', 345, 270),
    node('stock_ok', 'exclusiveGateway', 'Disponible suficient?', 560, 286, 50, 50),
    node('reserve', 'serviceTask', 'Reservar material (ERP)', 675, 85),
    node('stock_end', 'endEvent', 'Material reservat', 890, 108, 36, 36),
    node('request', 'userTask', 'Aprovar sol·licitud (ERP)', 675, 270),
    node('approval_ok', 'exclusiveGateway', 'Sol·licitud aprovada?', 890, 286, 50, 50),
    node('request_issue', 'userTask', 'Retornar o rebutjar petició (ERP)', 1005, 465),
    node('request_end', 'endEvent', 'Petició no aprovada', 1220, 488, 36, 36),
    node('supplier', 'userTask', 'Comparar ofertes (ERP)', 1020, 270),
    node('order', 'serviceTask', 'Emetre comanda (ERP)', 1235, 270),
    node('eta', 'serviceTask', 'Seguir data i avisar riscos (ERP)', 1450, 270),
    node('receive', 'userTask', 'Registrar recepció contra comanda (ERP)', 1665, 270),
    node('qty_ok', 'exclusiveGateway', 'Quantitat correcta?', 1880, 286, 50, 50),
    node('qty_issue', 'userTask', 'Obrir incidència (ERP)', 1995, 85),
    node('qty_end', 'endEvent', 'Pendent de regularitzar', 2210, 108, 36, 36),
    node('quality', 'userTask', 'Inspeccionar lot (ERP)', 1995, 270),
    node('quality_ok', 'exclusiveGateway', 'Lot acceptat?', 2210, 286, 50, 50),
    node('reject', 'userTask', 'Bloquejar lot i avisar (ERP)', 2325, 85),
    node('reject_end', 'endEvent', 'Lot rebutjat', 2540, 108, 36, 36),
    node('quality_pending', 'userTask', 'Mantindre lot en revisió (ERP)', 2325, 465),
    node('quality_pending_end', 'endEvent', 'Pendent de qualitat', 2540, 488, 36, 36),
    node('register', 'serviceTask', 'Actualitzar estoc i avisar (ERP)', 2325, 270),
    node('end', 'endEvent', 'Material disponible', 2540, 293, 36, 36),
  ],
  flows: [
    flow('f1', 'start', 'need'), flow('f2', 'need', 'calculate'), flow('f3', 'calculate', 'stock_ok'),
    flow('f4', 'stock_ok', 'reserve', 'Sí'), flow('f5', 'reserve', 'stock_end'),
    flow('f6', 'stock_ok', 'request', 'No'), flow('f7', 'request', 'approval_ok'),
    flow('f20', 'approval_ok', 'supplier', 'Sí'), flow('f21', 'approval_ok', 'request_issue', 'No'), flow('f22', 'request_issue', 'request_end'),
    flow('f8', 'supplier', 'order'), flow('f9', 'order', 'eta'), flow('f10', 'eta', 'receive'),
    flow('f11', 'receive', 'qty_ok'), flow('f12', 'qty_ok', 'qty_issue', 'No'),
    flow('f13', 'qty_issue', 'qty_end'), flow('f14', 'qty_ok', 'quality', 'Sí'),
    flow('f15', 'quality', 'quality_ok'), flow('f16', 'quality_ok', 'reject', 'No'),
    flow('f17', 'reject', 'reject_end'), flow('f18', 'quality_ok', 'register', 'Sí'),
    flow('f19', 'register', 'end'), flow('f23', 'quality_ok', 'quality_pending', 'Revisar'),
    flow('f24', 'quality_pending', 'quality_pending_end'),
  ],
}

function waypoints(source, target) {
  const sx = source.x + source.width / 2
  const sy = source.y + source.height / 2
  const tx = target.x + target.width / 2
  const ty = target.y + target.height / 2
  if (Math.abs(ty - sy) > 90) {
    const y1 = ty < sy ? source.y : source.y + source.height
    const y2 = ty < sy ? target.y + target.height : target.y
    return [[sx, y1], [sx, (y1 + y2) / 2], [tx, (y1 + y2) / 2], [tx, y2]]
  }
  return [[source.x + source.width, sy], [target.x, ty]]
}

function build(model) {
  const incoming = new Map(model.nodes.map((item) => [item.id, []]))
  const outgoing = new Map(model.nodes.map((item) => [item.id, []]))
  for (const edge of model.flows) {
    outgoing.get(edge.source).push(edge.id)
    incoming.get(edge.target).push(edge.id)
  }
  const elements = model.nodes.map((item) => `    <bpmn:${item.type} id="${item.id}" name="${escape(item.name)}">\n${incoming.get(item.id).map((id) => `      <bpmn:incoming>${id}</bpmn:incoming>`).join('\n')}\n${outgoing.get(item.id).map((id) => `      <bpmn:outgoing>${id}</bpmn:outgoing>`).join('\n')}\n    </bpmn:${item.type}>`).join('\n')
  const sequences = model.flows.map((edge) => `    <bpmn:sequenceFlow id="${edge.id}" sourceRef="${edge.source}" targetRef="${edge.target}"${edge.name ? ` name="${escape(edge.name)}"` : ''} />`).join('\n')
  const shapes = model.nodes.map((item) => `      <bpmndi:BPMNShape id="${item.id}_di" bpmnElement="${item.id}"><dc:Bounds x="${item.x}" y="${item.y}" width="${item.width}" height="${item.height}" /></bpmndi:BPMNShape>`).join('\n')
  const edges = model.flows.map((edge) => {
    const source = model.nodes.find((item) => item.id === edge.source)
    const target = model.nodes.find((item) => item.id === edge.target)
    const points = waypoints(source, target).map(([x, y]) => `<di:waypoint x="${x}" y="${y}" />`).join('')
    return `      <bpmndi:BPMNEdge id="${edge.id}_di" bpmnElement="${edge.id}">${points}</bpmndi:BPMNEdge>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_${model.id}" targetNamespace="https://nexe.example/processos">
  <bpmn:process id="Process_${model.id}" name="${escape(model.name)}" isExecutable="false">
${elements}
${sequences}
  </bpmn:process>
  <bpmndi:BPMNDiagram id="Diagram_${model.id}">
    <bpmndi:BPMNPlane id="Plane_${model.id}" bpmnElement="Process_${model.id}">
${shapes}
${edges}
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>
`
}

writeFileSync(join(directory, 'as-is.bpmn'), build(asIs))
writeFileSync(join(directory, 'to-be.bpmn'), build(toBe))
