import React from 'react'

const ButtonGoBack = (props) => {

	return (
		<button onClick={() => props.goBack()}>Go Back</button>
	)
}

export default ButtonGoBack
