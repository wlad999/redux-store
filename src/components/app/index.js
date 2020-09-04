import React from "react";
import {withBookstoreService} from "../hoc/";
import "./app.css"

const App = ({bookstoreService}) => {
    console.log("bookstoreService", bookstoreService.getBooks())
    return <div>APP</div>
}
export default withBookstoreService()(App)