import React, { Fragment } from 'react';
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { App, mapStateToProps, mapDispatchToProps } from './../App'

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
			initialDataError: false,
			dispatch: store.dispatch,
			handleInitialData: jest.fn()
		}
		provider = shallow(<Provider store={store}><App {...props} /></Provider>)
		wrapper = provider.find(App).shallow()
	})

	afterEach(() => store.clearActions())

	it('should render', () => {
		expect(wrapper).toBeTruthy();
  })

  it('should dispatch handleInitialData on componentDidMount', () => {
  	wrapper.instance().componentDidMount()
  	expect(props.handleInitialData).toHaveBeenCalled()
  })

	it('should contains components: LoadingBar, Switch, Route', () => {
		expect(wrapper.find(LoadingBar).exists()).toBeTruthy()
		expect(wrapper.find(Switch).exists()).toBeTruthy()
		expect(wrapper.find(Route)).toHaveLength(9)
	})

	it('should renders a div className .error if error', () => {
		wrapper = provider.find(App).dive().setProps({initialDataError: true})
		expect(wrapper.find('.error').exists()).toBeTruthy()
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState())).toHaveProperty('routes', ['react', 'redux', 'udacity'])
		expect(mapStateToProps(store.getState())).toHaveProperty('initialDataError', false)
	})

	it('should mapDispatchToProps return props', () => {
		expect(mapDispatchToProps(store.dispatch)).toHaveProperty('handleInitialData')
	})
})
