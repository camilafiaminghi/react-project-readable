import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { handleComments } from '../actions/comments'
import { handleUpdatePostComments } from '../actions/shared'
import Comment from './Comment'
import FormComment from './FormComment'

export class Comments extends Component {

	static propTypes = {
		comments: PropTypes.object
	}

	state = {
		show: false
	}

	componentDidMount() {
		/* HANDLE COMMENTS BY POST */
		this.props.dispatch(handleComments(this.props.id))
	}

	handleSave = (validated, form) => {
		const { dispatch, id } = this.props

		/* DISPATCH IF IS VALID */
		if (validated) {
			dispatch(handleUpdatePostComments(form, id))
			this.setState((prevState) => ({...prevState, show: !prevState.show}))
		}
	}

	render() {
		const { success, byId } = this.props.comments
		const { show } = this.state

		return (
			<div className="children-list">
				{ (!show) &&
					<button
						onClick={() => this.setState((prevState) => ({...prevState, show: !prevState.show}))}
						className="btn-add">
						<i className="material-icons">add_box</i>add comment
					</button>
				}

				{ (show) &&
					<div className="form-edit">
						<button
							onClick={() => this.setState((prevState) => ({...prevState, show: !prevState.show}))}
							className="btn-add">
							<i className="material-icons">clear</i>cancel
						</button>
						<FormComment comment={{author:'',body:''}} handleSubmit={this.handleSave} />
					</div>
				}

				<ul className="items">
					{ (success) && Object.keys(byId).map((key, index) => (
						<li key={index} className="item bordered">
							<Comment id={key} />
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export const mapStateToProps = ({ comments }, props) => {
	const { id } = props

	return {
		id,
		comments
	}
}

export default connect(mapStateToProps)(Comments)
