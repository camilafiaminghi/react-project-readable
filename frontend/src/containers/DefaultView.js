import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handlePosts } from '../actions/posts'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Post from './Post'

export class DefaultView extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired
	}

	componentDidMount() {
		const { handlePosts } = this.props
		const { category } = this.props.match.params
		handlePosts(category)
	}

	componentDidUpdate(prevState) {
		const { handlePosts } = this.props
		const { category } = this.props.match.params
		if ( prevState.match.params.category !== category ) {
			handlePosts(category)
		}
	}

	render() {
		const { items } = this.props
		const { category } = this.props.match.params

		return (
			<div>
				<Nav />

				<div className="bordered-top">
					<div className="block text-center">
						<Link
							to={{pathname: '/add', state: { category }}}
							className="btn-add"
							aria-label="Add Post">
							<i className="material-icons">add_box</i>add post
						</Link>
					</div>

					<ul className="items">
						{items.map((item) => (
							<li key={item} className="bordered">
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
	const items = (posts.success) ? Object.keys(posts.byId) : []
	return {
		items
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handlePosts: (category) => dispatch(handlePosts(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultView)
