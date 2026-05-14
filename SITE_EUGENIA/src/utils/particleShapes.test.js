import { describe, it, expect } from 'vitest'
import { makeQuestionMarks, makeRoad, makeBlackboard, makeGears, makeRobot } from './particleShapes'

describe('makeQuestionMarks', () => {
  it('retorna array de objetos {x, y}', () => {
    const pts = makeQuestionMarks(400, 300, 100)
    expect(Array.isArray(pts)).toBe(true)
    if (pts.length > 0) {
      expect(pts[0]).toHaveProperty('x')
      expect(pts[0]).toHaveProperty('y')
    }
  })

  it('retorna no máximo count pontos', () => {
    const pts = makeQuestionMarks(400, 300, 50)
    expect(pts.length).toBeLessThanOrEqual(50)
  })
})

describe('makeRoad', () => {
  it('retorna array de objetos {x, y}', () => {
    const pts = makeRoad(400, 300, 100)
    expect(Array.isArray(pts)).toBe(true)
    if (pts.length > 0) {
      expect(pts[0]).toHaveProperty('x')
      expect(pts[0]).toHaveProperty('y')
    }
  })

  it('retorna no máximo count pontos', () => {
    const pts = makeRoad(400, 300, 50)
    expect(pts.length).toBeLessThanOrEqual(50)
  })
})

describe('makeBlackboard', () => {
  it('retorna array de {x, y} com no máximo count pontos', () => {
    const pts = makeBlackboard(300, 300, 50, 0)
    expect(Array.isArray(pts)).toBe(true)
    expect(pts.length).toBeLessThanOrEqual(50)
  })

  it('aceita checksVisible de 0 a 3 sem erros', () => {
    expect(() => makeBlackboard(300, 300, 50, 0)).not.toThrow()
    expect(() => makeBlackboard(300, 300, 50, 3)).not.toThrow()
  })
})

describe('makeGears', () => {
  it('retorna array de {x, y}', () => {
    const pts = makeGears(400, 300, 0)
    expect(Array.isArray(pts)).toBe(true)
    if (pts.length > 0) {
      expect(pts[0]).toHaveProperty('x')
      expect(pts[0]).toHaveProperty('y')
    }
  })

  it('retorna resultado diferente para ângulos diferentes', () => {
    const a = makeGears(200, 200, 0)
    const b = makeGears(200, 200, Math.PI)
    const same = a.length === b.length && a.every((p, i) => p.x === b[i]?.x && p.y === b[i]?.y)
    expect(same).toBe(false)
  })
})

describe('makeRobot', () => {
  it('retorna array de {x, y} com no máximo count pontos', () => {
    const pts = makeRobot(400, 400, 50)
    expect(Array.isArray(pts)).toBe(true)
    expect(pts.length).toBeLessThanOrEqual(50)
  })
})
