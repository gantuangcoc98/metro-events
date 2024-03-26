----------Latest update----------

Fixes:
* CreateEvent.js
	- Implemented notification functionality where it will notify all the users about the new event.

* Notification.js
	- Fixed by displaying the right notification for the user and limited the notification to the latest 10 notifications.

* Events.js
 	- Implemented notification functionality where if a user participates it will notify a request to the organizer, if the user is the owner it will set it to an edit functionality instead. If the owner responds to the request, it will set the necessary response. Designed new scrollbar.

* Login.js
	- Added a new hover design of underline animation whenever the user hovers the 'register here' text.

* OrganizeEvent.js
	- Added a new design for save and delete button. For the delete button, whenever it is clicked it will prompt the user to confirm their cancellation and provide a reason. Implemented a proper accept/deny handling for participants and notifies the participants if they are accepted, denied, or the event is cancelled for a reason.

* App.css
	- Implemented there is the scrollbar design for both notification and events page.

* App.js
	- Implemented a default route whenever the user tries to access undefined route, it will navigate back to the home page.

* AppBar.js
	- Added a new notification prompt design and implemented proper notification handling whenever the user receives a new notificaiton.

Added functionality:
* Added new function notifyTo in Function.js
	- where you can properly notify whatever account it is pertaining to, be it organizer, admin, or just a regular user in any necessary transaction/activity an account has done.