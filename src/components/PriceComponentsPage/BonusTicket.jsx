import './BonusTicket.css'
import Button from '../UI/Button'

const BonusTicket = (props) =>{
    return <>
    <div className="ticket">
        <p className="ticket__title">{props.title}</p>
        {props.icon}
        <p className="ticket__motto">{props.motto}</p>
        <div className="ticket__duration">
            <p className="ticket__duration-item">3<br/>miesiące</p>
            <p className="ticket__duration-item">6<br/>miesięcy</p>
            <p className="ticket__duration-item">12<br/>miesięcy</p>
        </div>
        <div className="ticket__price">
            <p className="ticket__price-item">{props.price1}</p>
            <p className="ticket__price-item">{props.price2}</p>
            <p className="ticket__price-item">{props.price3}</p>
        </div>
        <Button>Wybierz</Button>
    </div>
    </>
}

export default BonusTicket