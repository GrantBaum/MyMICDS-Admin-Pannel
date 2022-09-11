
console.log(MyMICDS)
const mymicds = new MyMICDS.MyMICDS();

function loginCheck() {
    console.log('loginCheck')
    if (mymicds.auth.isLoggedIn === false) {
        location.href = '/Admin Pannel MASTER/src/client/html/login/login.html'
        alert('Nice try. Maybe log in?')
        console.log("loginCheck Failed")
    }
}
function adminCheck() {
    console.log('adminCheck')
    if (mymicds.auth.snapshot.scopes.admin === false) {
        location.href = '/Admin Pannel MASTER/src/client/html/login/login.html'
        alert('Pretty sure you need to be an admin to go here.')
        console.log('adminCheck Failed')
    }

}
function logOut() {
	mymicds.auth.logout().subscribe(() => {
		console.log('Logged out successfully!');
        location.href = '/Admin Pannel MASTER/src/client/html/login/login.html'
		});
}