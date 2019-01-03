import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Comment, mapStateToProps } from './../Comment'
import FormComment from './../FormComment'
import fetch from './../../__helpers__/fetch'
import comments from './../../__helpers__/comments'

const byId = {}
comments.map((item) => (byId[item.id] = item))
const mockStore = configureMockStore([thunk])
let store
let comment = comments[0]
let provider
let wrapper
let props
const state = {
	editComment: false
}

describe('<Comment />', () => {
	beforeEach(() => {
		window.fetch = fetch.successful()
		store = mockStore({success: true, byId})
		props = {
			id: comments[0].id,
			comment,
			handleVote: jest.fn(),
			handleRemove: jest.fn(),
			handleUpdate: jest.fn()
		}
		provider = shallow(<Provider store={store}><Comment {...props} /></Provider>)
		wrapper = provider.find(Comment).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('renders default elements', () => {
		expect(wrapper.find('.vote-score')).toBeTruthy()
		expect(wrapper.find('.details')).toBeTruthy()
	  expect(wrapper.find('.controls')).toBeTruthy()
	  expect(wrapper.find('.form-edit')).toBeTruthy()

	  expect(wrapper.find('button[aria-label="Increase Vote Score"]')).toBeTruthy()
		expect(wrapper.find('button[aria-label="Decrease Vote Score"]')).toBeTruthy()
	  expect(wrapper.find('button[aria-label="Edit Comment"]')).toBeTruthy()
		expect(wrapper.find('button[aria-label="Remove Comment"]')).toBeTruthy()
	})

	it('should contains a state object', () => {
		expect(wrapper.state()).toEqual({...state})
	})

	it('should change state editComment to true', () => {
		const button = wrapper.find('button[aria-label="Edit Comment"]')
		button.simulate('click')
		expect(wrapper.state()).toEqual({...state, editComment: true})
	})

	it('should handleVote method', () => {
		const button = wrapper.find('button[aria-label="Increase Vote Score"]')
		button.simulate('click')
		expect(props.handleVote).toHaveBeenCalled()
	})

	it('should handleRemove method', () => {
		const button = wrapper.find('button[aria-label="Remove Comment"]')
		button.simulate('click')
		expect(props.handleRemove).toHaveBeenCalled()
	})

	/**/
	it('should change state editComment to false', () => {
		wrapper.setState({editComment: true})
		const button = wrapper.find('button[aria-label="Cancel Comment"]')
		expect(button).toBeTruthy()
		button.simulate('click')
		wrapper.update()

		expect(wrapper.state()).toEqual({...state, editComment: false})
	})

	it('should handleOnUpdate', () => {
		const handleUpdate = jest.spyOn(wrapper.instance(), 'handleOnUpdate')
		wrapper.update()
		wrapper.setState({editComment: true})

		handleUpdate(true, comments[0])
		expect(handleUpdate).toHaveBeenCalled()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps({comments: store.getState()}, {id: comments[0].id})).toHaveProperty('comment', comments[0])
	})
})

