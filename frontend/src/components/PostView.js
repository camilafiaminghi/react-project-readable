import React from 'react'
import { Link } from 'react-router-dom'
import Post from '../containers/Post'
import Comments from '../containers/Comments'

const PostView = (props) => {
	const { id } = props.match.params
	const pathname = (props.location.state) ? props.location.state.pathname : ''

	return (
		<div>
			<nav>
				<Link
					to={`/${pathname}`}
					aria-label="Go Back">
					<i className="material-icons">arrow_back</i>
				</Link>
			</nav>
			<div className="bordered-top">
				<Post id={id} />
				<Comments id={id} />
			</div>
		</div>
	)
}

export default PostView
