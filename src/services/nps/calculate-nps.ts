import { Evaluation } from '@/domain/evaluation/evaluation'

export interface NPSData {
  score: number
  evaluations: number
  level: 'EXCELLENT' | 'GREAT' | 'GOOD' | 'BAD'
  passives: { quantity: number; percent: number }
  detractors: { quantity: number; percent: number }
  promoters: { quantity: number; percent: number }
}

export interface CalculateNPS {
  calculate(evaluations: Evaluation[]): Promise<NPSData>
}

export class CalculateNPService implements CalculateNPS {
  public async calculate(evaluations: Evaluation[]): Promise<NPSData> {
    const promoters: Evaluation[] = []
    const detractors: Evaluation[] = []
    const passives: Evaluation[] = []

    for (const evaluation of evaluations) {
      if (evaluation.rating <= 6) detractors.push(evaluation)
      else if (evaluation.rating >= 9) promoters.push(evaluation)
      else passives.push(evaluation)
    }

    const percentDetractors = (evaluations.length / 100) * detractors.length
    const percentPromoters = (evaluations.length / 100) * promoters.length
    const percentPassives = (evaluations.length / 100) * passives.length

    const nps = percentPromoters - percentDetractors

    let level: 'EXCELLENT' | 'GREAT' | 'GOOD' | 'BAD' = null
    if (nps >= 70) level = 'EXCELLENT'
    else if (nps >= 30) level = 'GREAT'
    else if (nps >= 0) level = 'GOOD'
    else level = 'BAD'

    return {
      score: nps,
      evaluations: evaluations.length,
      level,
      detractors: { quantity: detractors.length, percent: percentDetractors },
      promoters: { quantity: promoters.length, percent: percentPromoters },
      passives: { quantity: passives.length, percent: percentPassives }
    }
  }
}
