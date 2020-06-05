import React from 'react';

const FoodEntry = ({ entry }) => {
  return (
    <>
      {entry.name && <h2 className="day__item-name">{entry.name}</h2>}
      {entry.items.map(item => item.name).join(', ')}
    </>
  );
};

export default FoodEntry;
