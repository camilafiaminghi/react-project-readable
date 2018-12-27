import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	LOAD_COMMENTS_REQUEST,
	LOAD_COMMENTS_SUCCESS,
	VOTE_COMMENT_REQUEST,
	VOTE_COMMENT_SUCCESS,
	SAVE_COMMENT_REQUEST,
	SAVE_COMMENT_SUCCESS } from './../comments'
import {
	loadCommentsRequest,
	loadCommentsSuccess,
	handleComments,
	voteCommentRequest,
	voteCommentSuccess,
	handleVoteComment,
	saveCommentRequest,
	saveCommentSuccess,
	handleSaveComment } from './../comments'
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

	it('successful handleVoteComment', () => {
		window.fetch = fetch.successful(data[0])

		const expectAction = [
			{ type: VOTE_COMMENT_REQUEST, id: undefined, option: undefined },
			{ type: VOTE_COMMENT_SUCCESS, comment: data[0] },
		]

		return store.dispatch(handleVoteComment())
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

		return store.dispatch(handleSaveComment())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})
})
