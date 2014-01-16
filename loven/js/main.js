// VIDEO STREAMING ----------------------------------------------------------------------------------------------------


	var play = false;
	
	var flashReady = function(){

		// CONNECT 
               

         console.log('ran ');
        flash.connect('rtmp://localhost/SMSServer');

               

    };

     var connected = function(success,error){

     		console.log(success, 'success');
        	// PLAY VIDEO 

	        $(".play_btn").on('click', function(){

	        	if(play === false){

	        		play = true;
	        		$('.play_btn').empty();
	        		$('.play_btn').append('<img src="images/pause-icon.png">');

	        		flash.startPlaying('hobbit_vp6.flv');

	        	}else{

	        		play = false;
	        		$('.play_btn').empty();
	        		$('.play_btn').append('<img src="images/play-icon.png">');
	        		flash.stopPlaying();

	        	}
	        	
	        	console.log('play: ', play);

	        });

        }; 

      var globalError = function(msg)
      {

      	console.log('msg',msg);
      }


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