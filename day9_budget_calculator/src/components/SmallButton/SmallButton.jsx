import "./SmallButton.module.css";

function SmallButton({ text, onEvent }) {
  return <button onClick={onEvent}>{text}</button>;
}

export default SmallButton;
