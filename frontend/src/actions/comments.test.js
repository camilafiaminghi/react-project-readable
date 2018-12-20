import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { REQUEST_COMMENTS, RECEIVE_COMMENTS,  receiveComments, requestComments, handleComments } from './comments'
import fetch from '../__helpers__/fetch'
import comments from '../__helpers__/comments'

const configStore = configureMockStore([thunk])
const store = configStore({
	items: undefined
})

describe('comments action creators', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	it('receiveComments should return an object', () => {
		expect(receiveComments()).toEqual({
			type: RECEIVE_COMMENTS,
			items: undefined
		})
	})

	it('requestComments should return an object', () => {
		expect(requestComments()).toEqual({
			type: REQUEST_COMMENTS,
			items: undefined
		})
	})

	// TEST ASYNC PASS THROUGH THUNK
	it('successful handleComments calls receiveComments', () => {
		window.fetch = fetch.successful(comments)

		const expectAction = [
			{ type: REQUEST_COMMENTS },
			{ type: RECEIVE_COMMENTS, items: comments },
		]

		return store.dispatch(handleComments())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
