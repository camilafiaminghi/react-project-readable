import React from 'react';
import InputText from './InputText'

const props = {
	name: '',
	placeholder: '',
	maxLength: 122,
	handleChange: jest.fn()
}

describe('<InputText />', () => {

	it('renders without crashing', () => {
		shallow(<InputText {...props} />);
	})
})

