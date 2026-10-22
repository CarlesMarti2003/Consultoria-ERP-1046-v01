import { copyFileSync, cpSync, existsSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

if (!existsSync(join(dist, 'index.html'))) {
  throw new Error('Primer cal compilar la web amb npm run build.')
}

for (const directory of ['assets', 'images', 'cv', 'models', 'presentacio']) {
  rmSync(join(root, directory), { recursive: true, force: true })
  if (existsSync(join(dist, directory))) {
    cpSync(join(dist, directory), join(root, directory), { recursive: true })
  }
}

copyFileSync(join(dist, 'index.html'), join(root, 'index.html'))
