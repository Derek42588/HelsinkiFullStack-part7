export const sortByLikes = (blogs) => {
  blogs.sort((a, b) => (b.likes) - (a.likes))
}