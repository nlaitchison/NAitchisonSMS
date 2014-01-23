$(function(){

    var userInfo = '';

    // FIREBASE LOGIN  ------------------------------

    // var myDataRef = new Firebase('https://loven.firebaseio.com/');

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


    $('.comment_submit').click(function (e) {
        var name = userInfo.username;
        var text = $('.comment_input').val();
        var dateTime = getDateTime();

        if(userInfo.provider === 'twitter'){
            var img = userInfo.profile_image_url;
        }else if(userInfo.provider === 'github'){
            var img = userInfo.avatar_url;
        }

        if (text != '' && userInfo != '') {
          chatRef.push({name: name, text: text, timeStamp: dateTime, img:img});
          $('.comment_input').val('');
        }

      });

      chatRef.on('child_added', function(snapshot) {
        var message = snapshot.val();
        displayChatMessage(message.name, message.text, message.timeStamp, message.img);
      });
      function displayChatMessage(name, text, timeStamp, img) {
         $('#video_comments').append('<div class="comment"><ul><li><img src="'+img+'"></li><li class="comment_user">'+name+'</li><li class="comment_date">'+timeStamp+'</li><div class="clear_fix"></div></ul><p class="comment_text">'+text+'</p><div class="comment_border"></div>');
      };

   var getDateTime = function(dt){

        var months = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
        var d = new Date();

        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        
        var a_p = "";
        var curr_hour = d.getHours();

        if(curr_hour < 12){
           a_p = "AM";
        }else{
           a_p = "PM";
        }
        
        if(curr_hour == 0){
           curr_hour = 12;
        }
        if(curr_hour > 12){
           curr_hour = curr_hour - 12;
        }

        var curr_min = d.getMinutes();
        curr_min = curr_min + "";

        if(curr_min.length == 1){
           curr_min = "0" + curr_min;
        }

        var dateTime = months[curr_month] + " " + curr_date + ", " + curr_year + ' - ' + curr_hour + ':' + curr_min + a_p; 
        return dateTime;
    };



});