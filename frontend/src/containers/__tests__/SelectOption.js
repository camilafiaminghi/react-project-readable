import React from 'react';
import SelectOption from './../SelectOption'

const props = {
	name: '',
	placeholder: '',
	handleChange: jest.fn(),
	items: [],
	initialOption: ''
}

describe('<SelectOption />', () => {

	it('renders without crashing', () => {
		shallow(<SelectOption {...props} />);
	})
})

