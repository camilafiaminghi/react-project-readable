import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Post from './Post'

export class DefaultView extends Component {

	static propTypes = {
		category: PropTypes.string,
		items: PropTypes.array.isRequired
	}

	componentDidMount() {
		const { dispatch, category } = this.props

		/* HANDLE POSTS BY CATEGORY */
		dispatch(handlePosts(category))
	}

	render() {
		const { items, category } = this.props

		return (
			<div>
				<Nav />

				<div className="bordered-top">
					<div className="block text-center">
						<Link
							to={{pathname: '/post', state: { category }}}
							className="btn-add"
							aria-label="Add Post">
							<i className="material-icons">add_box</i>add post
						</Link>
					</div>

					<ul className="items">
						{items.map((item, index) => (
							<li key={index} className="bordered">
								<Post id={item} singleView={false} />
							</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}

export const mapStateToProps = ({ posts }, props) => {
	const { category } = props
	const items = (posts.success) ? Object.keys(posts.byId) : []

	return {
		category,
		items
	}
}

export default connect(mapStateToProps)(DefaultView)
