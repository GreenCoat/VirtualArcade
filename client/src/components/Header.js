import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<div>USER: <Link to="/profile">USER </Link><Link to="/">Logout</Link></div>
);

export default Header;