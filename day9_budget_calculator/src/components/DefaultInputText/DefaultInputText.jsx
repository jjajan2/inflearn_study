import "./DefaultInputText.module.css";

function DefaultInputText({ type, name, value, onEvent }) {
  return <input type={type} name={name} value={value} onChange={onEvent} />;
}

export default DefaultInputText;
