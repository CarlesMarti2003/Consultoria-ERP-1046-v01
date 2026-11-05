const revision = '20261105-model-imatge-1'
export const modelUrl = (file) => import.meta.env.BASE_URL + 'models/' + file + '?v=' + revision
