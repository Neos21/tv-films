const tvFilms = require('../../lib/index');

exports.handler = async (_event, _context, callback) => {
  try {
    console.log(new Date().toISOString(), 'API : Start');
    const isUseProxy  = false;
    const isOutputLog = true;
    const result = await tvFilms(isUseProxy, isOutputLog);
    console.log(new Date().toISOString(), 'API Finished', result);
    return callback(null, {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result)
    });
  }
  catch(error) {
    console.error(new Date().toISOString(), 'API : Failed', error);
    return callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(error)
    });
  }
};
