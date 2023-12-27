import testFunctions from '../utils/for_testing.js'

describe('reverse', () => {
    test('reverse of a', () => {
        const result = testFunctions.reverse('a')
      
        expect(result).toBe('a')
      })
      
      test('reverse of react', () => {
        const result = testFunctions.reverse('react')
      
        expect(result).toBe('tcaer')
      })
      
      test('reverse of releveler', () => {
        const result = testFunctions.reverse('releveler')
      
        expect(result).toBe('releveler')
      })
      
      test('palindrome of react', () => {
        const result = testFunctions.reverse('suraj')
      
        expect(result).toBe('jarus')
      })    
})


