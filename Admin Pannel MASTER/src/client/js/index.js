console.log('Test')
//website status variable
var WebStatus = "Online"
function TakeOverTheWorld() {
    location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
}
function ShutdownAction() {
    alert("This will shut down MyMICDS untill it is manually reactivated again. Are you sure you want to continue?")
    location.href = 'restart.html'
    //@todo: make this function talk with api.index.ts which can in turn shut dowm the website
};
    function RestartAction() {
        alert("This will reactivate manually reactivate MyMICDS. Are you sure you want to continue?")
        location.href = 'shutdown.html'
        //@todo: make this function talk with api.index.ts which can in turn restart the website
    };
    // const socket = io('https://io.mymicds.net');
			const socket = io('http://localhost:1421');

			const $label = $('.label');
			const $debug = $('.debug');
			const $password = $('.password');
    //Making the website know that if it is off, to redirect automatically to the restart page.
    //@todo fix this because i did it wrong.
            if (website = offline) {
                //redirect Shutdown.html to Restart.html
              }
