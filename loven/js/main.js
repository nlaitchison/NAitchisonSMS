$(function(){

    var userInfo = '';

    // FIREBASE LOGIN  ------------------------------

    var myDataRef = new Firebase('https://loven.firebaseio.com/');

    var chatRef = new Firebase('https://loven.firebaseio.com');

    var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {

        if(error){
            // an error occurred while attempting login
            console.log(error);
        }else if(user){

            userInfo = user;
            // user authenticated with Firebase
            console.log(user);

            if(userInfo != ''){   
                loggedInView();
            }

        }else {
            // user is logged out
            loginView();
        }

    });

    var loginView = function(){

        $('nav ul').html('<li> <a href="#" class="twitter">twitter login</a></li><li class="pipe">|</li><li> <a href="#" class="github">github login</a></li>')

        $('.twitter').click(function() {

           auth.login('twitter');

        });

        $('.github').click(function() {

            user = auth.login('github');    
            
        });

    };

    var loggedInView = function(){

        $('nav ul').html('<li class="user"> hello, '+userInfo.username+'</li><li class="pipe">|</li><li class="logout">logout</li>');

        $('.logout').click(function() {

            auth.logout();
            console.log('logout');

            loginView();

        });

    };




});