import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { EditPost, mapStateToProps, mapDispatchToProps } from './../EditPost'
import { Link } from 'react-router-dom'
import FormPost from './../FormPost'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'

const mockStore = configureMockStore([thunk])
let store
let props
let provider
let wrapper

describe('<EditPost />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful({})
		store = mockStore({posts: {items: posts}})
		props = {
			post: posts[0],
			history: {push: jest.fn()},
			handleUpdate: jest.fn()
		}
		provider = shallow(<Provider store={store}><EditPost {...props} /></Provider>)
		wrapper = provider.find(EditPost).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should render a Link', () => {
		expect(wrapper.find(Link)).toHaveLength(1)
		expect(wrapper.find(Link).props()['aria-label']).toBe('Go Back')
	})

	it('should renders default elements', () => {
	  expect(wrapper.find('h2').exists()).toBeTruthy()
	})

	it('should contains a FormPost component', () => {
	  expect(wrapper.find(FormPost).exists()).toBeTruthy()
	})

	it('should contains a handleOnUpdate method', () => {
		const instance = wrapper.instance()
		instance.handleOnUpdate(true, {})
		expect(props.handleUpdate).toHaveBeenCalledTimes(1)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), {match: {params: {id: posts[0].id}}})).toHaveProperty('post', posts[0])
	})

	it('should mapDispatchToProps return props', () => {
		expect(mapDispatchToProps(store.dispatch)).toHaveProperty('handleUpdate')
	})
})
