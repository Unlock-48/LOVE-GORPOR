import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const pictureUploadPlugin = (): Plugin => ({
  name: 'picture-upload',
  configureServer(server) {
    server.middlewares.use('/api/pictures', (request, response, next) => {
      if (request.method === 'GET') {
        const pictureDirectory = path.resolve(process.cwd(), 'public', 'picture')
        const files = fs.existsSync(pictureDirectory)
          ? fs.readdirSync(pictureDirectory).filter((fileName) => /\.(jpe?g|png|webp|gif)$/i.test(fileName))
          : []
        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify(files))
        return
      }

      if (request.method !== 'POST') {
        next()
        return
      }

      const contentType = request.headers['content-type']
      const boundaryMatch = contentType?.match(/boundary=([^;]+)/)
      if (!boundaryMatch) {
        response.statusCode = 400
        response.end('Missing multipart boundary')
        return
      }

      const chunks: Buffer[] = []
      request.on('data', (chunk: Buffer) => chunks.push(chunk))
      request.on('end', () => {
        const body = Buffer.concat(chunks)
        const boundary = Buffer.from(`--${boundaryMatch[1]}`)
        const headerEnd = body.indexOf(Buffer.from('\r\n\r\n'))
        const fileStart = headerEnd + 4
        const fileEnd = body.indexOf(boundary, fileStart) - 2
        const header = body.subarray(0, headerEnd).toString('utf8')
        const filenameMatch = header.match(/filename="([^"]+)"/)

        if (headerEnd < 0 || fileEnd < fileStart || !filenameMatch) {
          response.statusCode = 400
          response.end('Invalid image upload')
          return
        }

        const extension = path.extname(filenameMatch[1]).toLowerCase()
        if (!['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(extension)) {
          response.statusCode = 415
          response.end('Unsupported image type')
          return
        }

        const safeName = `${Date.now()}-${path.basename(filenameMatch[1], extension).replace(/[^a-zA-Z0-9_-]/g, '-')}${extension}`
        const pictureDirectory = path.resolve(process.cwd(), 'public', 'picture')
        fs.mkdirSync(pictureDirectory, { recursive: true })
        fs.writeFileSync(path.join(pictureDirectory, safeName), body.subarray(fileStart, fileEnd))

        response.setHeader('Content-Type', 'application/json')
        response.end(JSON.stringify({ path: `/picture/${safeName}` }))
      })
    })
  },
})

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    pictureUploadPlugin(),
  ],
})