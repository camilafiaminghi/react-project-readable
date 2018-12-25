import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleSavePost } from '../actions/posts'
import ButtonGoBack from '../components/ButtonGoBack'
import InputText from './InputText'
import InputTextArea from './InputTextArea'
import SelectOption from './SelectOption'
import { isValid } from '../utils/validation'

export class NewPost extends Component {

	static propTypes = {
		categories: PropTypes.array.isRequired,
		success: PropTypes.bool.isRequired
	}

	state = {
		form : {
			author: '',
			title: '',
			body: '',
			category: ''
		},
		validation: {
			author: false,
			title: false,
			category: false
		},
		validated: false,
		submitted: false
	}

	componentDidiMount() {
		const category = this.props.location.state.category ? this.props.location.state.category : ''
		this.setState((prevState) => ({
			...prevState,
			form: {...prevState.form, category}
		}))
	}

	handleChange = (name, value, valid) => {
		const form = {...this.state.form, [name]: value}
		const validation = (this.state.validation.hasOwnProperty(name)) ? {...this.state.validation, [name]: valid} : {...this.state.validation}
		const validated = isValid(validation)

		this.setState((prevState) => ({
			...prevState,
			form,
			validation,
			validated
		}))
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const { dispatch } = this.props
		const { form, validated } = this.state

		this.setState((prevState) => ({ ...prevState, submitted: true }))

		/* DISPATCH IF IS VALID */
		if (validated) {
			dispatch(handleSavePost(form))
		}
	}

	render() {
		const { categories, success } = this.props
		const { validated, submitted, form } = this.state
		const { goBack, push } = this.props.history
		const { category } = this.props.location.state

		/* IF STATE CHANGED AND FORM IS SUBMITTED */
		if ( success && submitted ) {
			const pathname = form.category
			push(`/${pathname}`)
		}

		return (
			<div className="new-post">
				<div className="top">
					<ButtonGoBack goBack={goBack} />
				</div>
				<div>
					<h2 className="center">Compose new Post</h2>
					<form onSubmit={this.handleSubmit}>
						<InputText
							name="author"
							placeholder="Who are you?"
							maxLength={122}
							charsLeft={false}
							message="This field is required"
							handleChange={this.handleChange}
							submitted={submitted} />

						<SelectOption
							name="category"
							placeholder="Choose a category..."
							message="This field is required"
							handleChange={this.handleChange}
							submitted={submitted}
							items={categories}
							initialOption={category} />

						<InputText
							name="title"
							placeholder="Title"
							maxLength={122}
							charsLeft={true}
							message="This field is required"
							handleChange={this.handleChange}
							submitted={submitted} />

						<InputTextArea
							name="body"
							placeholder="Text"
							maxLength={280}
							charsLeft={true}
							handleChange={this.handleChange}
							items={categories} />

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

const mapStateToProps = ({ categories, posts }, props) => {
	const items = categories.items.map((item) => {
		item.value = item.path
		return item
	})
	return {
		categories: items,
		success: posts.success
	}
}

export default connect(mapStateToProps)(NewPost)
