var web = true

 function checkInternetConnection() {
            fetch('https://www.google.com', { mode: 'no-cors' })
                .then(() => {
                    // Internet connection is available, hide the "no internet" content
                    document.getElementById('no-internet').style.display = 'none';
                })
                .catch(() => {
                    // No internet connection, display the "no internet" content
                    document.getElementById('content').style.display = 'none';
                    document.getElementById('no-internet').style.display = 'block';
                });
        }

        // Check internet connectivity when the page loads
        window.addEventListener('load', checkInternetConnection);
