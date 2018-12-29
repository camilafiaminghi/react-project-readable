import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Comments, mapStateToProps } from './../Comments'
import Comment from './../Comment'
import FormComment from './../FormComment'
import fetch from './../../__helpers__/fetch'
import comments from './../../__helpers__/comments'
import posts from './../../__helpers__/posts'

const byId = {}
comments.map((item) => (byId[item.id] = item))
const mockStore = configureMockStore([thunk])
let store
let comment = comments[0]
let provider
let wrapper
let props
const state = {
	addComment: false
}

describe('<Comments />', () => {
	beforeEach(() => {
		window.fetch = fetch.successful()
		store = mockStore({success: true, byId})
		props = {
			parentId: posts[0].id,
			items: Object.keys(byId),
			dispatch: jest.fn()
		}
		provider = shallow(<Provider store={store}><Comments {...props} /></Provider>)
		wrapper = provider.find(Comments).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('renders default elements', () => {
		expect(wrapper.find('button[aria-label="Add comment"]')).toBeTruthy()
		expect(wrapper.find('.items')).toBeTruthy()
		expect(wrapper.find(Comment)).toBeTruthy()
		expect(wrapper.find(FormComment)).toBeTruthy()
	})

	it('should contains a state object', () => {
		expect(wrapper.state()).toEqual({...state})
	})

	it('should contains Comment components instances', () => {
		expect(wrapper.find(Comment)).toHaveLength(comments.length)
	})

	it('should change state addComment to true', () => {
		const button = wrapper.find('button[aria-label="Add Comment"]')
		button.simulate('click')
		expect(wrapper.state()).toEqual({...state, addComment: true})
	})

	/**/
	it('should change state addComment to false', () => {
		wrapper.setState({addComment: true})
		const button = wrapper.find('button[aria-label="Cancel Comment"]')
		expect(button).toBeTruthy()
		button.simulate('click')
		wrapper.update()

		expect(wrapper.state()).toEqual({...state, addComment: false})
	})

	it('should handleSave', () => {
		const handleSave = jest.spyOn(wrapper.instance(), 'handleSave')
		wrapper.update()
		wrapper.setState({addComment: true})

		handleSave(true, comments[0])
		expect(handleSave).toHaveBeenCalled()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps({comments: store.getState()}, {parentId: posts[0].id})).toHaveProperty('parentId', posts[0].id)
		expect(mapStateToProps({comments: store.getState()}, {parentId: posts[0].id})).toHaveProperty('items', Object.keys(byId))
	})
})

