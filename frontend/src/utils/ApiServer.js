import generateUID from './generateUID'

const api = '//127.0.0.1:3001';

/* Generate a unique token */
let token = localStorage.token
if (!token)
	token = localStorage.token = Math.random().toString(36).substr(-8)

const options = {
	headers : {
		'Content-Type': 'application/json',
		'Authorization': token
	}
}

/*
 * HELPER FORMAT POST
 * @param {Object} post - { title, body, author, category }
 */
const formatPost = (post) => {
  return {
  	...post,
    id: generateUID(),
    timestamp: Date.now(),
    voteScore: 1,
    deleted: false,
    commentCount: 0
  }
}

/*
 * HELPER FORMAT COMMENT
 * @param {Object} comment - { body, author }
 */
const formatComment = (post, parentId) => {
  return {
  	...post,
  	parentId,
    id: generateUID(),
    timestamp: Date.now(),
    voteScore: 1,
    deleted: false,
    commentCount: 0,
    parentDeleted: false
  }
}

/*
 * GET /categories
 * All categories.
 */
export const getCategories = () =>
	fetch(`${api}/categories`, {
		...options,
		method: 'GET'
	})
		.then(response => response.json())
		.then(data => data)

/*
 * GET /:category/posts
 * Posts by category.
 * @param {String} category - react, redux, udacity
 */
export const getPosts = (category) => {
	const url = (category) ? `${api}/${category}/posts` : `${api}/posts`;

	return fetch(url, {
		...options,
		method: 'GET'
	})
		.then(response => response.json())
		.then(data => data)
}

/*
 * POST /posts
 * Save a new post.
 * @param {Object} post - { title, body, author, category }
 */
 //id, timestamp, voteScore, deleted, commentCount
export const savePost = (post) =>
	fetch(`${api}/posts`, {
		...options,
		method: 'POST',
		body: JSON.stringify(formatPost(post))
	})
		.then(response => response.json())
		.then(data => data)

/*
 * Get /posts/:id
 * Retrieve a post by id.
 * @param {String} id
 */
export const getPostById = (id) =>
	fetch(`${api}/posts/${id}`, {
		...options,
		method: 'GET'
	})
		.then(response => response.json())
		.then(data => data)

/*
 * POST /posts/:id
 * Increment post vote score.
 * @param {String} id
 * @param {String} option - 'upVote' || 'downVote'
 */
export const votePost = (id, option) =>
	fetch(`${api}/posts/${id}`, {
		...options,
		method: 'POST',
		body: JSON.stringify({ option })
	})
		.then(response => response.json())
		.then(data => data)

/*
 * PUT /posts/:id
 * Edit the details of an existing post.
 * @param {Object} post - { title, body, author, category }
 */
export const updatePost = (id, post) =>
	fetch(`${api}/posts/${id}`, {
		...options,
		method: 'PUT',
		body: JSON.stringify(post)
	})
		.then(response => response.json())
		.then(data => data)

/*
 * DELETE /posts/:id
 * Sets the deleted flag for a post to 'true'.
 * Sets the parentDeleted flag for all child comments to 'true'.
 * @param {String} id
 */
export const removePost = (id) =>
	fetch(`${api}/posts/${id}`, {
		...options,
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(data => data)

/*
 * GET /posts/:id/comments
 * Get all the comments for a single post.
 * @param {String} id
 */
export const getComments = (id) =>
	fetch(`${api}/posts/${id}/comments`, {
		...options,
		method: 'GET'
	})
		.then(response => response.json())
		.then(data => data)

/*
 * POST /comments
 * Add a comment to a post.
 * @param {String} parentId - ''
 * @param {Object} comment - {body, author}
 */
export const saveComment = (comment, parentId) =>
	fetch(`${api}/comments`, {
		...options,
		method: 'POST',
		body: JSON.stringify(formatComment(comment, parentId))
	})
		.then(response => response.json())
		.then(data => data)

/*
 * GET /comments/:id
 * Get the details for a single comment.
 * @param {String} id
 */
export const getCommentById = (id) =>
	fetch(`${api}/comments/${id}`, {
		...options,
		method: 'GET',
	})
		.then(response => response.json())
		.then(data => data)

/*
 * POST /posts/:id
 * Increment comment vote score.
 * @param {String} id
 * @param {Object} option - {option: 'upVote'}
 */
export const voteComment = (id, option) =>
	fetch(`${api}/comments/${id}`, {
		...options,
		method: 'POST',
		body: JSON.stringify({ option })
	})
		.then(response => response.json())
		.then(data => data)

/*
 * PUT /comments/:id
 * Edit the details of an existing comment.
 * @param {Object} post - { body, author }
 */
export const updateComment = (id, comment) =>
	fetch(`${api}/comments/${id}`, {
		...options,
		method: 'PUT',
		body: JSON.stringify(comment)
	})
		.then(response => response.json())
		.then(data => data)

/*
 * DELETE /comments/:id
 * Sets the deleted flag for a post to 'true'.
 * Sets the parentDeleted flag for all child comments to 'true'.
 * @param {String} id
 */
export const removeComment = (id) =>
	fetch(`${api}/comments/${id}`, {
		...options,
		method: 'DELETE'
	})
		.then(response => response.json())
		.then(data => data)
