const MenuItem = require("../schemas/menuItem");

const createMenuItem = async ({ payload, session }) => {
  const model = new MenuItem({ ...payload, created_by: session.uid });
  return model.save();
};

const getMenuItems = async ({ restaurantId }) => {
  if (!restaurantId) {
    throw Error("Restaurant Id missing in the query");
  }
  return MenuItem.find({ restaurant_id: restaurantId }).exec();
};

const getMenuItemById = async ({ menuItemId }) => {
  if (!menuItemId) {
    throw Error("Menu Item Id missing in the query");
  }
  return MenuItem.findById(menuItemId).exec();
};

const updateMenuItem = async ({ menuItemId, payload, session }) => {
  return MenuItem.findByIdAndUpdate(menuItemId, {
    ...payload,
    updated_by: session.user_id,
  }).exec();
};

const deleteMenuItem = async ({ menuItemId }) => {
  return MenuItem.findByIdAndDelete(menuItemId).exec();
};

module.exports = {
  createMenuItem,
  getMenuItems,
  updateMenuItem,
  deleteMenuItem,
  getMenuItemById,
};
