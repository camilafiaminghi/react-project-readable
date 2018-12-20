import React from 'react';
import ButtonGoBack from './ButtonGoBack'

let wrapper
const goBack = jest.fn()

describe('<ButtonGoBack />', () => {
	beforeEach(() => {
		wrapper = mount(<ButtonGoBack goBack={goBack} />)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('should render a button with a text', () => {
		expect(wrapper.text()).toBe('Go Back')
		expect(wrapper.children().type()).toEqual('button')
	})

	it('should have a function to be called', () => {
		wrapper.simulate('click')
		expect(wrapper.text()).toBe('Go Back')
		expect(goBack).toHaveBeenCalled()
	})
})

