import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book : PropTypes.object.isRequired,
    handleChange : PropTypes.func.isRequired
  }

  handleChange= (book,value) => {
    console.log(book)
    this.props.handleChange(this.props.book, value)
  }

   displayImage = (book) => {
    if (book.imageLinks && book.imageLinks.thumbnail) {
      return `url(${book.imageLinks.thumbnail})`
    }
    else {
      return "No Image"
    }
  }
  render() {
    const { book } =  this.props
    return(
      <li key={book.id} >
        <div className='book'>
          <div className='book-top'>
            <div className='book-cover' style={{
              width: 128, height: 193, backgroundImage:`${this.displayImage(book)}`}} >
            </div>
            <div className='book-shelf-changer'>
              <select value={book.shelf} onChange={(e) => this.handleChange(book, e.target.value)}>
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currentlyreading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>{book.title}</div>
          <div className='book-authors'>
            {(book.authors ? book.authors.map((author, index) => (
              (index ? ', ' : '') + author))
              : "Unknown Author")}
          </div>
      </div>
      </li>
    )
  }
}

export default Book
