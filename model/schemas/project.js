const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
// const mongoosePaginate = require("mongoose-paginate-v2");

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    },

    plannedHours: {
    type: Number,
    required,
    },
    
    totalHours: {
    type: Number,
    required,
    },

    hoursPerDay: [{type: Number}]

});

const sprintSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    },
    
    startDate: {
    type: Date,
    required,
    },

    duration: {
    type: Number,
        required,
    
    tasks: [taskSchema]
  },

});

const projectSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
      type: String,
      required: [true, "Description is required"],
    },

    team: [{ type: SchemaTypes.ObjectId, ref: "user" }],
    sprints: [sprintSchema],
});



// contactsSchema.plugin(mongoosePaginate);
const Project = mongoose.model("project", projectSchema);
const Sprint = mongoose.model("sprint", sprintSchema);
const Task = mongoose.model("task", task);

module.exports = Project;