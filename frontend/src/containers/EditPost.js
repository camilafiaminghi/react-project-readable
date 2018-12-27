import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleUpdatePost } from '../actions/posts'
import FormPost from './FormPost'

export class EditPost extends Component {

	static propTypes = {
		post: PropTypes.object
	}

	handleUpdate = (validated, form) => {
		const { dispatch, post } = this.props
		/* DISPATCH IF IS VALID */
		if (validated) {
			dispatch(handleUpdatePost(post.id, form))
		}
	}

	render() {
		const { post } = this.props
		const { push } = this.props.history

		return (
			<div className="new-post">
				{ (post) &&
					<div>
						<div className="top">
							<button onClick={() => push(`/post/${post.id}`)}>Go Back</button>
						</div>
						<div>
							<h2 className="center">Edit Post</h2>
							<FormPost handleSubmit={this.handleUpdate} category={post.category} post={post} />
						</div>
					</div>
				}
			</div>
		)
	}
}

export const mapStateToProps = ({ posts }, props) => {
	const { id } = props.match.params
	const post = posts.items.filter((item) => (item.id === id))[0]

	return {
		post
	}
}

export default connect(mapStateToProps)(EditPost)
