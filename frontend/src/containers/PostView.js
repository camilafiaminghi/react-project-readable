import React from 'react'
import { connect } from 'react-redux'
import Post from './Post'

const PostView = ( props ) => {
	const { id } = props.match.params

	return (
		<div className="post-details">
			<Post id={id} />
		</div>
	)
}

export default PostView
