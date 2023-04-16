import './NavButton.css'

const NavButton = (props) =>{
    return <>
    <div className="nav-button">
        <div className="nav-button__icon">{props.icon}</div>
        <p className="nav-button__name">{props.name}</p>
    </div>
    </>
}

export default NavButton