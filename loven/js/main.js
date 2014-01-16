// VIDEO STREAMING ----------------------------------------------------------------------------------------------------
	
	var connectPlay = false;
	var initialPlay = false;
	var currentlyPlaying = false;

    var dur = 0;
    var seek = 0;
    var xPos = 0;
    var width = 374;
	
	var flashReady = function(){    

        console.log('ran');

        $(".play_btn").on('click', function(){

           if(connectPlay === false){
                flash.connect('rtmp://localhost/SMSServer');  
            }
            else{
                playVideo();
            }

        });          

    };

	var connected = function(success,error){

 		console.log(success, 'success');

        connectPlay = true;

        if(connectPlay === true){
            playVideo();
        }

    }; 

    var getDuration = function(duration){

        dur = duration;

    };

    var seekTime = function(time){

        seek = time;

        if(currentlyPlaying === true){
            getXPos();
        }

    };

    // PLAY FUNCTION ------------------------------

    var playVideo = function(){

            if(initialPlay === false){

                initialPlay = true;
                currentlyPlaying = true;
                $('.play_btn').empty();
                $('.play_btn').append('<img src="images/pause-icon.png">');

                flash.startPlaying('hobbit_vp6.flv');

            }else if(currentlyPlaying === false && initialPlay === true){

                currentlyPlaying = true;
                $('.play_btn').empty();
                $('.play_btn').append('<img src="images/pause-icon.png">');

                flash.playPause();

            }else{

                currentlyPlaying = false;
                $('.play_btn').empty();
                $('.play_btn').append('<img src="images/play-icon.png">');
                flash.playPause();

            }

            console.log('play: ', currentlyPlaying);

    };

    var getXPos = function(){

        xPos = (seek / dur) * width;
        $('.scrubber_icon').css('left', xPos + 8);


    };


    // var globalError = function(msg)
    // {

    //  console.log('msg',msg);

    // };


// MAIN ----------------------------------------------------------------------------------------------------


$(function(){

	// LOGIN CLICK FUNCTIONS ------------------------------

	var fbLogin = false;
	var ghLogin = false;

    $('.facebook').click(function() {

    	if(fbLogin == false)
    	{
    		fbLogin = true;
    	}else{
    		fbLogin = false;
    	};

    	if(ghLogin == true){
    		ghLogin = false;
    		$('#gh_login').slideToggle(300, function(){
    			$('#fb_login').slideToggle(300);
    		});

    	}else{
    		$('#fb_login').slideToggle(300);
    	};
        
    });

    $('.github').click(function() {

    	if(ghLogin == false)
    	{
    		ghLogin = true;
    	}else{
    		ghLogin = false;
    	};

    	if(fbLogin == true){
    		fbLogin = false;
    		$('#fb_login').slideToggle(300, function(){
    			$('#gh_login').slideToggle(300);
    		});

    	}else{
    		$('#gh_login').slideToggle(300);
    	};     
        
    });

});