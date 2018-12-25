import React from 'react';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'
import { NewPost } from './../NewPost'
import ButtonGoBack from './../../components/ButtonGoBack'
import data from './../../__helpers__/categories'

const props = {
	history: {
		goBack: jest.fn()
	},
	categories: data.categories,
	success: false
}
const initialState = {
	form : {
		author: '',
		title: '',
		body: '',
		category: ''
	},
	validation: {
		author: false,
		title: false,
		category: false
	},
	validated: false,
	submitted: false
}
const mockStore = configureMockStore([thunk])
let store
let wrapper
const handleSubmit = jest.fn();

describe('<NewPost />', () => {
	beforeEach(() => {

		store = mockStore({})

		const provider = mount(
			<Provider store={store}>
				<NewPost {...props} />
			</Provider>
		)

		wrapper = provider.find(NewPost)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('should renders default elements', () => {
		expect(wrapper.find(ButtonGoBack).find('button').type()).toBe('button')
		expect(wrapper.find('h2').exists).toBeTruthy()
		expect(wrapper.find('form').exists).toBeTruthy()
		expect(wrapper.find('input[name="author"]').exists).toBeTruthy()
		expect(wrapper.find('input[name="category"]').exists).toBeTruthy()
		expect(wrapper.find('input[name="title"]').exists).toBeTruthy()
		expect(wrapper.find('input[name="body"]').exists).toBeTruthy()
		expect(wrapper.find('button[type="submit"]').exists).toBeTruthy()
	})

	it('should have initial state', () => {
		expect(wrapper.state()).toMatchObject(initialState)
	})

	it('should submit the form', () => {
		const form = wrapper.find('form')
		const button = wrapper.find('button[type="submit"]')

		wrapper.instance().handleSubmit = handleSubmit
		button.simulate('submit', { preventDefault () {} })
		expect(wrapper.state().submitted).toEqual(true)
	})
})

