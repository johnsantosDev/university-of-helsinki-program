import testFunctions from '../utils/for_testing.js'

describe('average', () => {
  test('of one value is the value itself', () => {
    expect(testFunctions.average([1])).toBe(1)
  })

  test('of many is calculated right', () => {
    expect(testFunctions.average([1, 2, 3, 4, 5, 6])).toBe(3.5)
  })

  test('of empty array is zero', () => {
    expect(testFunctions.average([])).toBe(0)
  })
})