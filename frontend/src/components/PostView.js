import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Post from '../containers/Post'
import Comments from '../containers/Comments'

const PostView = (props) => {
	const { category, id } = props.match.params

	return (
		<Fragment>
				<nav>
					<Link
						to={`/${category}`}
						aria-label="Go Back">
						<i className="material-icons">arrow_back</i>
					</Link>
				</nav>
				<div className="bordered-top">
					<Post id={id} singleView={true} />
					<Comments parentId={id} />
				</div>
		</Fragment>
	)
}

export default PostView
