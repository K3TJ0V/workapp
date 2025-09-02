import { NavLink } from "react-router-dom"
import './styles/Navbar.scss'

function Navbar(){


    return(
        <nav className="nav">
            <h1 className="nav__h1">App Name</h1>
            <ul className="nav__list">
                <li><NavLink to="/" className={ ({isActive})=> isActive ? "active" : "nav__list--link"}>Home</NavLink></li>
                <li><NavLink to="/ex-base" className={ ({isActive})=> isActive ? "active" : "nav__list--link"}>Exercise Base</NavLink></li>
                <li><NavLink to="/workouts" className={ ({isActive})=> isActive ? "active" : "nav__list--link"}>Workouts</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar