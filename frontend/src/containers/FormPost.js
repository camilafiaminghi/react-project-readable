import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import InputText from './InputText'
import InputTextArea from './InputTextArea'
import SelectCategory from './SelectCategory'
import { isValid } from '../utils/validation'

export class FormPost extends Component {

	static propTypes = {
		handleSubmit: PropTypes.func.isRequired,
		post: PropTypes.object
	}

	state = {
		form: {
			author: this.props.post.author,
			title: this.props.post.title,
			body: this.props.post.body,
			category: this.props.post.category
		},
		validation: {
			author: false,
			title: false,
			category: false
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
		const { title, author, body, category } = form

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

				<SelectCategory
					name="category"
					placeholder="Choose a category..."
					message="This field is required"
					value={category}
					handleOnChange={this.handleOnChange}
					submitted={submitted} />

				<InputText
					name="title"
					placeholder="Title"
					maxLength={122}
					charsLeft={true}
					message="This field is required"
					value={title}
					handleOnChange={this.handleOnChange}
					submitted={submitted} />

				<InputTextArea
					name="body"
					placeholder="Text"
					maxLength={280}
					charsLeft={true}
					value={body}
					handleOnChange={this.handleOnChange} />

				<button
					type="submit"
					disabled={!validated}
					className="btn">
					Post
				</button>
			</form>
		)
	}
}

export default connect()(FormPost)
