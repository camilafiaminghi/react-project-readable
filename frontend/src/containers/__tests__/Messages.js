import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Messages, mapStateToProps } from './../Messages'

const mockStore = configureMockStore([thunk])
let store
let provider
let wrapper
let props

describe('<Messages />', () => {

	beforeEach(() => {
		store = mockStore({categories: {items: categories}})
		props = {
			postFailure: false,
			commentFailure: false
		}
		provider = shallow(<Provider store={store}><Messages {...props} /></Provider>)
		wrapper = provider.find(Messages).shallow()
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should render a nav element', () => {
		expect(wrapper.find('nav').exists()).toBeTruthy()
	})

	it('should contains an ul element', () => {
		expect(wrapper.find('ul').exists()).toBeTruthy()
	})

	it('should contains SelectOrderBy components', () => {
		expect(wrapper.find(SelectOrderBy).exists()).toBeTruthy()
		expect(wrapper.find(SelectOrderBy)).toHaveLength(1)
	})
})

