import React from "react";
import BookList from "../book-list/book-list";

const HomePage = () => {
    const books = [
        {
            id: 1,
            title: 'KJBIUBIU',
            author: 'JHUYGYGU'
        },
        {
            id: 2,
            title: 'KJBIUGKJNK',
            author: 'VHGDTEST'
        }
    ]
    return (<BookList books={books}/>)
}

export default HomePage