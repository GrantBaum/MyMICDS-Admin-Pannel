console.log(MyMICDS)
const mymicds = new MyMICDS.MyMICDS();
//yoinks the inputs from the user
var userInput = document.getElementsByName("user")[0];
var passInput = document.getElementsByName("pass")[0];
function formChanged() {
	//lets me know this works as it should
    console.log('Password Request Function Called')
	//here are the input values we grabbed!
    var user = userInput.value
    var pass = passInput.value
	//the auth function straight from the SDK
    mymicds.auth
	.login({ user: user, password: pass })
	.subscribe(
		data => {
			console.log('data', data);
			console.log(user, pass)
			//checks if the login worked
			if (data.success === true) {
				//checks if they are an admin before logging in
				if (mymicds.auth.snapshot.scopes.admin === true) {
					location.href = '/Admin Pannel MASTER/src/client/html/app/index.html'
					console.log('Admin Confirmed')
					}
					//if they arent an admin they will be logged out
				else {
					console.log('Admin Denied')
					alert('Invalid admin credentials. You have been logged out.')
					logOut()
				}
			}
		},
		err => {
			console.log('err', err);
		}
	);

	return false;
	//logout function
}
function logOut() {
	mymicds.auth.logout().subscribe(() => {
		console.log('Logged out successfully!');
		location.href = '/Admin Pannel MASTER/src/client/html/login/login.html'
		});
}



