import React from 'react';
import RouteNotFound from './RouteNotFound'
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom';

let wrapper

describe('<RouteNotFound />', () => {
	beforeEach(() => {
		wrapper = mount(<MemoryRouter><RouteNotFound /></MemoryRouter>)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('should render a title and a link to home', () => {
		expect(wrapper.find(RouteNotFound).find('h2').text()).toBe('Route not found')
		expect(wrapper.find(RouteNotFound).find(Link).find('a').text()).toBe('go to home')
		expect(wrapper.find(RouteNotFound).find(Link).find('a').prop('href')).toBe('/')
	})

	it('should have an onClick defined', () => {
		const link = wrapper.find(RouteNotFound).find(Link).find('a')
		expect(link.props().onClick).toBeDefined()
	})
})

