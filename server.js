const myLogEvents = require('./myLogEvents');

const Event = require('events');

class MyEvent extends Event { };

const myEvent = new MyEvent();

const http = require('http');
const path = require('path');
const fs = require('fs');
const { date } = require('date-fns/locale');
const fspromise = require('fs').promises;


//  listen to the event
// myEvent.on('log',(mess) =>{

//     return myLogEvents(mess);
// });



// setTimeout(() =>{
//    myEvent.emit('log','i was gonna tell your mom');
// },2000);

let filepath;


const PORT = process.env.PORT || 3500;

const server = http.createServer((request,response) =>{

    console.log(`URL Request: ${request.url}`);
    console.log(`Request Method : ${request.method}`);
    if(request.url === '/' || request.url === 'index.html')
    {
        response.statusCode = 200;
        console.log(response.statusCode);

        response.setHeader('Content-type','text/html');
        filepath = path.join(__dirname,'views','index.html');
         console.log(filepath);
         console.log(`Extension url: ${path.extname(request.url)}`);
        fs.readFile(filepath,'utf-8',(error,data) =>{
            if(error) return error;
            response.end(data);
           
        })
    }


    let extentionUR = path.extname(request.url);

    let contentType;

    switch (extentionUR)
    {
        case '.css':
          contentType = 'text/css';
         break;

         case  '.js':
             contentType = 'text/javascript';
         break;

        case '.json':
             contentType = 'application/json';
         break;

         default:
             contentType = 'text/html';
                
    }


    console.log(`Extension is : ${extentionUR}`);
    console.log('Content-type : ',contentType);

});


server.listen(PORT,() =>{
    console.log(`Server is running on port : ${PORT}`);

})
