console.log('moderate.js loaded')
const mymicds = new MyMICDS.MyMICDS();
mymicds.background;
function getBackground() {
//all this will be called during the get background function
//then we will use another function to display the data on the moderation page
getAll().subscribe(
    data => {
        console.log('data', data);
}
)
};