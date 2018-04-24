import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
  static propTypes = {
    booksList : PropTypes.array.isRequired,
    shelfName : PropTypes.string,
    handleChange : PropTypes.func.isRequired
  }

  handleChange = (book, value) => {
    this.props.handleChange(book, value)
  }

  render() {
    const { booksList } = this.props
    return (
          <div>
            <div className='bookshelf'>
              <h2 className='bookshelf-title'>{this.props.shelfName}</h2>
                <div className='bookshelf-books'>
                  <ol className='books-grid'>
                    {booksList.map((book) => (
                      <Book key={book.id} book={book}
                        handleChange={(book,value) => this.handleChange(book,value)} />
                    ))}
                  </ol>
                </div>
            </div>
          </div>
          )
        }
}

export default Bookshelf
