import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired
	}

	render() {
		return (
			<ul>
				<li>
					<NavLink to="/" exact activeClassName="active">Home</NavLink>
				</li>
				{this.props.items.map((item, index) => (
					<li key={index}>
						<NavLink to={item.path} isActive={(match, location) => (`/${item.path}` === location.pathname)} activeClassName="active">{item.name}</NavLink>
					</li>
				))}
			</ul>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		items: categories.items,
	}
}

export default connect(mapStateToProps)(Nav)
