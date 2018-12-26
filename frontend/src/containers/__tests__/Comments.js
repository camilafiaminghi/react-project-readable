import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Comments, mapStateToProps } from './../Comments'
import Comment from './../Comment'
import fetch from './../../__helpers__/fetch'
import comments from './../../__helpers__/comments'
import posts from './../../__helpers__/posts'

const mockStore = configureMockStore([thunk])
let store
let props
let provider
let wrapper

describe('<Comments />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful({comments})
		store = mockStore({comments: {items: comments}})
		props = {
			comments,
			id: posts[0].id,
			dispatch: store.dispatch
		}
		provider = shallow(<Provider store={store}><Comments {...props} /></Provider>)
		wrapper = provider.find(Comments).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should render an ul element', () => {
		expect(wrapper.find('ul').exists()).toBeTruthy()
	})

	it('should contains Comment component', () => {
		expect(wrapper.find(Comment).exists()).toBeTruthy()
		expect(wrapper.find(Comment)).toHaveLength(comments.length)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), {id: posts[0].id})).toHaveProperty('comments', comments)
		expect(mapStateToProps(store.getState(), {id: posts[0].id})).toHaveProperty('id', posts[0].id)
	})
})

