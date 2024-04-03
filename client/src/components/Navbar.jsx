import { CgInsights } from "react-icons/cg";

const Navbar = () => {
	return (
		<nav className="navbar">
			<h2 className="logo">
				<CgInsights /> <span>Insights</span>
			</h2>
			{/* <ul>
				<li>
					<a href="#">Home</a>
				</li>
				<li>
					<a href="#">About</a>
				</li>
				<li>
					<a href="#">Product</a>
				</li>
			</ul> */}
		</nav>
	);
};

export default Navbar;
