const {format} = require('date-fns');
const { v4: uuid } = require('uuid');
const path = require('path');
const filesystem = require('fs');
const fsPromises  = require('fs').promises;

const myLogEvents = async (message) =>{
    const dateTime = `${format(new Date(), 'yyyy-MM-dd')}`;
    const uuidUser = `${uuid()}`;
    const dataWrite = `${dateTime}\t${uuidUser}\t${message}\n`;

    try
    {
        if(!filesystem.existsSync(path.join(__dirname,'logs')))
        {
            await fsPromises.mkdir(path.join(__dirname,'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname,'logs','eventLogs.txt'),dataWrite);

    }catch(error)
    {
        console.error(`Error found : ${error}`);

    }finally
    {
        console.log('Action terminated!');
    }
}

module.exports = myLogEvents;