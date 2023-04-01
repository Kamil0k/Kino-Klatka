import './CinemaItem.css'

const CinemaItem = (props) => {
	return <>
    <div className={!props.right ? 'box' : 'box box--right'}>
        <img className='box__img' src={props.src} alt={props.alt} />
        <div className="box__content">
            <h3 className="box__content-title">{props.title}</h3>
            <p className="box__content-description">{props.description}</p>
        </div>
    </div>
    </>
}

export default CinemaItem
