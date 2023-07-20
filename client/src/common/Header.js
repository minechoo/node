import { Link, NavLink } from 'react-router-dom';

function Header() {
	const activeStyle = { color: 'aqua' };
	return (
		<header>
			<h1>
				<Link to='./'>Logo</Link>
			</h1>

			<ul id='gnb'>
				<li>
					<NavLink to='./list' style={(porps) => (porps.isActive ? activeStyle : null)}>
						Show List
					</NavLink>
				</li>
				<li>
					<NavLink to='/create' style={(porps) => (porps.isActive ? activeStyle : null)}>
						Write Post
					</NavLink>
				</li>
			</ul>
		</header>
	);
}

export default Header;
