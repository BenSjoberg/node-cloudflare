// WARNING: this is very incomplete, I'm basically
// just adding types as I need them.

export interface Cloudflare {
  zones: {
    browse(options?: PaginationOptions): Promise<PaginatedResult<Zone[]>>
  }

  dnsRecords: {
    browse(zoneID: string, options?: PaginationOptions): Promise<PaginatedResult<DNSRecord[]>>
    add(zoneID: string, record: NewDNSRecord): Promise<void>
    del(zoneID: string, recordID: string): Promise<void>
  }
}

export interface Zone {
  name: string
  name_servers: string[]
  id: string
}

export interface DNSRecord {
  name: string
  id: string
  type: string
  content: string
  ttl: number
}

export type NewDNSRecord = Omit<DNSRecord, 'id'>

export interface PaginatedResult<T> {
  result: T
  result_info: {
    page: number
    per_page: number
    total_pages: number
    count: number
    total_count: number
  }
  success: boolean
  errors: any[]
  messages: any[]
}

export interface PaginationOptions {
  per_page?: number
}

declare function cloudflare(opts: { email: string, key: string }): Cloudflare
export default cloudflare
