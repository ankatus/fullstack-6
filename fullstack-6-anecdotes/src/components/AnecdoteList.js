import React from 'react'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import Filter from './Filter'

class AnecdoteList extends React.Component {

  handleVote = (e, anecdote) => {
    e.preventDefault()
    console.log(anecdote)
    this.props.anecdoteVoting(anecdote)
    this.props.notify('you voted \'' + anecdote.content + '\'', 5)
  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e) =>
                this.handleVote(e, anecdote)
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  let anecdotes = state.anecdotes

  anecdotes = anecdotes.filter(
    anecdote => anecdote
      .content
      .toLowerCase()
      .includes(
        state.filter.toLowerCase()
      )
  )

  anecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return {
    anecdotes
  }
}

export default connect(mapStateToProps, { anecdoteVoting, notify })(AnecdoteList)
