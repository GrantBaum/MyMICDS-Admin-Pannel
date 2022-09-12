console.log(MyMICDS)
const mymicds = new MyMICDS.MyMICDS();
var userInput = document.getElementsByName("user")[0];
var passInput = document.getElementsByName("pass")[0];
function formChanged() {
    console.log('formChanged function')
    var user = userInput.value
    var pass = passInput.value
    mymicds.auth
	.login({ user: user, password: pass })
	.subscribe(
		data => {
			console.log('data', data);
			console.log(user, pass)
			if (data.success === true) {
				if (mymicds.auth.snapshot.scopes.admin === true) {
					location.href = '/Admin Pannel MASTER/src/client/html/app/index.html'
					console.log('Admin Confirmed')
					}
				if (mymicds.auth.snapshot.scopes.admin === false) {
					logOut()
					console.log('Admin Denied')
					alert('You arent an admin. You have been logged out.')
				}
			}
		},
		err => {
			console.log('err', err);
		}
	);

	return false;
}
function logOut() {
	mymicds.auth.logout().subscribe(() => {
		console.log('Logged out successfully!');
		location.href = '/Admin Pannel MASTER/src/client/html/login/login.html'
		});
}



