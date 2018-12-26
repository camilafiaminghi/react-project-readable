import React from 'react';
import { MemoryRouter } from 'react-router';

import PostView from './../PostView'
import Post from './../../containers/Post'
import Comments from './../../containers/Comments'

let router
let wrapper
const props = {
	match: {params : {id: '8xf0y6ziyjabvozdd253nd'}},
	referer: '/',
	history: {push: jest.fn()},
	location: {state: {pathname: ''}}
}

describe('<PostView />', () => {
	beforeEach(() => {

		router = shallow(
			<MemoryRouter>
				<PostView {...props} />
			</MemoryRouter>
		)

		wrapper = router.find(PostView)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})

	it('should render a Button', () => {
		expect(wrapper.shallow().find('button')).toHaveLength(1)
		expect(wrapper.shallow().find('button').props()).toHaveProperty('onClick')
	})

	it('should simulates a Click', () => {
		const button = wrapper.shallow().find('button')

		button.simulate('click')
		expect(props.history.push).toHaveBeenCalledTimes(1)
	})

	it('should render a Post component', () => {
		expect(wrapper.shallow().find(Post)).toHaveLength(1)
		expect(wrapper.shallow().find(Post).props()).toHaveProperty('id')
	})

	it('should render a Comments component', () => {
		expect(wrapper.shallow().find(Comments)).toHaveLength(1)
		expect(wrapper.shallow().find(Comments).props()).toHaveProperty('id')
	})
})

