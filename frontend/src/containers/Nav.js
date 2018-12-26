import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SelectOrderBy from './SelectOrderBy'

class Nav extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired
	}

	render() {
		return (
			<nav>
				<ul role="navigation">
					<li>
						<NavLink to="/" exact activeClassName="active">Home</NavLink>
					</li>
					{this.props.items.map((item, index) => (
						<li key={index}>
							<NavLink to={item.path} isActive={(match, location) => (`/${item.path}` === location.pathname)} activeClassName="active">{item.name}</NavLink>
						</li>
					))}
				</ul>

				<SelectOrderBy />
			</nav>
		)
	}
}

function mapStateToProps ({ categories }) {
	return {
		items: categories.items,
	}
}

export default connect(mapStateToProps)(Nav)
