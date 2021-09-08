const fetch = require('node-fetch');
const data = require('./comercian.json');
const axios = require('axios').default;

async function setData(){

    data.sort(function(a,b){
        return new Date(a.dateTransaction) - new Date(b.dateTransaction);
    });

    for (const key in data) {
        const body = data[key];
        console.log(JSON.stringify(body));
        const url = 'https://hook.integromat.com/9pn6exv6utwk5x490mzm53gqxxti79kg';

        response  = await axios({
            method: 'post',
            url: 'https://hook.integromat.com/9pn6exv6utwk5x490mzm53gqxxti79kg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        });
        // console.log(response.json());
        // axios.post(url, JSON.stringify(body))
        // .then(function (response) {
        //     console.log(response.data);
        // })
        // .catch(function (error) {
        //     if (error.response) {
        //         console.log(error.response.data);
        //     } else if (error.request) {
        //         console.log(error.request);
        //     } else {
        //         console.log('Error', error.message);
        //     }
        // });


        await sleep(4000);
    }
}

function sleep(ms) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms)
      console.log('Insert success');
    });
}

setData();