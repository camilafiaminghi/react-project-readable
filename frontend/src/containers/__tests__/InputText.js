import React from 'react';
import InputText from './../InputText'
import { validation, isValid } from './../../utils/validation'

let store
let props
let wrapper
const state = {
	text: '',
	changed: false,
	valid: false
}

describe('<InputText />', () => {

	beforeEach(() => {
		props = {
			name: 'author',
			placeholder: '',
			maxLength: 244,
			handleOnChange: jest.fn(),
			submitted: false,
			charsLeft: false,
			message: '',
			value: ''
		}
		wrapper = shallow(<InputText {...props} />)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should contains a state object', () => {
		expect(wrapper.state()).toEqual({...state, changed: true})
	})

	it('should  a handleOnSubmit method', () => {
		const input = wrapper.find('input')
		input.simulate('onChange', {preventDefault() {}})
		expect(props.handleOnChange).toHaveBeenCalledTimes(1)
	})
})
