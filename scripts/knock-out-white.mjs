import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'

const dir = path.resolve(process.cwd(), 'public/images')
const files = (await readdir(dir)).filter(
  (f) => f.startsWith('flower-') && f.endsWith('.png'),
)

for (const file of files) {
  const fp = path.join(dir, file)
  const { data, info } = await sharp(fp)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const m = Math.min(data[i], data[i + 1], data[i + 2])
    if (m >= 242) {
      data[i + 3] = 0
    } else if (m >= 205) {
      data[i + 3] = Math.round(((242 - m) / 37) * 255)
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(fp + '.tmp')

  const { rename } = await import('node:fs/promises')
  await rename(fp + '.tmp', fp)
  console.log('processed', file)
}
