import "../styles/checkboxForm.css"


export default function CheckBoxForm(props) {

const {isChecked, setChecked, label} = props
return (

    <div className="checkbox-row">
      <label htmlFor="checkbox">{label}</label>
      <input id="checkbox" type="checkbox" className="checkbox" checked={isChecked} onChange={e => (setChecked(e.target.checked))}></input>
    </div>
    )
}
