import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { FormComment } from './../FormComment'
import InputText from './../InputText'
import InputTextArea from './../InputTextArea'
import { validation, isValid } from './../../utils/validation'
import fetch from './../../__helpers__/fetch'
import comments from './../../__helpers__/comments'

const mockStore = configureMockStore([thunk])
let store
let props
let provider
let wrapper
const comment = {
	author: '',
	body: ''
}
const state = {
	form: comment,
	validation: {author: false, body: false},
	validated: false,
	submitted: false
}
const stateChanged = {
	form: {...comment, author: 'test', body: 'test'},
	validation: {author: true, body: true},
	validated: true,
	submitted: false
}

describe('<FormComment />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful({})
		store = mockStore({comments: {items: comments}})
		props = {
			handleSubmit: jest.fn(),
			category: '',
			comment: comment
		}
		provider = shallow(<Provider store={store}><FormComment {...props} /></Provider>)
		wrapper = provider.find(FormComment).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should contains Components', () => {
		expect(wrapper.find(InputText)).toHaveLength(1)
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
		instance.handleOnChange('body', 'test', true)
		expect(wrapper.state()).toMatchObject(stateChanged)
	})

	it('should contains a handleOnSubmit method', () => {
		wrapper.simulate('submit', {preventDefault() {}})
		expect(props.handleSubmit).toHaveBeenCalledTimes(1)
	})
})
