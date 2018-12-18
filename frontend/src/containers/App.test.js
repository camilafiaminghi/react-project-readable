import React from 'react';
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom';
import configureMockStore from 'redux-mock-store'
import App from './App'
import DefaultView from './DefaultView'

const initialState = {
	categories: {
		isFetching: false,
		items: []
	}
}
const mockStore = configureMockStore()
let store;

describe('<App />', () => {
	let routes = {};

	beforeEach(() => {
		store = mockStore(initialState)
	})

	it('renders without crashing', () => {
		shallow(<App />);
	})

	it('renders initial path', () => {
		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={[ '/' ]}>
					<DefaultView/>
				</MemoryRouter>
			</Provider>
		)

	  expect(wrapper.find(DefaultView)).toHaveLength(1);
	});
})
