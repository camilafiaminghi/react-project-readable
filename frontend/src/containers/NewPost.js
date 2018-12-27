import React, { Component } from 'react'
import { connect } from 'react-redux'
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
		const { push } = this.props.history
		const { category } = this.props.location.state
		const post = {author: '', title: '', body: '', category}

		return (
			<div className="form">
					<button onClick={() => push(`/${category}`)}>Go Back {(!category) ? 'to Home': `to /${category}`}</button>
					<h2 className="center">Compose new Post</h2>
					<FormPost handleSubmit={this.handleSave} post={post} />
			</div>
		)
	}
}

export default connect()(NewPost)
