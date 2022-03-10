import Card from './Card';

import classes from './Gallery.module.css';

const Gallery = (props) => {
  return (
    <div className={classes.gallery}>
      {props.data.map((item) => {
        return <Card image={item.strMealThumb} />;
      })}
    </div>
  );
};

export default Gallery;
