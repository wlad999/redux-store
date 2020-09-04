const initialState = {
    books: [
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
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "BOOKS_LOADED":
            return {
                books: action.payload
            };
        default:
            return state
    }
}
export default reducer

