import { Evaluation } from '@/domain/evaluation/evaluation'
import { CalculateNPService } from '@/services/nps/calculate-nps'
import { fakeService } from '@t/mocks/service/service'

describe('Calculate NPS Service', () => {
  const sut = new CalculateNPService()

  const evaluations: Evaluation[] = [
    { id: 'eval1', rating: 10, service: fakeService.apiKey },
    { id: 'eval2', rating: 10, service: fakeService.apiKey },
    { id: 'eval3', rating: 8, service: fakeService.apiKey },
    { id: 'eval4', rating: 8, service: fakeService.apiKey },
    { id: 'eval5', rating: 6, service: fakeService.apiKey },
    { id: 'eval5', rating: 6, service: fakeService.apiKey }
  ]

  it('Should correctly split evaluations in detractors, promoters and passives', async () => {
    const nps = await sut.calculate(evaluations)
    expect(nps.detractors.quantity).toBe(2)
    expect(nps.detractors.percent).toBe(33.33)

    expect(nps.promoters.quantity).toBe(2)
    expect(nps.promoters.percent).toBe(33.33)

    expect(nps.passives.quantity).toBe(2)
    expect(nps.passives.percent).toBe(33.33)
  })

  it('Should calculate nps correctly', async () => {
    const nps = await sut.calculate(evaluations)

    expect(nps.evaluations).toBe(evaluations.length)
    expect(nps.score).toBe(0) // %promoters - %detractors => (33.33% - 33.33% = 0)

    if (nps.score >= 70) expect(nps.level).toEqual('EXCELLENT')
    else if (nps.score >= 30) expect(nps.level).toEqual('GREAT')
    else if (nps.score >= 0) expect(nps.level).toEqual('GOOD')
    else expect(nps.level).toEqual('BAD')
  })
})
