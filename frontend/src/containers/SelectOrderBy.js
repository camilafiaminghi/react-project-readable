import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleOrderPostsBy } from './../actions/posts'

export class SelectOrderBy extends Component {

	static propTypes = {
		success: PropTypes.bool.isRequired
	}

	state = {
		option: '',
		updated: false
	}

	componentDidUpdate() {
		const { success } = this.props
		const { updated } = this.state

		if (success && !updated) {
			this.setState((prevState) => ({...prevState, updated: true}))
			this.handleOnChange('voteScore')
		}
	}

	handleOnChange = (option) => {
		const { dispatch } = this.props

		/* HANDLE ORDERBY */
		dispatch(handleOrderPostsBy(option))
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
	const { success } = posts

	return {
		success
	}
}

export default connect(mapStateToProps)(SelectOrderBy)
