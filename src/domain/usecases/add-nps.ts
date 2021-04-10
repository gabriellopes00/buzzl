import { NPS } from '../models/nps'

export interface AddNPS {
  add(data: NPS): Promise<NPS>
}
