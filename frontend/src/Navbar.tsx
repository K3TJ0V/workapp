import { NavLink } from "react-router-dom"
import './styles/Navbar.scss'
import logo  from './assets/app-logo.svg' 

function Navbar(){


    return(
        <nav className="nav">
            <div className="flex">
                <img src={logo} alt="app logo" className="nav__logo"/>
                <h1 className="nav__h1">App Name</h1>
            </div>
            <ul className="nav__list">
                <li><NavLink to="/" className={ ({isActive})=> isActive ? "active" : "nav__list--link"}>Home</NavLink></li>
                <li><NavLink to="/ex-base" className={ ({isActive})=> isActive ? "active" : "nav__list--link"}>Exercise Base</NavLink></li>
                <li><NavLink to="/workouts" className={ ({isActive})=> isActive ? "active" : "nav__list--link"}>Workouts</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar