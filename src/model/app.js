const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackSchema = Schema(
  {
    slack_name: {
      type: String,
      required: true,
    },
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
trackSchema.virtual('utc_time').get(function () {
  const currentUtcTime = new Date().toISOString();

  //Check if the difference between the current time and save time is within +/- secs
  // if (this.date) {
  //   const savedTime = new Date(this.date).getTime();
  //   const currentTime = new Date().getTime();
  //   const timeDifference = Math.abs(savedTime - currentTime);

  //   if (timeDifference > 2000) {
  //     return next(
  //       new Error('Timestamp is not withing +/- 2 minutes of current time')
  //     );
  //   }
  // }

  return currentUtcTime;
});
trackSchema.virtual('status_code').get(function () {
  return 200;
});

module.exports = mongoose.model('Track', trackSchema);
