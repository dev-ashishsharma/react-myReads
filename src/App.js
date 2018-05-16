import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import { Route, Link, Switch} from 'react-router-dom'
import Search from './Search'
import NoMatch from './NoMatch'

class BooksApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bookShelf: [],
  }
}

  componentDidMount() {
    BooksAPI.getAll().then((bookShelf) => {
      this.setState(() => ({
        bookShelf
      }))
    })
  }

  /**
   * The method handles the change done to the shelf
   * of a Book.
   * @param  {array} book  which has changed
   * @param  {string} value the new shelf selected
   */
  handleStatusChange = (book, value) => {
    let updatedBook = book
    updatedBook.shelf =  value
    /* This newBookShelf code snippet was learned from Brandon's code */
    let newBookShelf = this.state.bookShelf.filter((bk) => {
      return bk.id !== book.id
    })
    // Push the new updated Book to bookShelf
    newBookShelf.push(updatedBook)
    BooksAPI.update(book,value)
      .then(this.setState({bookShelf : newBookShelf}))
  }

  render() {
    let currentlyReading = this.state.bookShelf.filter((book) => {
      return book.shelf === "currentlyReading"
    })
    let wantToRead = this.state.bookShelf.filter((book) => {
      return book.shelf === "wantToRead"
    })
    let haveRead = this.state.bookShelf.filter((book) => {
      return book.shelf === "read"
    })
    return (
      <div className='app'>
        <Switch>
          <Route exact path='/' render={() => (
            <div className='all-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <div className='list-books'>
                <div className='list-content'>
                  <div>
                    <Bookshelf booksList={currentlyReading} shelfName="Currently Reading" handleChange={(book,value) => this.handleStatusChange(book,value)} />
                    <Bookshelf booksList={wantToRead} shelfName="Want to Read" handleChange={(book,value) => this.handleStatusChange(book,value)} />
                    <Bookshelf booksList={haveRead} shelfName="Have Read" handleChange={(book,value) => this.handleStatusChange(book,value)} />
                  </div>
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search'> Add a Book </Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={() => (
            <Search
              booksList={this.state.bookShelf}
              handleChange={(book,value) => {
                this.handleStatusChange(book,value)
            }}
            />
          )}/>
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}
export default BooksApp
