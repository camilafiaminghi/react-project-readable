import * as ApiServer from './ApiServer'
import generateUID from './generateUID'
import fetch from '../__helpers__/fetch'
import categories from '../__helpers__/categories'
import posts from '../__helpers__/posts'
import comments from '../__helpers__/comments'

const postID = posts[0].id
const commentID = comments[0].id

describe('ApiServer', () => {
	/* POST METHODS */
	it('should load a list of categories', async () => {
		window.fetch = fetch.successful(categories)

		const response = await ApiServer.getCategories()
		expect(response.categories).toBeDefined()
		expect(response.categories.length).toBeGreaterThan(1)
  })

  it('should load a list of posts', async () => {
		window.fetch = fetch.successful(posts)
		const response = await ApiServer.getPosts()

		expect(response[0]).toMatchObject({})
		expect(response[0].hasOwnProperty('id')).toBeTruthy()
  })

	it('should save a post', async () => {
		const post = {id: generateUID(), title: 'Post Title Example', body: 'Post Body Example', author: 'postauthor', category: 'react'}
		const savedResponse = {voteScore: 1, deleted: false, commentCount: 0}
		window.fetch = fetch.successful(savedResponse)
		const response = await ApiServer.savePost(post)

		expect(response).toMatchObject({})
  })

  it('should retrieve a post by id', async () => {
		window.fetch = fetch.successful(posts[0])
		const response = await ApiServer.getPostById(postID)

		expect(response).toMatchObject(posts[0])
  })

  it('should increment vote score for a post', async () => {
  	const post = posts[0]
  	post.voteScore++
		window.fetch = fetch.successful(post)
		const response = await ApiServer.upVotePost(postID)

		expect(response).toMatchObject(post)
  })

  it('should decrement vote score for a post', async () => {
  	const post = posts[0]
  	post.voteScore--
		window.fetch = fetch.successful(post)
		const response = await ApiServer.downVotePost(postID)

		expect(response).toMatchObject(post)
  })

  it('should update a post', async () => {
  	const post = posts[0]
  	post.title = 'New Post Title'
  	window.fetch = fetch.successful(post)
		const response = await ApiServer.updatePost(postID, post)

		expect(response).toMatchObject(post)
  })

  it('should remove a post', async () => {
  	const post = posts[0]
  	post.deleted = true
  	window.fetch = fetch.successful(post)
		const response = await ApiServer.removePost(postID)

		expect(response).toMatchObject(post)
  })

  it('should retrieve comments by post', async () => {
  	window.fetch = fetch.successful(comments)
		const response = await ApiServer.getComments(postID)

		expect(response).toBeDefined()
  })

  /* COMMENTS METHODS */
  it('should save a comment', async () => {
  	const id = generateUID()
  	const comment = {id, body: 'Comment Body Example', author: 'commentauthor', parentId: postID}
  	const savedResponse = {id, body: 'Comment Body Example', author: 'commentauthor', parentId: postID, voteScore: 1, deleted: false, parentDeleted: false}
		window.fetch = fetch.successful(savedResponse)
		const response = await ApiServer.savePost(comment)

		expect(response).toMatchObject({})
  })

  it('should retrieve a comment by id', async () => {
		window.fetch = fetch.successful(comments[0])
		const response = await ApiServer.getCommentById(commentID)

		expect(response).toMatchObject(comments[0])
  })

  it('should increment vote score for a comment', async () => {
  	const comment = comments[0]
  	comment.voteScore++
		window.fetch = fetch.successful(comment)
		const response = await ApiServer.upVoteComment(commentID)

		expect(response).toMatchObject(comment)
  })

  it('should decrement vote score for a comment', async () => {
  	const comment = comments[0]
  	comment.voteScore--
		window.fetch = fetch.successful(comment)
		const response = await ApiServer.downVoteComment(commentID)

		expect(response).toMatchObject(comment)
  })

  it('should update a comment', async () => {
  	const comment = comments[0]
  	comment.title = 'New Post Title'
  	window.fetch = fetch.successful(comment)
		const response = await ApiServer.updateComment(commentID, comment)

		expect(response).toMatchObject(comment)
  })

  it('should remove a comment', async () => {
  	const comment = comments[0]
  	comment.deleted = true
  	window.fetch = fetch.successful(comment)
		const response = await ApiServer.removeComment(commentID)

		expect(response).toMatchObject(comment)
  })
})
