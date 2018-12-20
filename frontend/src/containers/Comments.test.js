import React from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Comments } from './Comments'
import fetch from '../__helpers__/fetch'
import comments from '../__helpers__/comments'

const initialState = {
	comments: {
		isFetching: false,
		items: []
	}
}
const mockStore = configureMockStore([thunk])
let store
let wrapper

describe('<Comments />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful(comments)

		store = mockStore(initialState)

		wrapper = shallow(
			<Comments
				dispatch={store.dispatch}
				comments={comments} />
		)
	})

	it('renders without crashing', () => {
		expect(wrapper).toBeDefined()
	})
})

