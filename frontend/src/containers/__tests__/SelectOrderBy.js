import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { SelectOrderBy, mapStateToProps, mapDispatchToProps } from './../SelectOrderBy'
import posts from './../../__helpers__/posts'

let byId = {};
posts.map((item) => (byId[item.id] = item))
const mockStore = configureMockStore([thunk])
let store
let provider
let wrapper
let props

describe('<SelectOrderBy />', () => {

	beforeEach(() => {
		store = mockStore({posts: {items: posts, byId}})
		props = {
			items: [],
			handleOrderPostsBy: jest.fn()
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
		expect(wrapper.find('option')).toHaveLength(2)
	})

	it('should contains a handleOnChange method', () => {
		const handleOnChange = jest.spyOn(wrapper.instance(), 'handleOnChange')
   	wrapper.update()

		let event = {target: {name: '', value: 'timestamp'}}
		wrapper.simulate('change', event)

		event = {target: {name: '', value: 'voteScore'}}
		wrapper.simulate('change', event)

		expect(handleOnChange).toHaveBeenCalledTimes(2)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState())).toHaveProperty('items')
	})

	it('should mapDispatchToProps return props', () => {
		expect(mapDispatchToProps(store.dispatch)).toHaveProperty('handleOrderPostsBy')
	})
})
