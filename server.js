const myLogEvents = require('./myLogEvents');

const Event = require('events');

class MyEvent extends Event { };

const myEvent = new MyEvent();



//  listen to the event
myEvent.on('log',(mess) =>{

    return myLogEvents(mess);
});



setTimeout(() =>{
   myEvent.emit('log','i was gonna tell your mom');
},2000);


