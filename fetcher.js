let input = process.argv.splice(2);

console.log(input)
const request = require('request');
const fs = require('fs');

let website=input[0]
let destination=input[1]
    


request(website, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.






  fs.writeFile(destination, body, function (err) {

    if (err) throw err;
    const stats = fs.statSync(destination);
    const fileSizeInBytes = stats.size;
    console.log(`successfully downloaded file ${fileSizeInBytes}`)


    console.log('Saved!');
  });
  

});





