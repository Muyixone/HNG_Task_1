const trackSchema = require('../model/app');

const getTrack = async (req, res) => {
  const { slack_name, track } = req.query;
  try {
    const queryObject = {};

    if (slack_name) {
      queryObject.slack_name = { $regex: slack_name, $options: 'i' };
    }
    if (track) {
      queryObject.track = { $regex: track, $options: 'i' };
    }
    let result = await trackSchema.findOne(queryObject).select('-_id -__v');

    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getTrack;
