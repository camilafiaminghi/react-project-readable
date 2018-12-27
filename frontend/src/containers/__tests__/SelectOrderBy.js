import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { SelectOrderBy, mapStateToProps } from './../SelectOrderBy'
import posts from './../../__helpers__/posts'

const mockStore = configureMockStore([thunk])
let store
let provider
let wrapper
let props

describe('<SelectOrderBy />', () => {

	beforeEach(() => {
		store = mockStore({posts: {items: posts}})
		props = {
			success: true,
			dispatch: jest.fn()
		}
		provider = shallow(<Provider store={store}><SelectOrderBy {...props} /></Provider>)
		wrapper = provider.find(SelectOrderBy).shallow()
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy()
	})

	it('should contains a select element', () => {
		expect(wrapper.find('select')).toHaveLength(1)
	})

	it('should contains option elements', () => {
		expect(wrapper.find('option')).toHaveLength(3)
	})

	it('should contains a handleOnSubmit method', () => {
		let event = {target: {name: '', value: 'timestamp'}}
		wrapper.simulate('change', event)
		event = {target: {name: '', value: 'voteScore'}}
		wrapper.simulate('change', event)
		expect(props.dispatch).toHaveBeenCalledTimes(3)
	})
})
