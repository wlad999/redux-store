import React, {Component} from "react";
import BookListItem from "../book-list-item/book-list-item";
import {connect} from 'react-redux';
import {withBookstoreService} from "../hoc";
import {booksLoaded, booksRequested, booksError} from "../../actions/index";
import {compose} from "../../utils"
import Spinner from "../spinner/spinner"
import "./book-list.css"
import ErrorIndicator from "../error-indicator";


class BookList extends Component {

    componentDidMount() {
        const {bookstoreService, booksLoaded, booksRequested, booksError} = this.props
        booksRequested()
        bookstoreService.getBooks().then((data) => booksLoaded(data)).catch((err) => booksError(err))
    }


    render() {

        const {books, loading, error} = this.props
        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <ErrorIndicator/>
        }
        return (
            <ul className="book-list">
                {books.map((book) => {
                    return (
                        <li key={book.id}><BookListItem book={book}/></li>
                    )
                })}
            </ul>
        )
    }
}

const MSTP = ({books, loading, error}) => {
    return {books, loading, error}
}
const MDTP = {booksLoaded, booksRequested, booksError}

export default compose(
    withBookstoreService(),
    connect(MSTP, MDTP),
)(BookList)
// export default withBookstoreService()(connect(MSTP, MDTP)(BookList))
