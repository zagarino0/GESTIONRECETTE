import React from "react";
const DateFormatConverter = ({ isoDate }) => {
    // Create a Date object from the ISO string
    const date = new Date(isoDate);
  
    // Get day, month, and year
    const day = date.getDate().toString().padStart(2, '0'); // Pad with zero if needed
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
  
    // Format as dd/mm/yyyy
    const formattedDate = `${day}/${month}/${year}`;
  
    return <div>{formattedDate}</div>;
  };
  
  export default DateFormatConverter;
  