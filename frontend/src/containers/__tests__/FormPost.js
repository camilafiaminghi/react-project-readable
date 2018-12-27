import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { FormPost } from './../FormPost'
import InputText from './../InputText'
import InputTextArea from './../InputTextArea'
import SelectCategory from './../SelectCategory'
import { validation, isValid } from './../../utils/validation'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'

const mockStore = configureMockStore([thunk])
let store
let props
let provider
let wrapper
const post = {
	author: '',
	title: '',
	body: '',
	category: 0
}
const state = {
	form: post,
	validation: {author: false, title: false, category: false},
	validated: false,
	submitted: false
}
const stateChanged = {
	form: {...post, author: 'test', title: 'test', category: 'test'},
	validation: {author: true, title: true, category: true},
	validated: true,
	submitted: false
}

describe('<FormPost />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful({})
		store = mockStore({posts: {items: posts}})
		props = {
			handleSubmit: jest.fn(),
			category: '',
			post: post
		}
		provider = shallow(<Provider store={store}><FormPost {...props} /></Provider>)
		wrapper = provider.find(FormPost).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should contains Components', () => {
		expect(wrapper.find(SelectCategory)).toHaveLength(1)
		expect(wrapper.find(InputText)).toHaveLength(2)
		expect(wrapper.find(InputTextArea)).toHaveLength(1)
	})

	it('should contains a button', () => {
		expect(wrapper.find('button').props().type).toEqual('submit')
	})

	it('should contains a state object', () => {
		expect(wrapper.state()).toEqual(state)
	})

	it('should contains a handleOnChange method', () => {
		const instance = wrapper.instance()
		instance.handleOnChange('author', 'test', true)
		instance.handleOnChange('title', 'test', true)
		instance.handleOnChange('category', 'test', true)
		expect(wrapper.state()).toMatchObject(stateChanged)
	})

	it('should contains a handleOnSubmit method', () => {
		wrapper.simulate('submit', {preventDefault() {}})
		expect(props.handleSubmit).toHaveBeenCalledTimes(1)
	})
})
