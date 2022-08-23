import React, { Component } from 'react';


class FormMailChimp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: undefined
        };
    }

    handleSubmit = e => {
        e.preventDefault();
    
        const formData = new FormData(e.target);

        fetch("/.netlify/functions/mailchimp", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email: formData.get('email')
            })
        })
            .then(response => response.json())
            .then(json => this.setState({
                msg: json.msg
            }))
            .catch(err => console.log(err))

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="email">Email :</label>
                <input id="email" type="email" name="email" />
                <button type="submit">GO</button>
                <div>{this.state.msg}</div>
            </form>
        )
    }
}

export default FormMailChimp;