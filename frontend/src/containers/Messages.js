import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { handleCleanAllFailures } from '../actions/shared'

export class Messages extends Component {

	static propTypes = {
		categoriesFailure: PropTypes.string,
		postsFailure: PropTypes.string,
		commentFailure: PropTypes.string
	}

	render() {
		const { categoriesFailure, postsFailure, commentFailure, handleCleanAllFailures } = this.props

		return (
			<Fragment>
				{ ( categoriesFailure || postsFailure || commentFailure ) &&
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
								Sorry, an error occured while you are trying to <strong>{ categoriesFailure || postsFailure || commentFailure }</strong>.
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

export const mapStateToProps = ({ categories, posts, comments }) => {
	const categoriesFailure = categories.failure
	const postsFailure = posts.failure
	const commentFailure = comments.failure

	return {
		postsFailure,
		commentFailure,
		categoriesFailure
	}
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleCleanAllFailures: () => dispatch(handleCleanAllFailures())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)
