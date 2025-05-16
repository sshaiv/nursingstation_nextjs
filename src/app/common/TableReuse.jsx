// import React from 'react';

// const TableReuse = ({ type = 'td', children, className = '' }) => {

//   const defaultTdStyle = 'border text-gray-700  p-1 text-xs';
//   const defaultThStyle = 'border p-1 text-xs font-semibold bg-gray-300'; 
  
//   const cellClass = type === 'th' 
//     ? `${defaultThStyle} ${className}` 
//     : `${defaultTdStyle} ${className}`;

//   const CellTag = type === 'th' ? 'th' : 'td';

//   return <CellTag className={cellClass}>{children}</CellTag>;
// };

// export default TableReuse;


import React from 'react';

const TableReuse = ({ type = 'td', children, className = '' }) => {
  const defaultTdStyle = 'border text-gray-700 p-[2px] text-[9px]'; // Even more compact
  const defaultThStyle = 'border p-[2px] text-[9px] font-semibold bg-gray-200'; // Matching th

  const cellClass = type === 'th' 
    ? `${defaultThStyle} ${className}` 
    : `${defaultTdStyle} ${className}`;

  const CellTag = type === 'th' ? 'th' : 'td';

  return <CellTag className={cellClass}>{children}</CellTag>;
};

export default TableReuse;
