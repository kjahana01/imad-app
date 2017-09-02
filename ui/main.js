// Submit username/password  to login
        var submit = document.getElementById('submit_btn');
        submit.onclick = function () {
    
     //  Create a request
    var request = new XMLHttpRequest();
    
    // Capture the response and store it in a variable
   request.onreadystatechange = function () {
       if (request.readyState === XMLHttpRequest.Done) {
              //take some action
              if (request.status === 200) {
                   alert('Logged in successfully');
              } else if (request.status === 403) {
                  alert('Username/password is incorrect');
              } else if (request.status === 500) {
                  alert('Something went wrong on the server');
              }
          }
           //Not done yet
        };
        
    // Make The request
          var username = document.getElementById("username").value;
          var password = document.getElementById("password").value;
          console.log(username);
          console.log(password);
          request.open('POST', 'http://kushaljoharapurkar.imad.hasura-app.io/login', true);
          request.setRequestHeader('Content-Type', 'application/json');
          request.send(JSON.stringify({username: username, password: password}));
};