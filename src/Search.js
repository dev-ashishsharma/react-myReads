import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'

class Search extends Component {
  static propTypes = {
    booksList : PropTypes.array.isRequired,
    handleChange : PropTypes.func.isRequired
  }

  state = {
    filteredBooks : [],
    searchQuery : '',
    blankSearchPage : true
  }

  onChange = (query) => {
    this.setState(() => ({
      searchQuery : query
    }))
    if (query !== '') {
      BooksAPI.search(query)
        .then((searchResults) => {
          if (searchResults.error) {
            this.setState({filteredBooks : [], blankSearchPage : true})
          }
          else {
            searchResults.map((searchedItem) => {
              this.props.booksList.find((bk) => {
                if (bk.id === searchedItem.id) {
                  searchedItem.shelf = bk.shelf
                }
                else {
                  searchedItem.shelf = "none"
                }
                return bk.id === searchedItem.id
              })
              return searchedItem
            })
            this.setState({filteredBooks : searchResults, blankSearchPage : false})
          }})
      }
      else {
        this.setState({filteredBooks :[], blankSearchPage: true})
      }
  }

  handleChange = (book, value) => {
    this.props.handleChange(book, value)
  }

  render() {
    const { filteredBooks, searchQuery } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'></Link>
          <div className="search-books-input-wrapper">
            <input className='search-book'
              type="text"
              placeholder="Search by title or author"
              value={searchQuery}
              onChange={(event) => this.onChange(event.target.value)}
            />
          </div>
        </div>
        {this.state.blankSearchPage ?
           (<div className='search-book-results'>
             Please refine your search.
           </div>)
           :
          (<div className="search-books-results">
            <ol className="books-grid">
              {filteredBooks.map((filteredBook) => (
                <Book key={filteredBook.id} book={filteredBook}
                  handleChange={(filteredBook,value) => this.handleChange(filteredBook,value)}
                  />
              ))}
            </ol>
          </div>)
        }
      </div>
    )
  }
}

export default Search
