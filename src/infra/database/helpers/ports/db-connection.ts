export interface DbConnection {
  connect(): Promise<void>
  close(): Promise<void>
  getConnection(): any
}
