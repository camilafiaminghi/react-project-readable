import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputText from './InputText'
import InputTextArea from './InputTextArea'
import { isValid } from '../utils/validation'

export class FormComment extends Component {

	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		comment: PropTypes.object
	}

	state = {
		form: {
			author: this.props.comment.author,
			body: this.props.comment.body,
		},
		validation: {
			author: false,
			body: false
		},
		validated: false,
		submitted: false
	}

	handleOnChange = (name, value, valid) => {
		this.setState((prevState) => ({
			...prevState,
			form: {...prevState.form, [name]: value},
			validation: (prevState.validation.hasOwnProperty(name)) ? {...prevState.validation, [name]: valid} : {...prevState.validation}
		}))

		/* VALIDATE ENTIRE FORM */
		this.setState((prevState) => ({
			...prevState,
			validated: isValid(prevState.validation)
		}))
	}

	handleOnSubmit = (event) => {
		event.preventDefault()
		const { validated, form } = this.state
		const { handleSubmit } = this.props

		this.setState((prevState) => ({ ...prevState, submitted: true }))
		handleSubmit(validated, form)
	}

	render() {
		const { validated, submitted, form } = this.state
		const { author, body } = form

		return (
			<form onSubmit={this.handleOnSubmit}>
				<InputText
					name="author"
					placeholder="Who are you?"
					maxLength={122}
					charsLeft={false}
					message="This field is required"
					value={author}
					handleOnChange={this.handleOnChange}
					submitted={submitted} />

				<InputTextArea
					name="body"
					placeholder="Text"
					maxLength={280}
					charsLeft={true}
					message="This field is required"
					value={body}
					handleOnChange={this.handleOnChange} />

				<button
					type="submit"
					disabled={!validated}
					className={validated ? 'btn' : 'btn disabled'}>
					Save
				</button>
			</form>
		)
	}
}

export default connect()(FormComment)
