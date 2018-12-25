import React from 'react';
import { Post } from './../Post'
import posts from './../../__helpers__/posts'

let post = posts[0]
let postId = post.id
let wrapper
let goBack = jest.fn()
let props = {
	id: postId,
	post: post,
	history: {
		goBack
	},
	location: {pathname: ''},
	singleView: false,
	action: '',
	success: false
}

describe('<Post />', () => {
	beforeEach(() => {
		wrapper = shallow(<Post {...props} />)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('renders default elements', () => {

		expect(wrapper.find('.header')).toBeDefined()
		expect(wrapper.find('section')).toBeDefined()
	  expect(wrapper.find('h2')).toBeDefined()
	  expect(wrapper.find('.content')).toBeDefined()
	  expect(wrapper.find('.footer')).toBeDefined()
	})
})

