let input = process.argv.splice(2);
let website=input[0]
let destination=input[1]

console.log(input)
const request = require('request');
const fs = require('fs');


const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



request(website, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.

  if (response.statusCode===404){   //not working yet
    console.log('url does not exist! Error')
    // process.exit

    throw new Error();
  }

  fs.access(destination, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err)
      return
    }

    rl.question("File exist already, Overwrite?  (y/n)", (answer) => {
      if (answer === 'y'){
        write(destination, body)
      } else {
        console.log('Thanks')
        process.exit
      }
      rl.close();
    });

  });





})

const write = function(destination, body){
  
  fs.writeFile(destination, body, function (err) {
    if (err) throw err;

    const stats = fs.statSync(destination);
    const fileSizeInBytes = stats.size;

    console.log(`successfully downloaded file ${fileSizeInBytes}`)

    console.log('Saved!');

  });
}

