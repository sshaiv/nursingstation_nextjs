// utils/dateUtils.js
export const getCurrentDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const paddedHours = String(hours).padStart(2, "0");

  return `${day}/${month}/${year} ${paddedHours}:${minutes} ${ampm}`;
};




export const getCurrentDateISO = () => {
 
  return new Date().toISOString().slice(0, 19); 
};

export const toISOFromDisplay = (displayStr) => {
 
  const [datePart, timePart, meridian] = displayStr.split(/[\s:]/);   
  const [day, month, year]             = datePart.split("/");

  let hours   = parseInt(timePart, 10);
  const mins  = displayStr.slice(-5, -3);                           
  if (meridian === "PM" && hours < 12) hours += 12;
  if (meridian === "AM" && hours === 12) hours = 0;

  return `${year}-${month}-${day}T${String(hours).padStart(2,"0")}:${mins}:00`;
};