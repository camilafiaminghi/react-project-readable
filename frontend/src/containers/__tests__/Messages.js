import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Messages, mapStateToProps, mapDispatchToProps } from './../Messages'

const mockStore = configureMockStore([thunk])
let store
let provider
let wrapper
let props

describe('<Messages />', () => {

	beforeEach(() => {
		store = mockStore({categories: {failure: 'vote'}, posts: {failure: ''}})
		props = {
			categoriesFailure: '',
			postsFailure: 'vote',
			commentFailure: '',
			handleCleanAllFailures: jest.fn()
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

	it('should handleCleanAllFailures from button', () => {
		const button = wrapper.find('button[aria-label="Close alert"]')
		button.simulate('click', {preventDefault(){}})
		expect(props.handleCleanAllFailures).toHaveBeenCalled()
	})

	it('should handleCleanAllFailures from mask', () => {
		const mask = wrapper.find('.modal-mask')
		mask.simulate('click', {preventDefault(){}})
		expect(props.handleCleanAllFailures).toHaveBeenCalled()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps({comments: {failure: ''}, posts: {failure: 'vote'}, categories: {failure: ''}})).toHaveProperty('postsFailure', 'vote')
	})

	it('should mapDispatchToProps return props', () => {
		expect(mapDispatchToProps(store.dispatch)).toHaveProperty('handleCleanAllFailures')
	})
})

