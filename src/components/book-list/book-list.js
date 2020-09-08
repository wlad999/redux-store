import React, {Component} from "react";
import BookListItem from "../book-list-item/book-list-item";
import {connect} from 'react-redux';
import {withBookstoreService} from "../hoc";
import {fetchBooks, bookAddedToCart} from "../../actions/index";
import {compose} from "../../utils"
import Spinner from "../spinner/spinner"
import "./book-list.css"
import ErrorIndicator from "../error-indicator";


const BookList = ({books, onAddedToCart}) => {
    return (
        <ul className="book-list">
            {books.map((book) => {
                return (
                    <li key={book.id}>
                        <BookListItem book={book}
                                      onAddedToCart={() => onAddedToCart(book.id)}
                        />
                    </li>
                )
            })}
        </ul>
    )
}


class BookListContainer extends Component {
    componentDidMount() {
        this.props.fetchBooks()
        // const {bookstoreService, booksLoaded, booksRequested, booksError} = this.props
        // booksRequested()
        // bookstoreService.getBooks().then((data) => booksLoaded(data)).catch((err) => booksError(err))
    }


    render() {

        const {books, loading, error, onAddedToCart} = this.props
        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorIndicator/>
        }
        return (
            <BookList books={books} onAddedToCart={onAddedToCart}/>
        )
    }
}

const MSTP = ({books, loading, error}) => {
    return {books, loading, error}
}
const MDTP = (dispatch, {bookstoreService}) => {
    return {
        fetchBooks: fetchBooks(dispatch, bookstoreService),
        onAddedToCart: (id) => dispatch(bookAddedToCart(id))
    }
}
// const MDTP = {booksLoaded, booksRequested, booksError}


export default compose(
    withBookstoreService(),
    connect(MSTP, MDTP),
)(BookListContainer)
// export default withBookstoreService()(connect(MSTP, MDTP)(BookList))

