import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { validationRules } from '../utils/validation'

class SelectCategory extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		handleOnChange: PropTypes.func.isRequired,
		items: PropTypes.array,
		submitted: PropTypes.bool,
		message: PropTypes.string,
		value: PropTypes.string
	}

	state = {
		text: '',
		changed: false,
		valid: false
	}

	componentDidMount() {
		const { name, value } = this.props
		this.handleValidation(name, value)
	}

	handleValidation = (name, value) => {
		const valid = validationRules(name, value)

		this.setState((prevState) => ({
			...prevState,
			text: value,
			changed: true,
			valid
		}))

		this.props.handleOnChange(name, value, valid)
	}

	render() {
		const { changed, valid, text } = this.state
		const { name, placeholder, message, submitted, items } = this.props

		return (
			<div>
				<select
					name={name}
					value={text}
 					onChange={(event) => this.handleValidation(name, event.target.value)}>
 					<option value="" disabled="disabled">{placeholder}</option>
 					{items.map((item, index) => {
 						const { value, name } = item
 						return (
							<option
								key={index}
								value={value}>{name}</option>
						)
					})}
				</select>

				{ ((!valid && changed) || (!valid && submitted)) && (<span>{message}</span>) }
			</div>
		)
	}
}

// export default SeInputTextArea

// class SelectCategory extends Input {
// 	static propTypes = {
// 		items: PropTypes.array.isRequired
// 	}

// 	render() {
// 		const { name, placeholder, items } = this.props
// 		const { text } = this.state
// 		const messageHelper = this.messageHelper()

// 		return (
// 			<div>
// 				<select
// 					name={name}
// 					value={text}
//  					onChange={(event) => this.handleValidation(name, event.target.value)}>
//  					<option value="" disabled="disabled">{placeholder}</option>
//  					{items.map((item, index) => {
//  						const { value, name } = item
//  						return (
// 							<option
// 								key={index}
// 								value={value}>{name}</option>
// 						)
// 					})}
// 				</select>
// 				{ messageHelper }
// 			</div>
// 		)
// 	}
// }

const mapStateToProps = ({ categories }, props) => {
	const items = categories.items.map((item) => {
		item.value = item.path
		return item
	})

	return {
		items
	}
}
export default connect(mapStateToProps)(SelectCategory)
