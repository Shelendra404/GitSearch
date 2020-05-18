import React from 'react';

const PaginationButtons = ({ onClick, values }) => (
  <div>
    {values.map((item) =>
      item[0] !== '' ? (
        <button key={item} onClick={() => onClick(item)}>
          {item}
        </button>
      ) : null
    )}
  </div>
);

export default PaginationButtons;
