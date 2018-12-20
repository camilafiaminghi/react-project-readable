import React from 'react';
import PostView from './PostView'

let wrapper

describe('<PostView />', () => {
	beforeEach(() => {
		wrapper = shallow(<PostView match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}/>)
	})

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	})
})

