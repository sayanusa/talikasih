exports.donateMidtrans = async (req,res, next) => {
    try {
            const { card_number,card_exp_month,card_exp_year,card_cvv, amount } = req.body;
            const token_cli = process.env.CLIENT
            //get token to proceed payment
            const headers = { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json', 
                'Authorization': 'Basic U0ItTWlkLXNlcnZlci01NVR2MnBoUDVUWDVWeXFTUEpKbHBXS0Y6'
              }
            const url_token = `${process.env.BASE_MID}/v2/token?client_key=${token_cli}&card_number=${card_number}&card_exp_month=${card_exp_month}&card_exp_year=${card_exp_year}24&card_cvv=${card_cvv}`;
            const token = await axios.get(`${url_token}`,{headers:headers})
            let tokId = token.data.token_id
            let orderId = tokId.substring(10,23)
            let date = new Date()
            //charge the card
            const body = {
                "payment_type": "credit_card",
                "transaction_details": {
                  "order_id": `${orderId}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`,
                  "gross_amount": amount
                },
                "credit_card": {
                  "token_id": `${tokId}`,
                  "authentication": true,
                }
            } 
            const charge = await axios.post(`${process.env.BASE_MID}/v2/charge`,body,{headers:headers})
            // console.log(charge);
            res.status(200).json(charge.data)
    } catch (e) {
        next(e)
    }    
  }
