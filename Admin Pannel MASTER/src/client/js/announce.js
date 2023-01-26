//getting the announcement from the form
var announcement = document.getElementsByName("announce")[0];
//defining our routes (that convienintly dont exist yet)
const route = '/announce'
const routelink = 'https://api.mymicds.net/v3/announcements'
//this is the function that will be used to update the announcement
function updateAnnouncement() {
    //grabbing the announcement from above
    var announcement = announcement.value
    console.log('Added announcement: ' + announcement)
}
function ClearAnnouncement() {
    //clearing the announcement
    var announcement = ''
    console.log('Announcement Cleared')
}