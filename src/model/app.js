const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const trackSchema = new Schema(
  {
    slack_name: {
      type: String,
      required: true,
    },
    utc_time: Date,
    track: String,
    github_file_url: String,
    github_repo_url: String,
  },
  {
    toJSON: { virtuals: true }, //So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, //So `console.log()` and other functions that use `toObject()` include virtuals
  }
);

// Set Day of the week
trackSchema.virtual('current_day').get(function () {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDate = new Date();
  const daysOfWeekIndex = currentDate.getDay();
  return daysOfWeek[daysOfWeekIndex];
});

// Pre-save hook to set UTC time
trackSchema.pre('save', function (next) {
  const currentUtcTime = new Date().toISOString();

  //Check if the difference between the current time and save time is within +/- secs
  if (this.utc_time) {
    const savedTime = new Date(this.utc_time).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = Math.abs(savedTime - currentTime);

    if (timeDifference > 2000) {
      return next(
        new Error('Timestamp is not withing +/- 2 seconds of current time')
      );
    }
  }

  this.utc_time = currentUtcTime;

  next();
});

module.exports = mongoose.model('Track', trackSchema);
