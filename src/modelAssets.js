const revisions = {
  'to-be.bpmn': '6e72e498b995',
  'to-be.pdf': '84dcdaa4452f',
  'to-be-diagrama.png': '7cc5257c32bb',
}

export const modelUrl = (file) => import.meta.env.BASE_URL + 'models/' + file + '?v=' + (revisions[file] || '20261105-as-is-imatge-2')
