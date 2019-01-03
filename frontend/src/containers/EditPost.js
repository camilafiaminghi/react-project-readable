import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleUpdatePost } from '../actions/posts'
import FormPost from './FormPost'

export class EditPost extends Component {

	static propTypes = {
		post: PropTypes.object
	}

	handleOnUpdate = (validated, form) => {
		const { handleUpdate, post } = this.props
		/* DISPATCH IF IS VALID */
		if (validated) {
			handleUpdate(post.id, form)
		}
	}

	render() {
		const { post } = this.props

		return (
			<div>
				<div>
					<nav>
						<Link
							to={`/${post.category}/${post.id}`}
							aria-label="Go Back">
							<i className="material-icons">arrow_back</i>
						</Link>
					</nav>

					<div className="bordered-top">
						<h2 className="form-title">Edit Post</h2>
						<FormPost handleSubmit={this.handleOnUpdate} post={post} />
					</div>
				</div>
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

export const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdate: (id, form) => dispatch(handleUpdatePost(id, form))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)
