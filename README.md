# MyReads Project
This is the MyReads React aplication that let a user categorize books into shelves of currentlyReading, wantToRead & Read. The users can also search for books limited to search terms defined in SEARCH_TERMS.md. These books can then be added to their shelves defined above. The user can also move a book to shelf of None which removes them from the View of the 3 shelves.

## Install
Clone or download this app.

npm install
Install the app.

yarn start
This runs the app in development mode in browser.


## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
