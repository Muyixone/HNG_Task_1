const track = require('../model/app');

const createTrack = async (req, res) => {
  const trackDoc = new track({
    ...req.body,
  });

  try {
    await trackDoc.save();
    return res.json({
      msg: 'Success',
      trackDoc,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = createTrack;
