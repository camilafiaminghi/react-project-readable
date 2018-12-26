import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Comment, mapStateToProps } from './../Comment'
import comments from './../../__helpers__/comments'

const mockStore = configureMockStore([thunk])
let store
let comment = comments[0]
let commentId = comment.id
let provider
let wrapper

describe('<Comment />', () => {
	beforeEach(() => {
		store = mockStore({comments: {items: comments}})
		provider = shallow(<Provider store={store}><Comment comment={comment} /></Provider>)
		wrapper = provider.find(Comment).shallow()
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('should renders default elements', () => {
		expect(wrapper.find('.header').exists()).toBeTruthy()
		expect(wrapper.find('section').exists()).toBeTruthy()
	  expect(wrapper.find('h2').exists()).toBeTruthy()
	  expect(wrapper.find('.content').exists()).toBeTruthy()
	  expect(wrapper.find('.footer').exists()).toBeTruthy()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState(), {id: commentId})).toHaveProperty('comment', comment)
	})
})

