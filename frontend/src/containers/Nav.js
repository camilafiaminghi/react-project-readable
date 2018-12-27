import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import SelectOrderBy from './SelectOrderBy'

export class Nav extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired
	}

	render() {
		const { items } = this.props

		return (
			<nav>
				<ul role="navigation">
					<li>
						<NavLink to="/" exact activeClassName="active">Home</NavLink>
					</li>
					{items.map((item, index) => (
						<li key={index}>
							<NavLink to={item.path} isActive={(match, location) => (`/${item.path}` === location.pathname)} activeClassName="active">{item.name}</NavLink>
						</li>
					))}
					<li>
						Order by: <SelectOrderBy />
					</li>
				</ul>
			</nav>
		)
	}
}

export const mapStateToProps = ({ categories }) => {
	return {
		items: categories.items,
	}
}

export default connect(mapStateToProps)(Nav)
