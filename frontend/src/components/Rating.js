import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/dist/v4';

//Function to create stars element
const GenerateStars = (value, color, numOfStars) => {
  let starList = [];
  //Loops over {numOfStars} stars and returns appropriate icon
  for (let i = 0; i <= numOfStars - 1; i++) {
    starList = [
      ...starList,
      <span key={uuid()}>
        <i
          style={{ color }}
          className={
            value >= i + 1
              ? 'fas fa-star'
              : value > i
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        />
      </span>
    ];
  }
  return starList;
};

const Rating = ({ value, numReviews, color, newLine, numOfStars }) => {
  return (
    <div className={`rating my-3`} key={uuid()}>
      <span className={newLine ? '' : 'mr-2'}>
        {GenerateStars(value, color, numOfStars)}
      </span>
      <br hidden={!newLine} />
      {numReviews ? <span>{numReviews} reviews</span> : ''}
    </div>
  );
};

//Proptypes
Rating.defaultProps = {
  color: 'gold',
  newLine: true,
  numOfStars: 5
};

Rating.protoTypes = {
  value: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  color: PropTypes.string,
  newLine: PropTypes.string,
  numOfStars: PropTypes.number
};

export default Rating;
