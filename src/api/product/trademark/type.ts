export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface TrademarkData {
  id?: number
  tmName: string
  logoUrl: string
}
export type Records = TrademarkData[]
export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
