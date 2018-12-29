import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Messages, mapStateToProps } from './../Messages'

const mockStore = configureMockStore([thunk])
let store
let provider
let wrapper
let props

describe('<Messages />', () => {

	beforeEach(() => {
		store = mockStore({categories: {failure: 'vote'}, posts: {failure: ''}})
		props = {
			postFailure: 'vote',
			commentFailure: '',
			dispatch: jest.fn()
		}
		provider = shallow(<Provider store={store}><Messages {...props} /></Provider>)
		wrapper = provider.find(Messages).shallow()
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('renders default elements', () => {
		expect(wrapper.find('.modal')).toBeTruthy()
		expect(wrapper.find('.modal-mask')).toBeTruthy()
	  expect(wrapper.find('.modal-content')).toBeTruthy()
	  expect(wrapper.find('button[aria-label="Close alert"]')).toBeTruthy()
	})

	it('should handleClose from button', () => {
		const handleClose = jest.spyOn(wrapper.instance(), 'handleClose')
		const button = wrapper.find('button[aria-label="Close alert"]')
		button.simulate('click', {preventDefault(){}})
		expect(props.dispatch).toHaveBeenCalled()
	})

	it('should handleClose from mask', () => {
		const handleClose = jest.spyOn(wrapper.instance(), 'handleClose')
		const button = wrapper.find('.modal-mask')
		button.simulate('click', {preventDefault(){}})
		expect(props.dispatch).toHaveBeenCalled()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps({comments: {failure: ''}, posts: {failure: 'vote'}})).toHaveProperty('postFailure', 'vote')
	})
})

