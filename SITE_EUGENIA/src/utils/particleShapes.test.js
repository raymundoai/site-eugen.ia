import { describe, it, expect } from 'vitest'
import { makeQuestionMarks, makeRoad } from './particleShapes'

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
