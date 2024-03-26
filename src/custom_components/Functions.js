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

const ownedEvents = (userId) => {
    const events = JSON.parse(window.localStorage.getItem('events')) || [];

    const _ownedEvents = events.filter(event => event.userId === userId);
    return _ownedEvents;
}

const retrieveEvent = (eventId) => {
    const events = JSON.parse(window.localStorage.getItem('events')) || [];

    const eventFound = events.find(event => event.eventId === eventId);
    if (eventFound) return eventFound;

    return events;
}

const updateEvents = () => {
    const newEvents = new Array();
    const accounts = JSON.parse(window.localStorage.getItem('accounts')) || [];

    if (accounts && Array.isArray(accounts)) {
        accounts.forEach(account => {
            if (account.events && Array.isArray(account.events)) {
                account.events.forEach(event => {
                    newEvents.push(event);
                });
            }
        });
    }

    window.localStorage.setItem('events', JSON.stringify(newEvents));
}

export {
    retrieveAccount, retrieveRequest, approveRequest, denyRequest, addEvent, ownedEvents, retrieveEvent, updateEvents
}