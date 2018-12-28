import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { DefaultView, mapStateToProps } from './../DefaultView'
import { Link } from 'react-router-dom'
import Nav from './../Nav'
import Post from './../Post'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'
import data from './../../__helpers__/categories'

const postsById = {}
posts.map((item) => (postsById[item.id] = item))
const mockStore = configureMockStore([thunk])
let store
let props
let provider
let wrapper

describe('<DefaultView />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful({posts})
		store = mockStore({posts: {items: posts}, categories: {items: data.categories}})
		props = {
			categories: data.categories,
			items: posts,
			dispatch: store.dispatch
		}
		provider = shallow(<Provider store={store}><DefaultView {...props} /></Provider>)
		wrapper = provider.find(DefaultView).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should render an ul element', () => {
		expect(wrapper.find('ul').exists()).toBeTruthy()
	})

	it('should contains a Nav component', () => {
		expect(wrapper.find(Nav).exists()).toBeTruthy()
		expect(wrapper.find(Nav)).toHaveLength(1)
	})

	it('should contains a Post component', () => {
		expect(wrapper.find(Post).exists()).toBeTruthy()
		expect(wrapper.find(Post)).toHaveLength(posts.length)
	})

	it('should contains a Link component', () => {
		expect(wrapper.find(Link).exists()).toBeTruthy()
		expect(wrapper.find(Link)).toHaveLength(1)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), {category: ''})).toHaveProperty('category', '')
		expect(mapStateToProps(store.getState(), {posts: ''})).toHaveProperty('items', [])
	})
})

