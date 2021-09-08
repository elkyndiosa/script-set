const fetch = require('node-fetch');
const data = require('./comercian.json');
const axios = require('axios').default;

async function setData(){

    data.sort(function(a,b){
        return new Date(a.dateTransaction) - new Date(b.dateTransaction);
    });

    for (const key in data) {
        const body = data[key];

        body.nApproval = await getNumberAproval(body);
        
        console.log(JSON.stringify(body.nApproval));
        const url = 'https://hook.integromat.com/9pn6exv6utwk5x490mzm53gqxxti79kg';

        response  = await axios({
            method: 'post',
            url: 'https://hook.integromat.com/9pn6exv6utwk5x490mzm53gqxxti79kg',
            headers: {
                'Content-Type': 'application/json'
            },
            data: body
        });
        await sleep(4000);
    }
}
async function getNumberAproval(element){
        if(element.paymentMethod != 'pse'){
          let config = {
            method: 'get',
            url: 'https://ws.tupago.net.co/txn-info/by-idrequest/' + JSON.parse(element.idRequest),
            headers: {'x-api-key': 'k1b0DpfSlTaz6FyzhfvRs9pl1xvFWLhn441JdGrE'}
          }; 
          let response = await axios(config)
            .then(resp => resp).catch(error => {
              if (error.response) {
                return error.response;
              } else if (error.request) {
                return error.request;
              } else {
                return error.message;
              }
            });

          nApproval = '99999999999';
          if(response.status == 200){
            const infoPayment = response.data.message;
            nApproval = infoPayment.no_aprobacion;
          }
        } else {
          let config = {   
            method: 'get',   
            url: `https://ws.tupago.net.co/orders/getOrdersByItemReference/${element.itemReference}?page=1`
          }; 

          let response = await axios(config)
            .then(resp => resp).catch(error => {
              if (error.response) {
                return error.response;
              } else if (error.request) {
                return error.request;
              } else {
                return error.message;
              }
            });

          nApproval = '88888888888';
          if(response.status == 200){
            const infoPayment = response.data;
            if(infoPayment.length > 0){
              nApproval = infoPayment[0].paymentReference;
            }
          }
        }
        return nApproval;
}

function sleep(ms) {
  return new Promise((resolve) => {
      setTimeout(resolve, ms)
      console.log('Insert success');
    });
}

setData();