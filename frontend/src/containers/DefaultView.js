import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Nav from './Nav'
import Post from './Post'

export class DefaultView extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired,
		category: PropTypes.string
	}

	render() {
		const { items, category } = this.props

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
	const category = props.match.params.category
	const items = posts.success ? (category ? Object.keys(posts.byId).filter((key) => (posts.byId[key].category === category)) : Object.keys(posts.byId)) : []

	return {
		items,
		category
	}
}

export default connect(mapStateToProps)(DefaultView)
