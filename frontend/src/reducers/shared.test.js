import { ERROR_LOADING } from '../actions/shared'
import { loading } from './shared'

const initialState = {
	error: true
}

describe('loading reducer', () => {
	it('should handle initial state', () => {
		expect(loading(initialState, {})).toEqual(initialState)
	})

	it('should handle ERROR_LOADING', () => {
		expect(loading(initialState, {
			error: true
		})).toMatchObject({})
	})
})
