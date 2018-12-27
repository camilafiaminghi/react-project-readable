import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { validationRules } from '../utils/validation'

class InputTextArea extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string.isRequired,
		maxLength: PropTypes.number.isRequired,
		handleOnChange: PropTypes.func.isRequired,
		submitted: PropTypes.bool,
		charsLeft: PropTypes.bool,
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
		const { name, placeholder, maxLength, charsLeft, message, submitted } = this.props
		const textLeft = maxLength - text.length

		return (
			<div>
				<textarea
					name={name}
					placeholder={placeholder}
					maxLength={maxLength}
					value={text}
					onChange={(event) => this.handleValidation(name, event.target.value)}></textarea>

				{ (textLeft <= 100 && charsLeft) && (<span>characteres left [{ textLeft }]</span>) }
				{ ((!valid && changed) || (!valid && submitted)) && (<span>{message}</span>) }
			</div>
		)
	}
}

export default InputTextArea
