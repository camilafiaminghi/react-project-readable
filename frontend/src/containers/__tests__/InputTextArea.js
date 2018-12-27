import React from 'react';
import InputTextArea from './../InputTextArea'
import { validation, isValid } from './../../utils/validation'

let store
let props
let wrapper
const state = {
	text: '',
	changed: false,
	valid: false
}

describe('<InputTextArea />', () => {

	beforeEach(() => {
		props = {
			name: 'body',
			placeholder: '',
			maxLength: 244,
			handleOnChange: jest.fn(),
			submitted: false,
			charsLeft: false,
			message: '',
			value: ''
		}
		wrapper = shallow(<InputTextArea {...props} />)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should contains a state object', () => {
		expect(wrapper.state()).toEqual({...state, changed: true})
	})

	it('should  a handleOnSubmit method', () => {
		const event = {target: {name: 'body', value: 'test'}}
		wrapper.simulate('change', event)
		expect(props.handleOnChange).toHaveBeenCalledTimes(1)
	})
})
