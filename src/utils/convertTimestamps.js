// (C) Copyright 2015 Hewlett Packard Enterprise Development LP
/* eslint-disable */

export default function (result) {
// Create a new JavaScript Date object based on the timestamp
// multiplied by 1000 so that the argument is in milliseconds, not seconds.
  const date = new Date(result);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const createdTime = hours + ':' + minutes + ' ' + ampm;
  const monthName = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');
  const formattedDate = monthName[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + createdTime;
  return formattedDate;
}
