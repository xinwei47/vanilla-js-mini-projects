import classes from './Card.module.css';

const Card = (props) => {
  return (
    <div>
      <div className={classes['img-container']}>
        <img src={props.image} alt="" className={classes.img} />
      </div>
    </div>
  );
};

export default Card;
