const fetch = require('node-fetch');
const data = require('./data.json');

async function setData(){

    data.sort(function(a,b){
        return new Date(a.dateTransaction) - new Date(b.dateTransaction);
    });

    for (const key in data) {
        const body = data[key];

        body.deleteRows = false;
        if(key == 0){
            body.deleteRows = true;
        }

        // const url = 'https://2goyxqt741.execute-api.us-east-1.amazonaws.com/dev/google-sheets';
        // const url = 'http://localhost:4021/dev/google-sheets';
        // console.log(body);
        const url = 'https://1hm9oqntjd.execute-api.us-east-1.amazonaws.com/prod/google-sheets';
        const response = await fetch(url, {
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            });
        const rrr = await response.json();
        console.log('drrrata ',rrr);

        // const ok = await response.ok();
        // console.log('ok '.ok);
        

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