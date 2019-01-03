import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleCleanAllFailures } from '../actions/shared'

export class Messages extends Component {

	static propTypes = {
		postFailure: PropTypes.string,
		commentFailure: PropTypes.string
	}

	// handleClose = (event) => {
	// 	event.preventDefault()
	// 	this.props.dispatch(handleCleanAllFailures())
	// }

	render() {
		const { postFailure, commentFailure, handleCleanAllFailures } = this.props

		return (
			<Fragment>
				{ (postFailure || commentFailure) &&
					<div className="modal">
						<div
							onClick={() => handleCleanAllFailures()}
							className="modal-mask"></div>
						<div className="modal-content">

							<button
								onClick={() => handleCleanAllFailures()}
								aria-label="Close alert">
								<i className="material-icons">close</i>
							</button>

							<p>
								Sorry, an error occured while you are trying to <strong>{ postFailure || commentFailure }</strong>.
								<br />
								Please, try again later.
							</p>
						</div>
					</div>
				}
			</Fragment>
		)
	}
}

export const mapStateToProps = ({ posts, comments }) => {
	const postFailure = posts.failure
	const commentFailure = comments.failure
	return {
		postFailure,
		commentFailure
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleCleanAllFailures: () => dispatch(handleCleanAllFailures())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
