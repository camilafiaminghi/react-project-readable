import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { EditPost, mapStateToProps } from './../EditPost'
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
			dispatch: jest.fn()
		}
		provider = shallow(<Provider store={store}><EditPost {...props} /></Provider>)
		wrapper = provider.find(EditPost).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should render a Button', () => {
		expect(wrapper.find('button')).toHaveLength(1)
		expect(wrapper.find('button').props()).toHaveProperty('onClick')
	})

	it('should simulates a Click', () => {
		const button = wrapper.find('button')

		button.simulate('click')
		expect(props.history.push).toHaveBeenCalledTimes(1)
	})

	it('should renders default elements', () => {
	  expect(wrapper.find('h2').exists()).toBeTruthy()
	})

	it('should contains a FormPost component', () => {
	  expect(wrapper.find(FormPost).exists()).toBeTruthy()
	})

	it('should contains a handleUpdate method', () => {
		const instance = wrapper.instance()
		instance.handleUpdate(true, {})
		expect(props.dispatch).toHaveBeenCalledTimes(1)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), {match: {params: {id: posts[0].id}}})).toHaveProperty('post', posts[0])
	})
})
