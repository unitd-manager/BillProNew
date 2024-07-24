import moment from "moment";

// Get the current datetime in 'DD-MM-YYYY h:mm:ss a' format
const formattedDatetime = moment().format('DD-MM-YYYY h:mm:ss a');

// Parse the datetime value to the MySQL datetime format 'YYYY-MM-DD HH:mm:ss'
const creationdatetime = moment(formattedDatetime, 'DD-MM-YYYY h:mm:ss a').format('DD-MM-YYYY HH:mm:ss');

console.log(creationdatetime); // Output: "2023-07-24 12:44:43"

export default creationdatetime