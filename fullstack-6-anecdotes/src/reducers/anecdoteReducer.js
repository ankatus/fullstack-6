import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  if (action.type === 'VOTE') {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content, id: action.id, votes: 0 }]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const anecdoteVoting = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.modify({
      content: anecdote.content,
      votes: anecdote.votes + 1
    }, anecdote.id)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch({
      type: 'CREATE',
      content: newAnecdote.content,
      id: newAnecdote.id
    })
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer