const tvFilms = require('../../lib/index');

document.addEventListener('DOMContentLoaded', async () => {
  const resultElem = document.getElementById('result');
  const exec = async () => {
    try {
      console.log(new Date().toISOString(), 'Exec : Start');
      resultElem.innerHTML = `<span class="warning">Processing...</span>`;
      const isUseProxy  = document.getElementById('is-use-proxy').checked;
      const isOutputLog = document.getElementById('is-output-log').checked;
      const result = await tvFilms(isUseProxy, isOutputLog);
      if(result.error) {
        resultElem.innerHTML = `<span class="error">Response Error : ${result.error}</span>`;
        console.error(new Date().toISOString(), 'Exec : Response Error', result);
        return;
      }
      if(!result.films || !result.films.length) {
        resultElem.innerHTML = '<span class="warning">No Films</span>';
        console.log(new Date().toISOString(), 'Exec : Finished With No Films', result);
        return;
      }
      resultElem.innerHTML = '<dl>'
        + result.films.map(film => `<dt>${film.date} : ${film.title}</dt>\n<dd>${film.meta}</dd>`).join('')
        + '</dl>';
      console.log(new Date().toISOString(), 'Exec : Finished', result);
    }
    catch(error) {
      resultElem.innerHTML = `<span class="error">Failed : ${error.error ? error.error : error}</span>`;
      console.error(new Date().toISOString(), 'Exec : Failed', error);
    }
  };
  
  document.getElementById('exec').addEventListener('click', exec);
  await exec();
});
