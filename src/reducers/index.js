const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 220,
}
const updateCartItems = (cartItems, newItem, idx) => {
    if (idx === -1) {
        return [...cartItems, newItem]
    }
    return cartItems.map(item => item.id === newItem.id ? newItem : item)
}

const updateCartItem = (book, item = {}) => {
    const {
        id = book.id,
        count = 0,
        title = book.title,
        total = 0
    } = item
    return {
        id,
        title,
        count: count + 1,
        total: total + book.price
    }

}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_BOOKS_REQUEST":
            return {
                ...state,
                books: [],
                loading: true,
                error: null
            }
        case "FETCH_BOOKS_SUCCESS":
            return {
                ...state,
                books: action.payload,
                loading: false,
                error: null
            };
        case "FETCH_BOOKS_FAILURE" :
            return {
                ...state,
                books: [],
                loading: false,
                error: action.payload
            }
        case "BOOK_ADDED_TO_CART":
            const bookId = action.payload
            const book = state.books.find((book) => book.id === bookId)
            const itemIndex = state.cartItems.findIndex(({id}) => id === book.id)
            const item = state.cartItems[itemIndex]
            // let newItem
            // if (item) {
            //     newItem = {
            //         ...item,
            //         count: item.count + 1,
            //         total: item.total + book.price
            //     }
            // } else {
            //     newItem = {
            //         id: book.id,
            //         title: book.title,
            //         count: 1,
            //         total: book.price
            //     }
            // }
            const newItem = updateCartItem(book, item)
            return {
                ...state,
                cartItems: updateCartItems(state.cartItems, newItem, itemIndex)
            }


        default:
            return state
    }
}
export default reducer

