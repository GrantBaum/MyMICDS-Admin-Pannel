console.log('Test')
function AdminLogin() {
    const user_base_url = "mymicds.net/admin";
    class CustomerService{
        authenticateUser(user) {
            return axios.post(user_base_url+ '/login', user)
             .then((res)=>{
               if(res.data === 'SUCCESS') {
                 //user logged in, Success
               } else if(res.data === 'FAILURE') {
                 //login failed, try again later
               }})
             .catch(err) {
               console.error(err)
             }
        }
    }
