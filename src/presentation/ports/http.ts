export interface HttpResponse<T = any> {
  code: number
  body: T
}
