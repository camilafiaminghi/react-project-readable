import React from 'react';
import InputTextArea from './InputTextArea'

const props = {
	name: '',
	placeholder: '',
	maxLength: 122,
	handleChange: jest.fn()
}

describe('<InputTextArea />', () => {

	it('renders without crashing', () => {
		shallow(<InputTextArea {...props} />);
	})
})

