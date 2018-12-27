import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Nav, mapStateToProps } from './../Nav'
import SelectOrderBy from './../SelectOrderBy'
import data from './../../__helpers__/categories'

const mockStore = configureMockStore([thunk])
let store
let categories = data.categories
let provider
let wrapper
let props

describe('<Nav />', () => {

	beforeEach(() => {
		store = mockStore({categories: {items: categories}})
		props = {
			items: categories
		}
		provider = shallow(<Provider store={store}><Nav {...props} /></Provider>)
		wrapper = provider.find(Nav).shallow()
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

	it('should contains NavLink components', () => {
		expect(wrapper.find(NavLink).exists()).toBeTruthy()
		expect(wrapper.find(NavLink)).toHaveLength(categories.length + 1)
	})

	it('should contains SelectOrderBy components', () => {
		expect(wrapper.find(SelectOrderBy).exists()).toBeTruthy()
		expect(wrapper.find(SelectOrderBy)).toHaveLength(1)
	})
})

