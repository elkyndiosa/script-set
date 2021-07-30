const fetch = require('node-fetch');
const data = require('./data.json');

async function setData(){
    for (const key in data) {
        const body = data[key];
        const url = 'https://2goyxqt741.execute-api.us-east-1.amazonaws.com/dev/google-sheets'; 
        const resp = await fetch(url, {
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
        // setTimeout(() => {  console.log("World!"); }, 2000);
            // .then(res => res.json())
            // .then(json => console.log(json));
        await sleep(2000);
    }
}
function sleep(ms) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms)
      console.log('Insert success');
    });
}
setData();