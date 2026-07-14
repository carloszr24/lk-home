import fs from 'fs/promises'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')
const memoryStore = new Map<string, unknown>()
let filesystemAvailable: boolean | null = null

function isServerlessDeployment(): boolean {
  return process.env.VERCEL === '1' || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME)
}

async function canUseFilesystem(): Promise<boolean> {
  if (filesystemAvailable !== null) return filesystemAvailable
  if (isServerlessDeployment()) {
    filesystemAvailable = false
    return false
  }

  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const probe = path.join(DATA_DIR, '.write-probe')
    await fs.writeFile(probe, '1', 'utf-8')
    await fs.unlink(probe)
    filesystemAvailable = true
  } catch {
    filesystemAvailable = false
  }
  return filesystemAvailable
}

export async function readJsonFile<T>(filename: string, defaultValue: T): Promise<T> {
  if (!(await canUseFilesystem())) {
    const cached = memoryStore.get(filename)
    return (cached !== undefined ? cached : defaultValue) as T
  }

  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return defaultValue
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  if (!(await canUseFilesystem())) {
    memoryStore.set(filename, data)
    return
  }

  await fs.mkdir(DATA_DIR, { recursive: true })
  const filePath = path.join(DATA_DIR, filename)
  const tmpPath = `${filePath}.tmp`
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), 'utf-8')
  await fs.rename(tmpPath, filePath)
}

export function generateId(): string {
  return crypto.randomUUID()
}

export async function isLocalPersistenceEnabled(): Promise<boolean> {
  return canUseFilesystem()
}
