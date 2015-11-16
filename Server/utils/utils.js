//generateRandomId generates a random string with length defined as an argument to use as a room name.  
var generateRandomId = function (length) {
  var id = "";
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length ; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
};

module.exports = {
  generateRandomId: generateRandomId
};