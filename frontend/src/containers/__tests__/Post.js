import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Link } from 'react-router-dom'
import { Post, mapStateToProps } from './../Post'
import FormPost from './../FormPost'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'

const byId = {}
posts.map((item) => (byId[item.id] = item))
const mockStore = configureMockStore([thunk])
let store
let comment = posts[0]
let provider
let wrapper
let props

describe('<Post />', () => {
	beforeEach(() => {
		window.fetch = fetch.successful()
		store = mockStore({success: true, byId})
		props = {
			id: posts[0].id,
			post: posts[0],
			singleView: true,
			handleVote: jest.fn(),
			handleRemove: jest.fn()
		}
		provider = shallow(<Provider store={store}><Post {...props} /></Provider>)
		wrapper = provider.find(Post).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('renders default elements', () => {
		expect(wrapper.find('.vote-score')).toBeTruthy()
		expect(wrapper.find('.details')).toBeTruthy()
	  expect(wrapper.find('.controls')).toBeTruthy()
	  expect(wrapper.find('.count')).toBeTruthy()

	  expect(wrapper.find('button[aria-label="Increase Vote Score"]')).toBeTruthy()
		expect(wrapper.find('button[aria-label="Decrease Vote Score"]')).toBeTruthy()
	  expect(wrapper.find('button[aria-label="Remove Post"]')).toBeTruthy()
	  expect(wrapper.find(Link)).toBeTruthy()
	  expect(wrapper.find('a[aria-label="Edit Post"]')).toBeTruthy()
	})

	it('should handleVote method', () => {
		const button = wrapper.find('button[aria-label="Increase Vote Score"]')
		button.simulate('click', {preventDefault() {}})
		expect(props.handleVote).toHaveBeenCalled()
	})

	it('should handleRemove method', () => {
		const button = wrapper.find('button[aria-label="Remove Post"]')
		button.simulate('click', {preventDefault() {}})
		expect(props.handleRemove).toHaveBeenCalled()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps({posts: store.getState()}, {id: posts[0].id})).toHaveProperty('id', posts[0].id)
		expect(mapStateToProps({posts: store.getState()}, {id: posts[0].id})).toHaveProperty('post', posts[0])
		expect(mapStateToProps({posts: store.getState()}, {id: posts[0].id})).toHaveProperty('pathname', undefined)
	})
})

