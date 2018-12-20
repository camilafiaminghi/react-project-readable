import React from 'react';
import { Comment } from './Comment'
import comments from '../__helpers__/comments'

let comment = comments[0]
let commentId = comment.id
let wrapper

describe('<Comment />', () => {
	beforeEach(() => {
		wrapper = shallow(<Comment id={commentId} comment={comment} />)
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

