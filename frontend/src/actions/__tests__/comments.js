import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	LOAD_COMMENTS_REQUEST,
	LOAD_COMMENTS_SUCCESS,
	VOTE_COMMENT_REQUEST,
	VOTE_COMMENT_SUCCESS,
	VOTE_COMMENT_FAILURE,
	SAVE_COMMENT_REQUEST,
	SAVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_REQUEST,
	REMOVE_COMMENT_SUCCESS,
	UPDATE_COMMENT_REQUEST,
	UPDATE_COMMENT_SUCCESS,
	SHOW_COMMENT_FAILURE,
	HIDE_COMMENT_FAILURE } from './../comments'
import {
	loadCommentsRequest,
	loadCommentsSuccess,
	handleComments,
	voteCommentRequest,
	voteCommentSuccess,
	voteCommentFailure,
	handleVoteComment,
	saveCommentRequest,
	saveCommentSuccess,
	handleSaveComment,
	removeCommentRequest,
	removeCommentSuccess,
	handleRemoveComment,
	updateCommentRequest,
	updateCommentSuccess,
	handleUpdateComment,
	showCommentFailure,
	hideCommentFailure } from './../comments'
import fetch from './../../__helpers__/fetch'
import data from './../../__helpers__/comments'

const dataComments = {}
data.map((item) => (dataComments[item.id] = item))
const configStore = configureMockStore([thunk])
const store = configStore({
	byId: dataComments,
	isFetching: false,
	success: false
})

describe('comments action creators', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	/*
	 * LOAD
	 */
	it('loadCommentsRequest should return an object', () => {
		expect(loadCommentsRequest()).toEqual({
			type: LOAD_COMMENTS_REQUEST
		})
	})

	it('loadCommentsSuccess should return an object', () => {
		expect(loadCommentsSuccess()).toEqual({
			type: LOAD_COMMENTS_SUCCESS,
			items: undefined
		})
	})

	it('successful handleComments calls loadCommentsRequest', () => {
		window.fetch = fetch.successful(data)

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW'},
			{ type: LOAD_COMMENTS_REQUEST },
			{ type: LOAD_COMMENTS_SUCCESS, items: data },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE'}
		]

		return store.dispatch(handleComments())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * VOTE
	 */
	it('voteCommentRequest should return an object', () => {
		expect(voteCommentRequest(data[0].id, 'upVote')).toEqual({
			type: VOTE_COMMENT_REQUEST,
			id: data[0].id,
			option: 'upVote'
		})
	})

	it('voteCommentSuccess should return an object', () => {
		expect(voteCommentSuccess(data[0])).toEqual({
			type: VOTE_COMMENT_SUCCESS,
			comment: data[0]
		})
	})

	it('voteCommentFailure should return an object', () => {
		expect(voteCommentFailure(data[0].id, 'upVote')).toEqual({
			type: VOTE_COMMENT_FAILURE,
			id: data[0].id,
			option: 'upVote'
		})
	})

	it('successful handleVoteComment', () => {
		window.fetch = fetch.successful(data[0])

		const expectAction = [
			{ type: VOTE_COMMENT_REQUEST, id: data[0].id, option: 'upVote' },
			{ type: VOTE_COMMENT_SUCCESS, comment: data[0] },
		]

		return store.dispatch(handleVoteComment(data[0].id, 'upVote'))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	it('failure handleVoteComment', () => {
		window.fetch = fetch.failing()

		const expectAction = [
			{ type: VOTE_COMMENT_REQUEST, id: data[0].id, option: 'upVote' },
			{ type: VOTE_COMMENT_FAILURE, id: data[0].id, option: 'upVote', failure: 'vote' },
		]

		return store.dispatch(handleVoteComment(data[0].id, 'upVote'))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * SAVE
	 */
	it('saveCommentRequest should return an object', () => {
		expect(saveCommentRequest()).toEqual({
			type: SAVE_COMMENT_REQUEST
		})
	})

	it('saveCommentSuccess should return an object', () => {
		expect(saveCommentSuccess(data[0])).toEqual({
			type: SAVE_COMMENT_SUCCESS,
			comment: data[0]
		})
	})

	it('successful handleSaveComment', () => {
		window.fetch = fetch.successful(data[0])

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: SAVE_COMMENT_REQUEST },
			{ type: SAVE_COMMENT_SUCCESS, comment: data[0] },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' }
		]

		return store.dispatch(handleSaveComment(data[0], ''))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	it('failure handleSaveComment', () => {
		window.fetch = fetch.failing()

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: SAVE_COMMENT_REQUEST },
			{ type: SHOW_COMMENT_FAILURE, failure: 'save' },
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' }
		]

		return store.dispatch(handleSaveComment(data[0], ''))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * REMOVE
	 */
	it('removeCommentRequest should return an object', () => {
		expect(removeCommentRequest()).toEqual({
			type: REMOVE_COMMENT_REQUEST
		})
	})

	it('removeCommentSuccess should return an object', () => {
		expect(removeCommentSuccess(data[0].id)).toEqual({
			type: REMOVE_COMMENT_SUCCESS,
			id: data[0].id
		})
	})

	it('successful handleRemoveComment', () => {
		window.fetch = fetch.successful(data[0])

		const expectAction = [
			{ type: REMOVE_COMMENT_REQUEST },
			{ type: REMOVE_COMMENT_SUCCESS, id: undefined }
		]

		return store.dispatch(handleRemoveComment())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	it('failure handleRemoveComment', () => {
		window.fetch = fetch.failing()

		const expectAction = [
			{ type: REMOVE_COMMENT_REQUEST },
			{ type: SHOW_COMMENT_FAILURE, failure: 'remove' }
		]

		return store.dispatch(handleRemoveComment(data[0].id))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * UPDATE
	 */
	it('updateCommentRequest should return an object', () => {
		expect(updateCommentRequest()).toEqual({
			type: UPDATE_COMMENT_REQUEST
		})
	})

	it('updateCommentSuccess should return an object', () => {
		expect(updateCommentSuccess(data[0])).toEqual({
			type: UPDATE_COMMENT_SUCCESS,
			comment: data[0]
		})
	})

	it('successful handleUpdateComment', () => {
		window.fetch = fetch.successful(data[0])

		const expectAction = [
			{ type: UPDATE_COMMENT_REQUEST },
			{ type: UPDATE_COMMENT_SUCCESS, comment: data[0] }
		]

		return store.dispatch(handleUpdateComment(data[0].id, data[0]))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	it('failure handleUpdateComment', () => {
		window.fetch = fetch.failing()

		const expectAction = [
			{ type: UPDATE_COMMENT_REQUEST },
			{ type: SHOW_COMMENT_FAILURE, failure: 'edit' }
		]

		return store.dispatch(handleUpdateComment(data[0].id, data[0]))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * FAILURE
	 */
	it('showCommentFailure should return an object', () => {
		expect(showCommentFailure('update')).toEqual({
			type: SHOW_COMMENT_FAILURE,
			failure: 'update'
		})
	})

	it('hideCommentFailure should return an object', () => {
		expect(hideCommentFailure()).toEqual({
			type: HIDE_COMMENT_FAILURE
		})
	})
})
