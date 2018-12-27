import React from 'react'
import Post from '../containers/Post'
import Comments from '../containers/Comments'

const PostView = (props) => {
	const { id } = props.match.params
	const { push } = props.history
	const pathname = (props.location.state) ? props.location.state.pathname : ''

	return (
		<div>
			<button onClick={() => push(`/${pathname}`)}>Go Back {(!pathname) ? 'to Home': `to /${pathname}`}</button>
			<Post id={id} />
			<Comments id={id} />
		</div>
	)
}

export default PostView
