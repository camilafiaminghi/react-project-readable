import React from 'react';
import { MemoryRouter } from 'react-router';
import PostView from './../PostView'

let wrapper

describe('<PostView />', () => {
	beforeEach(() => {
		wrapper = shallow(<MemoryRouter>
			<PostView
				match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}
				referer="/" />
			</MemoryRouter>
		)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})
})

