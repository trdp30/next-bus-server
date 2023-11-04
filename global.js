module.exports = async () => {
  global.db = await require("./config/datastore");
};
