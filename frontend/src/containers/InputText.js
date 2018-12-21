import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validationRules } from '../utils/validation'

class InputText extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		maxLength: PropTypes.number.isRequired,
		handleChange: PropTypes.func.isRequired,
		submitted: PropTypes.bool,
		charsLeft: PropTypes.bool,
		message: PropTypes.string
	}

	state = {
		text: '',
		changed: false,
		valid: false
	}

	handleValidation = (event) => {
		const { name, value } = event.target
		const valid = validationRules(name, value)

		this.setState((prevState) => ({
			...prevState,
			text: value,
			changed: true,
			valid
		}))

		this.props.handleChange(name, value, valid)
	}

	render() {
		const { name, placeholder, maxLength, message, charsLeft, submitted } = this.props
		const { text, changed, valid } = this.state

		const textLeft = maxLength - text.length

		return (
			<div>
				<input
					type="text"
					name={name}
					placeholder={placeholder}
					maxLength={maxLength}
					value={text}
					onChange={this.handleValidation} />
				{ (textLeft <= 100 && charsLeft) &&
					<span>
						characteres left [{ textLeft }]
					</span>
				}
				{	((!valid && changed) || (!valid && submitted)) &&
					<span>{message}</span>
				}
			</div>
		)
	}
}

export default InputText
