import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { NewPost, mapStateToProps } from './../NewPost'
import FormPost from './../FormPost'
import comments from './../../__helpers__/comments'

const mockStore = configureMockStore([thunk])
let store
let provider
let wrapper
let props

describe('<NewPost />', () => {

	beforeEach(() => {
		store = mockStore({})
		props = {
			location: {state: {category: ''}},
			dispatch: jest.fn()
		}
		provider = shallow(<Provider store={store}><NewPost {...props} /></Provider>)
		wrapper = provider.find(NewPost).shallow()
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('renders default elements', () => {
		expect(wrapper.find('h2')).toBeTruthy()
		expect(wrapper.find(FormPost)).toBeTruthy()
	})

	it('should handleSave', () => {
		const handleSave = jest.spyOn(wrapper.instance(), 'handleSave')
		wrapper.update()

		handleSave(true, comments[0])
		expect(handleSave).toHaveBeenCalled()
	})
})

