import React, { Component } from 'react'
import { connect } from 'react-redux'
import ButtonGoBack from '../components/ButtonGoBack'
import { validationRules, isValid } from '../utils/validation'

export class NewPost extends Component {

	state = {
		form : {
			author: '',
			title: '',
			body: '',
			category: 'none'
		},
		validation: {
			author: false,
			title: false,
			category: false
		},
		validated: false,
		submitted: false
	}

	handleChange = (event) => {
		const { name, value } = event.target
		const valid = validationRules(name, value)
		const form = {...this.state.form, [name]: value}
		const validation = {...this.state.validation, [name]: valid}
		let validated = isValid(validation)

		this.setState((prevState) => ({
			...prevState,
			form,
			validation,
			validated
		}))
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const { validated } = this.state

		this.setState((prevState) => ({ ...prevState, submitted: true }))

		/* DISPATCH IF IS VALID */
		if (validated) {
			console.log(this.state.form)
		}
	}

	render() {
		const { goBack } = this.props.history
		const { categories } = this.props
		const { author, category, title, body } = this.state.form
		const { validated, validation, submitted } = this.state

		const titleLeft = 280 - title.length
		const bodyLeft = 280 - body.length

		return (
			<div className="new-post">
				<div className="top">
					<ButtonGoBack goBack={goBack} />
				</div>
				<div>
					<h2 className="center">Compose new Post</h2>
					<form onSubmit={this.handleSubmit}>
						<div>
							<input
								type="text"
								name="author"
								placeholder="Who are you?"
								maxLength={122}
								value={author}
								onChange={this.handleChange} />
							{	(!validation.author && submitted) &&
								<span>This field is required</span>
							}
						</div>

						<div>
							<select
								name="category"
								value={category}
			 					onChange={this.handleChange}>
			 					<option value="none" disabled="disabled">Choose a category...</option>
			 					{categories.map((category, index) => (
									<option
										key={index}
										value={category.path}>{category.name}</option>
								))}
							</select>
							{	(!validation.category && submitted) &&
								<span>This field is required</span>
							}
						</div>

						<div>
							<input
								type="text"
								name="title"
								placeholder="Title"
								maxLength={280}
								value={title}
								onChange={this.handleChange} />
							{ (titleLeft <= 100) &&
								<span>
									characteres left [{ titleLeft }]
								</span>
							}
							{	(!validation.title && submitted) &&
								<span>This field is required</span>
							}
						</div>

						<div>
							<textarea
								name="body"
								placeholder="Text"
								maxLength={280}
								value={body}
								onChange={this.handleChange}></textarea>
							{ (bodyLeft <= 100) &&
								<span>
									characteres left [{ bodyLeft }]
								</span>
							}
						</div>

						<button
							type="submit"
							disabled={!validated}>
							Post
						</button>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ categories }, props) => {
	const items = categories.items

	return {
		categories: items
	}
}

export default connect(mapStateToProps)(NewPost)
