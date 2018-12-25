import React from 'react';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import App from './../App'
import DefaultView from './../DefaultView'
import fetch from './../../__helpers__/fetch'
import data from './../../__helpers__/categories'

const initialState = {
	categories: {
		isFetching: false,
		items: data.categories.map(item => (`/${item.path}`))
	}
}
const mockStore = configureMockStore([thunk])
let store
let wrapper
let routes = data.categories.map(item => (`/${item.path}`));

describe('<App />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful({data: data})

		store = mockStore(initialState)

		wrapper = shallow(
			<App
				dispatch={store.dispatch}
				routes={routes} />
		)
	})

	it('should render', () => {
    expect(wrapper).toBeTruthy();
  })

	it('renders component DefaultView', () => {
	  expect(wrapper.containsAllMatchingElements([DefaultView])).toBeTruthy()
	})
})
