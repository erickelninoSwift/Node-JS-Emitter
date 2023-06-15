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


const serverfile = async(filepath,contentType,response) =>{

    try
    {
        const data = await fspromise.readFile(filepath,'utf-8');
        response.writeHead(200,{'content-type':contentType})
        response.end(data);
        
    }catch(error)
    {
        console.error(error);
        response.statusCode = 500;
        response.end();
    }

};

const PORT = process.env.PORT || 3500;

const server = http.createServer((request,response) =>{

    console.log(`URL Request: ${request.url}`);
    console.log(`Request Method : ${request.method}`);
    // if(request.url === '/' || request.url === 'index.html')
    // {
    //     response.statusCode = 200;
    //     console.log(response.statusCode);

    //     response.setHeader('Content-type','text/html');
    //     filepath = path.join(__dirname,'views','index.html');
    //      console.log(filepath);
    //      console.log(`Extension url: ${path.extname(request.url)}`);
    //     fs.readFile(filepath,'utf-8',(error,data) =>{
    //         if(error) return error;
    //         response.end(data);
           
    //     })
    // }


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

    let filePath2 = path.join(__dirname,'views','index.html');
    response.statusCode = 200;
    response.setHeader('Content-type',contentType);

    if(!extentionUR && request.url.slice(-1) !== '/')
    {
        filePath2+= '.html';
    }

     const fileExiste = fs.existsSync(filePath2);

     if(fileExiste)
     {
        serverfile(filePath2,contentType,response);
        console.log(path.parse(filePath2));
    
     }else
     {
        //404 or 301
       switch(path.parse(filePath2).base)
       {
           case 'old.html':

           response.writeHead(301,{'Location': './404.html'})
           response.end();
           break;
       }

       serverfile(path.join(__dirname,'views','404.html'),contentType,response);

     }

    console.log(`Extension is : ${extentionUR}`);
    console.log('Content-type : ',contentType);

});


server.listen(PORT,() =>{
    console.log(`Server is running on port : ${PORT}`);

})
