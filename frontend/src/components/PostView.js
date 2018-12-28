import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Post from '../containers/Post'
import Comments from '../containers/Comments'

const PostView = (props) => {
	const { id } = props.match.params
	const pathname = (props.location.state) ? props.location.state.pathname : ''

	return (
		<Fragment>
				<nav>
					<Link
						to={`/${pathname}`}
						aria-label="Go Back">
						<i className="material-icons">arrow_back</i>
					</Link>
				</nav>
				<div className="bordered-top">
					<Post id={id} />
					<Comments parentId={id} />
				</div>
		</Fragment>
	)
}

export default PostView
