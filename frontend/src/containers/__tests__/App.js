import React, { Fragment } from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { App, mapStateToProps } from './../App'

import DefaultView from './../DefaultView'
import PostView from './../../components/PostView'
import NewPost from './../NewPost'
import EditPost from './../EditPost'
import RouteNotFound from './../../components/RouteNotFound'
import LoadingBar from 'react-redux-loading-bar'

import fetch from './../../__helpers__/fetch'
import data from './../../__helpers__/categories'
import posts from './../../__helpers__/posts'

const mockStore = configureMockStore([thunk])
let store
let props
let provider
let wrapper

describe('<App />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful({data: data})
		store = mockStore({categories: {items:data.categories, error:false}, posts: {items: posts, error: false}})
		props = {
			routes: data.categories.map(item => (`/${item.path}`)),
			loadingError: false,
			dispatch: store.dispatch
		}
		provider = shallow(<Provider store={store}><App {...props} /></Provider>)
		wrapper = provider.find(App).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy();
  })

	it('should contains components: LoadingBar, Switch, Route', () => {
		expect(wrapper.find(LoadingBar).exists()).toBeTruthy()
		expect(wrapper.find(Switch).exists()).toBeTruthy()
		expect(wrapper.find(Route)).toHaveLength(8)
	})

	it('should renders a div className .error if error', () => {
		wrapper = provider.find(App).dive().setProps({loadingError: true})
		expect(wrapper.find('.error').exists()).toBeTruthy()
	})

	it('should mapStateToProps return props', () => {
		 expect(mapStateToProps(store.getState())).toHaveProperty('routes', ['react', 'redux', 'udacity'])
		 expect(mapStateToProps(store.getState())).toHaveProperty('loadingError', false)
	})
})
