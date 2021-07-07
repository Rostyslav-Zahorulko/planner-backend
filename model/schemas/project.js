const mongoose = require('mongoose');
const { Schema, SchemaTypes } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    plannedHours: {
      type: Number,
      required: true,
    },

    totalHours: {
      type: Number,
      default: 0,
    },

    hoursPerDay: [],
  },
  {
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        delete ret.fullInf;
        return ret;
      },
    },
  },
);

const sprintSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },

    startDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    tasks: [taskSchema],
  },
  {
    versionKey: false,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        delete ret.fullInf;
        return ret;
      },
    },
  },
);

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },

    team: [],
    sprints: [sprintSchema],
  },
  {
    versionKey: false,
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: {
      virtuals: true,
      transform: function (_doc, ret) {
        delete ret._id;
        delete ret.fullInf;
        return ret;
      },
    },
  },
);

projectSchema.virtual('fullInf').get(function () {
  return `This is project '${this.title}'`;
});

projectSchema.plugin(mongoosePaginate);
const Project = mongoose.model('project', projectSchema);

module.exports = Project;
// const Task = mongoose.model('task', taskSchema);
// const Sprint = mongoose.model('sprint', sprintSchema);
// module.exports = Sprint;
// module.exports = Task;
