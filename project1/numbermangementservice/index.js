const express = require("express")
const axios = require('axios');

const app = express()

app.get("/numbers",async(req,res)=>{
    let urls = req.query.url;
    const responses = [];

    for (const url of urls) {
        try {
          const response = await axios.get(url);
          responses.push(response.data.numbers);
        } catch (error) {
          console.error(`Error making API call to ${url}: ${error.message}`);
          responses.push(null);  // You can choose to store null for failed requests
        }
      }

    res.json({"numbers":processArray(responses)});
})


function processArray(inputArray) {
    const flattenedArray = inputArray
    .filter(item => item !== null)
    .flat();
    const sortedArray = flattenedArray.sort((a, b) => a - b);
    const uniqueSortedArray = [...new Set(sortedArray)];
    return uniqueSortedArray;
  }


app.listen("8008",()=>{
    console.log("server listen on 8008")
})