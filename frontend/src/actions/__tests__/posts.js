import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	VOTE_POST_REQUEST,
	VOTE_POST_SUCCESS,
	SAVE_POST_REQUEST,
	SAVE_POST_SUCCESS,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	UPDATE_POST_REQUEST,
	UPDATE_POST_SUCCESS,
	ORDER_POSTS_BY } from './../posts'
import {
	loadPostsRequest,
	loadPostsSuccess,
	loadPostsFailure,
	handlePosts,
	votePostRequest,
	votePostSuccess,
	handleVotePost,
	savePostRequest,
	savePostSuccess,
	handleSavePost,
	removePostRequest,
	removePostSuccess,
	handleRemovePost,
	updatePostRequest,
	updatePostSuccess,
	handleUpdatePost,
	orderPostsBy,
	handleOrderPostsBy } from './../posts'
import fetch from './../../__helpers__/fetch'
import posts from './../../__helpers__/posts'

let byId = {};
posts.map((item) => (byId[item.id] = item))
const configStore = configureMockStore([thunk])
const store = configStore({
	byId,
	items: posts,
	isFetching: false,
	error: false,
	success: true
})

describe('posts action', () => {
	// CLEAR ACTIONS BEFORE RUN STORE AGAIN TEST MODULE INDEPEDENT OF OTHERS MODULES
	afterEach(() => store.clearActions())

	/*
	 * LOAD
	 */
	it('loadPostsRequest should return an object', () => {
		expect(loadPostsRequest()).toEqual({
			type: LOAD_POSTS_REQUEST
		})
	})

	it('loadPostsSuccess should return an object', () => {
		expect(loadPostsSuccess()).toEqual({
			type: LOAD_POSTS_SUCCESS,
			items: undefined
		})
	})

	it('loadPostsFailure should return an object', () => {
		expect(loadPostsFailure()).toEqual({
			type: LOAD_POSTS_FAILURE,
			items: undefined
		})
	})

	it('successful handlePosts', () => {
		window.fetch = fetch.successful(posts)

		const expectAction = [
			{ type: LOAD_POSTS_REQUEST },
			{ type: LOAD_POSTS_SUCCESS, items: posts },
		]

		return store.dispatch(handlePosts())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * VOTE
	 */
	it('votePostRequest should return an object', () => {
		expect(votePostRequest(posts[0].id, 'upVote')).toEqual({
			type: VOTE_POST_REQUEST,
			id: posts[0].id,
			option: 'upVote'
		})
	})

	it('votePostSuccess should return an object', () => {
		expect(votePostSuccess()).toEqual({
			type: VOTE_POST_SUCCESS
		})
	})

	it('successful handleVotePost', () => {
		window.fetch = fetch.successful(posts[0])

		const expectAction = [
			{ type: VOTE_POST_REQUEST, id: posts[0].id, option: 'upVote' },
			{ type: VOTE_POST_SUCCESS },
		]

		return store.dispatch(handleVotePost(posts[0].id, 'upVote'))
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * SAVE
	 */
	it('savePostRequest should return an object', () => {
		expect(savePostRequest()).toEqual({
			type: SAVE_POST_REQUEST
		})
	})

	it('savePostSuccess should return an object', () => {
		expect(savePostSuccess(posts[0])).toEqual({
			type: SAVE_POST_SUCCESS,
			post: posts[0]
		})
	})

	it('successful handleSavePost', () => {
		window.fetch = fetch.successful(posts[0])

		const expectAction = [
			{ payload: {scope: 'default'}, type: 'loading-bar/SHOW' },
			{ type: SAVE_POST_REQUEST },
			{ type: SAVE_POST_SUCCESS, post: posts[0] },
			{ payload: {args: [`/${posts[0].category}`], method: 'push'}, type: '@@router/CALL_HISTORY_METHOD'},
			{ payload: {scope: 'default'}, type: 'loading-bar/HIDE' }
		]

		return store.dispatch(handleSavePost())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * REMOVE
	 */
	it('removePostRequest should return an object', () => {
		expect(removePostRequest(posts[0].id)).toEqual({
			type: REMOVE_POST_REQUEST,
			id: posts[0].id
		})
	})

	it('removePostSuccess should return an object', () => {
		expect(removePostSuccess(posts[0])).toEqual({
			type: REMOVE_POST_SUCCESS,
			post: posts[0]
		})
	})

	it('successful handleRemovePost', () => {
		window.fetch = fetch.successful(posts[0])

		const expectAction = [
			{ type: REMOVE_POST_REQUEST },
			{ type: REMOVE_POST_SUCCESS, post: posts[0] },
			{ payload: {args: [`/${posts[0].category}`], method: 'push'}, type: '@@router/CALL_HISTORY_METHOD'},
		]

		return store.dispatch(handleRemovePost())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * UPDATE
	 */
	it('updatePostRequest should return an object', () => {
		expect(updatePostRequest()).toEqual({
			type: UPDATE_POST_REQUEST
		})
	})

	it('updatePostSuccess should return an object', () => {
		expect(updatePostSuccess(posts[0])).toEqual({
			type: UPDATE_POST_SUCCESS,
			post: posts[0]
		})
	})

	it('successful handleUpdatePost', () => {
		window.fetch = fetch.successful(posts[0])

		const expectAction = [
			{ type: UPDATE_POST_REQUEST },
			{ type: UPDATE_POST_SUCCESS, post: posts[0] },
			{ payload: {args: [`/post/${posts[0].id}`], method: 'push'}, type: '@@router/CALL_HISTORY_METHOD'},
		]

		return store.dispatch(handleUpdatePost())
			.then(() => expect(store.getActions()).toEqual(expectAction))
	})

	/*
	 * ORDER BY
	 */
	it('orderPostsBy should return an object', () => {
		const orderBy = 'voteScore'

		expect(orderPostsBy(orderBy)).toEqual({
			type: ORDER_POSTS_BY,
			orderBy
		})
	})

	it('successful handleOrderPostsBy', () => {

		const expectAction = [
			{ type: ORDER_POSTS_BY, orderBy: 'voteScore' }
		]

		store.dispatch(orderPostsBy('voteScore'))
		expect(store.getActions()).toEqual(expectAction)
	})
})
