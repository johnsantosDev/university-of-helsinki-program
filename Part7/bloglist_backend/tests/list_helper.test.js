/* eslint-disable no-undef */
import list_helper from '../utils/list_helper'
import blogs from '../utils/data.js'

describe('dummy', () => {
  test('dummy returns 1', () => {
    const blogs = []
    const result = list_helper.dummy(blogs)
    expect(result).toBe(1)
  })
})

describe('totalLikes', () => {
  test('totalLikes returns', () => {
    const totalLikes = list_helper.totalLikes(blogs)
    console.log('totallikes',totalLikes)
    expect(totalLikes).toBe(51)
  })
})

describe('favorite blog', () => {
  test('should return favorite blog', () => {
    const favoriteBlog = list_helper.favoriteBlog(blogs)
    console.log('favorite blog', favoriteBlog)
    expect(favoriteBlog).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('should return most blog with author and number of blogs', () => {
    const most = list_helper.mostBlogs(blogs)
    console.log('most', most)
    expect(most).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        blogs: 5
      }
    )
  })
})

describe('most likes', () => {
  test('should return total likes and author of the most author', () => {
    const mostLikes = list_helper.mostLikes(blogs)
    console.log('most likes', mostLikes)
    expect(mostLikes).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 32
    })
  })
})