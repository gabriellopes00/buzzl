export interface Controller {
  handle(data: any): Promise<any>
}
