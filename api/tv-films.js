const tvFilms = require('../lib/index');

module.exports = async (_req, res) => {
  try {
    console.log(new Date().toISOString(), 'API : Start', result);
    const isUseProxy  = false;
    const isOutputLog = true;
    const result = await tvFilms(isUseProxy, isOutputLog);
    console.log(new Date().toISOString(), 'API Finished', result);
    return res.send(200).json(result);
  }
  catch(error) {
    console.error(new Date().toISOString(), 'API : Failed', error);
    return res.status(400).json(error);
  }
};
