import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">
                <img src="./img/st-logo.svg" alt="Steam Tracker Logo" />
            </Link>
            <ul>
                <CustomLink to="/Trade">Trade</CustomLink>
                <CustomLink to="/Sell">Sell</CustomLink>
                <CustomLink to="/Buy">Buy</CustomLink>
                <CustomLink to="/About">About</CustomLink>
                <CustomLink to="/User">
                    <img src="/img/user-img.svg" alt="User" className="user-img"/>
                </CustomLink>
                
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props} className={isActive ? "active" : ""}>{children}</Link>
        </li>
    );
}
