// VIDEO STREAMING ----------------------------------------------------------------------------------------------------


	var play = false;
	
	var flashReady = function(){

		// CONNECT 
                
        flash.connect('rtmp://localhost:5080/SMSServer');


        // PLAY VIDEO 

        $(".play_btn").on('click', function(){

        	flash.startPlaying('hobbit_vp6.flv');

        	if(play === false){

        		play = true;
        		$('.play_btn').empty();
        		$('.play_btn').append('<img src="images/pause-icon.png">');

        	}else{

        		play = false;
        		$('.play_btn').empty();
        		$('.play_btn').append('<img src="images/play-icon.png">');

        	}
        	
        	console.log('play: ', play);

        });

    };


// MAIN ----------------------------------------------------------------------------------------------------


$(function(){

	// LOGIN CLICK FUNCTIONS 

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