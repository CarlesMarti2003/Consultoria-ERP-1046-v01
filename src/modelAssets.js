export const modelUrl = (file) => {
  const revision = file === 'to-be.bpmn' ? '6e72e498b995' : '20261105-as-is-imatge-2'
  return import.meta.env.BASE_URL + 'models/' + file + '?v=' + revision
}
