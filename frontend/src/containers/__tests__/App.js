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
import dataCategories from './../../__helpers__/categories'
import dataPosts from './../../__helpers__/posts'

let postsById = {};
dataPosts.map((item) => (postsById[item.id] = item))
let categoriesByPath = [];
dataCategories.categories.map((item) => (categoriesByPath.push(item.path)))

const mockStore = configureMockStore([thunk])
let mock
let store
let props
let provider
let wrapper

describe('<App />', () => {

	beforeEach(() => {
		window.fetch = fetch.successful()
		mock = {categories: {byPath: categoriesByPath, success:true}, posts: {byId: postsById, success: true}}
		store = mockStore(mock)
		props = {
			initialDataError: false,
			dispatch: store.dispatch,
			handleInitialData: jest.fn(),
			success: true,
			posts: mock.posts,
			categories: mock.categories
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
		expect(wrapper.find(Route)).toHaveLength(7)
	})

	it('should mapStateToProps return props', () => {
		expect(mapStateToProps(store.getState())).toHaveProperty('success')
		expect(mapStateToProps(store.getState())).toHaveProperty('categories')
		expect(mapStateToProps(store.getState())).toHaveProperty('posts')
	})

	it('should mapDispatchToProps return props', () => {
		expect(mapDispatchToProps(store.dispatch)).toHaveProperty('handleInitialData')
	})
})
