function Input(props) {
    return (
      <>
        <input
          id={props.id}
          className={`popup__name ${props.class}`}
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          required
          minLength={props.min}
          maxLength={props.max}
        />
        <span className={`popup__name-error ${props.id}-error`}></span>
      </>
    );
  }
  
  export default Input;