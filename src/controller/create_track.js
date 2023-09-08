const track = require('../model/app');

const createTrack = async (req, res) => {
  const trackDoc = new track({
    slack_name,
    track,
    github_file_url,
    github_repo_url,
  });

  try {
    await trackDoc.save();
    console.log(trackDoc);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createTrack;
