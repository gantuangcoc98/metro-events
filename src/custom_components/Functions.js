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

/* Functions for Notification Functionality */
const notifyTo = (userId, type, eventId, cancelReason) => {
    const notifications_database = JSON.parse(window.localStorage.getItem('notifications'));
    const event = retrieveEvent(eventId);

    switch(type) {
        case 'requestOrganizer':
            const adminNotifFound = notifications_database.findIndex(notif => notif.userId === userId);

            if (adminNotifFound >= 0) {
                const notif_item = {
                    itemId: notifications_database[adminNotifFound].items.length + 1,
                    title: 'You have new organizer request.',
                    description: 'Click here to manage.',
                    path: '/admin',
                    status: 0,
                }

                notifications_database[adminNotifFound].items.push(notif_item);
                window.localStorage.setItem('notifications', JSON.stringify(notifications_database));

                console.log('Sent notifications to admin.');
            } else {
                console.log('Failed to notify admin, admin data notification not found.');
            }
            
            break;
        case 'requestParticipation':
            const ownerNotifFound = notifications_database.findIndex(notif => notif.userId === userId);
            if (ownerNotifFound) {
                const notif_item = {
                    itemId: notifications_database[ownerNotifFound].items.length + 1,
                    title: `A user have requested to participate in your event: ${event.title}`,
                    description: 'Click here to manage.',
                    path: `/organize/event/${eventId}`,
                    status: 0,
                }

                notifications_database[ownerNotifFound].items.push(notif_item);
                window.localStorage.setItem('notifications', JSON.stringify(notifications_database));
            } else {
                console.log('Failed to notify owner, owner notification data not found.');
            }
            break;
        case 'acceptParticipation':
            const userNotifFound = notifications_database.findIndex(notif => notif.userId === userId);
            if (userNotifFound) {
                const notif_item = {
                    itemId: notifications_database[userNotifFound].items.length + 1,
                    title: `Congratulations! You have been accepted to participate in the event: ${event.title}`,
                    description: 'Click here to view other events.',
                    path: `/events`,
                    status: 0,
                }

                notifications_database[userNotifFound].items.push(notif_item);
                window.localStorage.setItem('notifications', JSON.stringify(notifications_database));
            } else {
                console.log('Failed to notify user, user notification data not found.')
            }
            break;
        case 'denyParticipation':
            const _userNotifFound = notifications_database.findIndex(notif => notif.userId === userId);
            if (_userNotifFound) {
                const notif_item = {
                    itemId: notifications_database[_userNotifFound].items.length + 1,
                    title: `Sorry, you have been declined to participate in the event: ${event.title}`,
                    description: 'Click here to view other events.',
                    path: `/events`,
                    status: 0,
                }

                notifications_database[_userNotifFound].items.push(notif_item);
                window.localStorage.setItem('notifications', JSON.stringify(notifications_database));
            } else {
                console.log('Failed to notify user, user notification data not found.')
            }
            break;
        case 'newEvent':
            const allUserNotifFound = notifications_database.findIndex(notif => notif.userId === userId);
            if (allUserNotifFound >= 0) {
                const notif_item = {
                    itemId: notifications_database[allUserNotifFound].items.length + 1,
                    title: `A new event has been posted: ${event.title}`,
                    description: 'Click here to view all events!',
                    path: `/events`,
                    status: 0,
                }

                notifications_database[allUserNotifFound].items.push(notif_item);
                window.localStorage.setItem('notifications', JSON.stringify(notifications_database));
            }
            break;
        case 'deleteEvent':
            const allParticipantsFound = notifications_database.findIndex(notif => notif.userId === userId);
            if (allParticipantsFound >= 0) {
                const notif_item = {
                    itemId: notifications_database[allParticipantsFound].items.length + 1,
                    title: `Event: ${eventId} has been cancelled.`,
                    description: `Reason: ${cancelReason}`,
                    path: `/events`,
                    status: 0,
                }

                notifications_database[allParticipantsFound].items.push(notif_item);
                window.localStorage.setItem('notifications', JSON.stringify(notifications_database));
            }
            break;
        default:
            break;
    }
}

export {
    retrieveAccount, retrieveRequest, approveRequest, denyRequest, addEvent, ownedEvents, retrieveEvent, updateEvents, notifyTo
}