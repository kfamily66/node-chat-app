const moment = require("moment");

const date = moment();

console.log(date.format("MMM YYYY"));
console.log(date.add(-1, "hour").format("Do MMMM H:mm a"));
console.log(date.fromNow());

const sometime = moment().valueOf();
console.log(sometime);

console.log(moment(sometime).format("Do MMM YYYY"));
