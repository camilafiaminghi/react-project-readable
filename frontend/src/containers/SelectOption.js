import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validationRules } from '../utils/validation'

class SelectOption extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		handleChange: PropTypes.func.isRequired,
		items: PropTypes.array.isRequired,
		message: PropTypes.string,
		submitted: PropTypes.bool
	}

	state = {
		option: '',
		changed: false,
		valid: false
	}

	handleValidation = (event) => {
		const { name, value } = event.target
		const valid = validationRules(name, value)

		this.setState((prevState) => ({
			...prevState,
			option: value,
			changed: true,
			valid
		}))

		this.props.handleChange(name, value, valid)
	}

	render() {
		const { name, placeholder, message, submitted, items } = this.props
		const { option, changed, valid } = this.state

		return (
			<div>
				<select
					name={name}
					value={option}
 					onChange={this.handleValidation}>
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
				{	((!valid && changed) || (!valid && submitted)) &&
					<span>{message}</span>
				}
			</div>
		)
	}
}

export default SelectOption
