import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { SelectCategory, mapStateToProps } from './../SelectCategory'
import data from './../../__helpers__/categories'

const mockStore = configureMockStore([thunk])
let store
let categories = data.categories
let provider
let wrapper
let props
const state = {
	text: '',
	changed: false,
	valid: false
}

describe('<SelectCategory />', () => {

	beforeEach(() => {
		store = mockStore({categories: {items: categories}})
		props = {
			name: 'body',
			placeholder: '',
			maxLength: 244,
			handleOnChange: jest.fn(),
			submitted: false,
			charsLeft: false,
			message: '',
			value: '',
			items: categories
		}
		provider = shallow(<Provider store={store}><SelectCategory {...props} /></Provider>)
		wrapper = provider.find(SelectCategory).shallow()
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should contains a state object', () => {
		expect(wrapper.state()).toEqual({...state, changed: true})
	})

	it('should contains an option element', () => {
		expect(wrapper.find('option')).toHaveLength(categories.length + 1)
	})

	it('should  a handleOnSubmit method', () => {
		const event = {target: {name: 'category', value: 'react'}}
		wrapper.simulate('change', event)
		expect(props.handleOnChange).toHaveBeenCalledTimes(1)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), {categories: {items: categories}})).toHaveProperty('items', categories)
	})
})
