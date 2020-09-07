import React, {Component} from "react";
import BookListItem from "../book-list-item/book-list-item";
import {connect} from 'react-redux';
import {withBookstoreService} from "../hoc";
import {booksLoaded} from "../../actions/index";
import {compose} from "../../utils"
import Spinner from "../spinner/spinner"
import "./book-list.css"


class BookList extends Component {

    componentDidMount() {
        const {bookstoreService, booksLoaded} = this.props
        bookstoreService.getBooks().then((data) => booksLoaded(data))
    }


    render() {

        const {books, loading} = this.props
        if (loading) {
            return <Spinner/>
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

const MSTP = ({books, loading}) => {
    return {books, loading}
}
const MDTP = {booksLoaded}

export default compose(
    withBookstoreService(),
    connect(MSTP, MDTP),
)(BookList)
// export default withBookstoreService()(connect(MSTP, MDTP)(BookList))
