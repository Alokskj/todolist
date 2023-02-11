const mongoose = require("mongoose");

const today = getDate = function() {

  const today = new Date();

  const options = {
    weekday: "short",
    day: "numeric",
    month: "short"
  };

  return today.toLocaleDateString("en-US", options);

};
const today_day = today();


const tdlSchema = new mongoose.Schema({
  name: String,
  catogory: {
    type: String,
    default: 'Personal',
    lowercase : true,
    trim: true,
    
  },
  date: {
    type: String,
    default: today_day,
  },
  description: String,

});

const tdl = mongoose.model("todos", tdlSchema);
module.exports = tdl
// insert items
exports.createItem = async () => {
  try {
    const item1 = new tdl({
      name: "Welcome to your todolist",
    });
    const item2 = new tdl({
      name: "press + to add new item",
    });
    const item3 = new tdl({
      name: "<= press to delete items",
    });
    const defaultItems = [item1 , item2, item3];
    const result = await tdl.insertMany(defaultItems);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

// read item

exports.readItem = async () => {
  try {
    const result = await tdl.find();
    return result
  } catch (error) {
    console.log(error.message);
  }
};


// update item

exports.updateItem = async (_id, name) => {
  try {
    const result = await tdl.findByIdAndUpdate(
      { _id },
      { name: name },
      { new: true }
    );
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};

// Delete item

exports.deleteItem = async (name) => {
  try {
    const result = await tdl.find({ name }).deleteMany();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
