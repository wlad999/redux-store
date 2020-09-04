import React, {Component} from "react";
import Index from "../error-indicator";

export default class ErrorBoundry extends Component {
    state = {
        hasError: false
    }

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <Index/>
        }
        return this.props.children
    }
}