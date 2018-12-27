import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { handleSavePost } from '../actions/posts'
import FormPost from './FormPost'

export class NewPost extends Component {

	handleSave = (validated, form) => {
		const { dispatch } = this.props

		/* DISPATCH IF IS VALID */
		if (validated) {
			dispatch(handleSavePost(form))
		}
	}

	render() {
		const { category } = this.props.location.state
		const post = {author: '', title: '', body: '', category}

		return (
			<div>
				<nav>
					<Link
						to={`/${category}`}
						aria-label="Go Back">
						<i className="material-icons">arrow_back</i>
					</Link>
				</nav>

				<div className="bordered-top">
					<h2 className="form-title">Compose New Post</h2>
					<FormPost handleSubmit={this.handleSave} post={post} />
				</div>
			</div>
		)
	}
}

export default connect()(NewPost)
