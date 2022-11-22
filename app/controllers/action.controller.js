const Action = require('./../models/Action');

async function actionList(clientId) {

    let clients = await Action.find({client: clientId}).lean();

    return clients;
}

async function actionAdd(data) {
    let newAction = new Action(data);
    newAction.save();
    
}


module.exports = {
    add: actionAdd,
    list: actionList,
}