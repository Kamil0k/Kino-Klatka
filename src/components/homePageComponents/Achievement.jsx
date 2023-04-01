import './Achievement.css'

const Achievement = props => {
	return <>
    <div className="achievement">
        {props.icon}
        <p className="achievement__value">{props.value}</p>
        <p className="achievement__describe">{props.describe}</p>
    </div>
    </>
}

export default Achievement
