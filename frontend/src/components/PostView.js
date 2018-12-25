import React from 'react'
import Post from '../containers/Post'
import Comments from '../containers/Comments'
import ButtonGoBack from './ButtonGoBack'

const PostView = (props) => {
	const { id } = props.match.params

	return (
		<div className="post-details">
			<div className="top">
				<ButtonGoBack goBack={props.history.goBack} />
			</div>
			<Post id={id} singleView={true} />
			<Comments id={id} />
		</div>
	)
}

export default PostView
