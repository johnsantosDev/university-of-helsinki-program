/* eslint-disable no-unused-vars */
const dummy = (array) => {
  return 1
}

const totalLikes = (list) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return list.length === 0
    ? 0
    : list.reduce(reducer, 0)
}

const favoriteBlog = (list) => {
  const maxLike = Math.max(...list.map(item => item.likes))
  const maxLikeIndex = list.findIndex(item => item.likes === maxLike)
  return {
    title: list[maxLikeIndex].title,
    author: list[maxLikeIndex].author,
    likes: list[maxLikeIndex].likes
  }
}

const mostBlogs = (list) => {
  const authors = list.map(item => item.author)
  const authorsObjectWithNums = {}
  authors.map(item => authorsObjectWithNums[item] = authorsObjectWithNums[item] + 1 || 1)
  const greatAuthor = {
    author: Object.keys(authorsObjectWithNums).reduce((a,b) => authorsObjectWithNums[a] > authorsObjectWithNums[b] ? a : b),
    blogs: Math.max(...Object.values(authorsObjectWithNums))
  }
  return greatAuthor
}

const mostLikes = (list) => {
  const greatAuthor = mostBlogs(list).author
  const likes = list.reduce((sum, item) => {
    console.log('sum before condition:', sum)
    return item.author === greatAuthor
      ? sum + item.likes
      : sum
  }, 0)

  const mostAuthorLikesTotal = {
    author: greatAuthor,
    likes: likes
  }
  return mostAuthorLikesTotal
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}