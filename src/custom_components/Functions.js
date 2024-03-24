const retrieveAccount = (userId) => {
    const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];

    if (accounts !== null) {
        const retrievedAccount = accounts.find(account => account.userId === userId);
        return retrievedAccount;
    }

    return null;
}

const retrieveRequest = (userId) => {
    const requests = JSON.parse(window.localStorage.getItem('organizer_requests')) || [];

    const requestFound = requests.find(account => account.userId === userId);
    if (requestFound) {
        const account = retrieveAccount(userId);
        return account;
    }

    return null;
}

const approveRequest = (userId) => {
    const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];

    const userIndex = accounts.findIndex(account => account.userId === userId);
    if (userIndex >= 0) {
        accounts[userIndex].userType = 1;
        window.localStorage.setItem('accounts', JSON.stringify(accounts));
        removeRequest(userId);
        console.log(accounts[userIndex].username + ' has been approved!');

        window.location.reload();
    } else {
        console.log('Could not find the user ' + userId);
    }
}

const denyRequest = (userId) => {
    const account = removeRequest(userId);
    console.log(account.username + ' has been denied!');

    window.location.reload();
}

const removeRequest = (userId) => {
    let requests = JSON.parse(localStorage.getItem('organizer_requests')) || [];
    const account = requests.find(account => account.userId === userId);

    requests = requests.filter(account => account.userId !== userId);
    window.localStorage.setItem('organizer_requests', JSON.stringify(requests));
    console.log(account.username + ' has been removed from the requests.');

    return account;
}

const addEvent = (event, userId) => {
    const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];
    
    const userIndex = accounts.findIndex(account => account.userId === userId);
    if (userIndex >= 0) {
        accounts[userIndex].events.push(event);
        window.localStorage.setItem('accounts', JSON.stringify(accounts));
        console.log('Successfully added new event for user ' + accounts[userIndex].username + "!");
    } else {
        console.log('Could not find the user ' + userId);
    }
}

export {
    retrieveAccount, retrieveRequest, approveRequest, denyRequest, addEvent
}