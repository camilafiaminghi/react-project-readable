import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleOrderPostsBy } from './../actions/posts'

export class SelectOrderBy extends Component {

	static propTypes = {
		items: PropTypes.array.isRequired
	}

	state = {
		option: ''
	}

	componentDidMount() {
		this.handleOnChange('voteScore')
	}

	handleOnChange = (option) => {
		/* HANDLE ORDERBY */
		this.props.handleOrderPostsBy(option)
		this.setState((prevState) => ({...prevState, option}))
	}

	render() {
		const { option } = this.state

		return (
			<select
				value={option}
				onChange={(event) => this.handleOnChange(event.target.value)}>
				<option value="voteScore">Vote Score</option>
				<option value="timestamp">Created Date</option>
			</select>
		)
	}
}

export const mapStateToProps = ({ posts }, props) => {
	const items = Object.keys(posts.byId)
	return {
		items
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleOrderPostsBy: (option) => dispatch(handleOrderPostsBy(option))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectOrderBy)
