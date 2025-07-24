

const TableReuse = ({ type = 'td', children, className = '' }) => {
  const isTextSizeOverridden = className.includes('text-['); 

  const tdTextSize = isTextSizeOverridden ? '' : 'text-[9px]';
  const thTextSize = isTextSizeOverridden ? '' : 'text-[9px]';

  const defaultTdStyle = `border text-gray-700 p-[2px] ${tdTextSize}`;
  const defaultThStyle = `border p-[2px] font-semibold bg-gray-200 ${thTextSize}`;

  const cellClass = type === 'th' 
    ? `${defaultThStyle} ${className}` 
    : `${defaultTdStyle} ${className}`;

  const CellTag = type === 'th' ? 'th' : 'td';

  return <CellTag className={cellClass}>{children}</CellTag>;
};
export default TableReuse;