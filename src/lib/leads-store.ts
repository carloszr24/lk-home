import { readJsonFile, writeJsonFile, generateId } from '@/lib/local-db'
import type { LeadRow } from '@/lib/leads'

const LEADS_FILE = 'leads.json'

export async function listLeadRows(): Promise<LeadRow[]> {
  const rows = await readJsonFile<LeadRow[]>(LEADS_FILE, [])
  return rows.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function insertLeadRow(
  data: Omit<LeadRow, 'id' | 'created_at' | 'updated_at' | 'first_response_at' | 'last_contact_at' | 'assigned_to'>
): Promise<LeadRow> {
  const rows = await readJsonFile<LeadRow[]>(LEADS_FILE, [])
  const now = new Date().toISOString()
  const row: LeadRow = {
    ...data,
    id: generateId(),
    assigned_to: null,
    first_response_at: null,
    last_contact_at: null,
    created_at: now,
    updated_at: now,
  }
  rows.unshift(row)
  await writeJsonFile(LEADS_FILE, rows)
  return row
}

export async function updateLeadRow(id: string, updates: Partial<LeadRow>): Promise<LeadRow | null> {
  const rows = await readJsonFile<LeadRow[]>(LEADS_FILE, [])
  const index = rows.findIndex((row) => row.id === id)
  if (index === -1) return null
  const updated: LeadRow = {
    ...rows[index],
    ...updates,
    id: rows[index].id,
    updated_at: new Date().toISOString(),
  }
  rows[index] = updated
  await writeJsonFile(LEADS_FILE, rows)
  return updated
}

export async function deleteLeadRow(id: string): Promise<boolean> {
  const rows = await readJsonFile<LeadRow[]>(LEADS_FILE, [])
  const filtered = rows.filter((row) => row.id !== id)
  if (filtered.length === rows.length) return false
  await writeJsonFile(LEADS_FILE, filtered)
  return true
}
