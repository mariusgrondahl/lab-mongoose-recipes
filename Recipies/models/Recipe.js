const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
      type: String,
      required: [true, "Give your Restaurant a title!!!"]
    }, 
    level:{
      type: String,
      enum: ["Easy Peasy", "Amateur", "Chef", "UltraPro Chef"]
    },
    ingredients: Array,
    cuisine: {
      type: String,
      required: [true, "We need a cuisine"]
    },
    dishType: {
      type: String,
      enum: ["Breakfast", "Dish", "Snack", "Drink", "Dessert", "Other"]
    },
    image: {
      type: String, 
      default: "https://images.media-allrecipes.com/images/75131.jpg."
    },
    duration: {
      type: Number,
      min: 0
    },
    creator: String,
    created: {
      type: Date,
      default: Date.now 
    }
    
    });

module.exports = mongoose.model("recipe", recipeSchema, "recipes")