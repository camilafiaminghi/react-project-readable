import React from 'react'
import Post from '../containers/Post'
import Comments from '../containers/Comments'

const PostView = (props) => {
	const { id } = props.match.params

	return (
		<div className="post-details">
			<Post id={id} />
			<Comments id={id} />
		</div>
	)
}

export default PostView
