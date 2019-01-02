import React from 'react';
import { Link } from 'react-router-dom';

const RouteNotFound = () => (
	<nav>
		<h2>Route not found</h2>
		<Link to="/">go to home</Link>
	</nav>
);

export default RouteNotFound;
