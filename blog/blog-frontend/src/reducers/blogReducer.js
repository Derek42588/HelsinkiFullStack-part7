import blogService from '../services/blogs'
import { sortByLikes } from '../utils/utils'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'ADD_BLOG':
    return state.concat(action.data)
  case 'SET_BLOGS':
    return action.data
  case 'UPVOTE_BLOG':
    return action.data
  case 'REMOVE_BLOG':
    return action.data
  default:
    return state
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'ADD_BLOG',
      data: newBlog
    })
  }

}

export const upvoteBlog = (blog) => {
  return async dispatch => {
    const upvotedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    await blogService.update(upvotedBlog.id, upvotedBlog)
    const blogs = await blogService.getAll()
    sortByLikes(blogs)
    dispatch({
      type: 'UPVOTE_BLOG',
      data: blogs
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    sortByLikes(blogs)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blogs
    })
  }
}

export const setBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    sortByLikes(blogs)
    dispatch({
      type: 'SET_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer