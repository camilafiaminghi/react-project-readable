const logger = (store) => (next) => (action) => {
	console.group(action.type)
		console.log('The action: ', action)
		const retunValue = next(action)
		console.log('The new state: ', store.getState())
	console.groupEnd()
	return retunValue
}

export default logger
