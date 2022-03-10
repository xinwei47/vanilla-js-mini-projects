import classes from './FormInput.module.css';

const FormInput = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      className={`${classes['form-input']} ${props.className}`}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};

export default FormInput;
