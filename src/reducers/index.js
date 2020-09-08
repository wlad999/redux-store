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
        .filter(item => item.count > 0)
}

const updateCartItem = (book, item = {}, quantity) => {
    const {
        id = book.id,
        count = 0,
        title = book.title,
        total = 0
    } = item
    return {
        id,
        title,
        count: count + quantity,
        total: total + quantity * book.price
    }

}
// const decreaseBook = (id, {cartItems, books}) => {
//     const bookRemoved = books.find(({id}) => id === id)
//
//     return cartItems.map((item) => {
//             if (item.id === id) {
//                 return {
//                     ...item,
//                     count: item.count - 1,
//                     total: item.total - bookRemoved.price
//                 }
//             }
//             return item
//         }
//     ).filter(item => item.count > 0)
// }
const updateOrder = (state, bookId, quantity) => {
    const {books, cartItems} = state
    const book = books.find(({id}) => id === bookId)
    const itemIndex = cartItems.findIndex(({id}) => id === book.id)
    const item = cartItems[itemIndex]
    const newItem = updateCartItem(book, item, quantity)
    return {
        ...state,
        cartItems: updateCartItems(cartItems, newItem, itemIndex)
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
            return updateOrder(state, action.payload, 1)

        case "ALL_BOOKS_REMOVED_FROM_CART":

            const item = state.cartItems.find(item => item.id === action.payload)

            // return {
            //     ...state,
            //     cartItems: state.cartItems.filter((item) => item.id !== action.payload)
            // }
            return updateOrder(state, action.payload, -item.count)
        case "BOOK_REMOVED_FROM_CART":
            return updateOrder(state, action.payload, -1)
        // return {
        //     ...state,
        //     cartItems: decreaseBook(id, state)
        // }
        default:
            return state
    }
}
export default reducer

