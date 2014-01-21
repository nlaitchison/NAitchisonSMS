// VIDEO PLAYER ----------------------------------------------------------------------------------------------------
	
	var nowConnected = false;

    var clickedPlay = false;
	var initialPlay = false;
	var currentlyPlaying = false;
    var dur = 0;
    var seek = 0;
    var xPos = 0;
    var width = 374;

    var clickedMic = false;
    var showMic = false;
    var selectedMic = 0;

    var clickedCam = false;
    var showCam = false;
    var selectedCam = 0;

    var clickedRec = false;
    var currentlyRec = false;

    var clickedVolume = false;
    var showVolume = false;

	
	var flashReady = function(){    

        $(".play_btn").on('click', function(){

            clickedPlay = true;

           if(nowConnected === false){
                flash.connect('rtmp://localhost/SMSServer');  
            }
            else{
                playVideo();
            };

        }); 

        $(".mic_btn").on('click', function(){

            clickedMic = true;

           if(nowConnected === false){
                flash.connect('rtmp://localhost/SMSServer');  
            }
            else{
                showMicrophones();
            };

        });   

        $(".camera_btn").on('click', function(){

            clickedCam = true;

           if(nowConnected === false){
                flash.connect('rtmp://localhost/SMSServer');  
            }
            else{
                showCameras();
            };

        });  

        $(".rec_btn").on('click', function(){

            clickedRec = true;

           if(nowConnected === false){
                flash.connect('rtmp://localhost/SMSServer');  
            }
            else{
                record();
            };

        });    

        $(".volume_btn").on('click', function(){

            clickedVolume = true;

           if(nowConnected === false){
                flash.connect('rtmp://localhost/SMSServer');  
            }
            else{
                volume();
            };

        });             

    };

	var connected = function(success,error){

 		console.log('connected', success);

        nowConnected = true;

        if(nowConnected === true ){

            if(clickedPlay === true){

                playVideo();

            }else if(clickedMic === true){

                showMicrophones();

            }else if(clickedCam === true){

                showCameras();

            }else if(clickedRec === true){

                record();

            }else if(clickedVolume === true){
                volume();
            };
            
        };

    }; 

    var getDuration = function(duration){

        dur = duration;

    };

    var seekTime = function(time){

        seek = time;

        if(currentlyPlaying === true){
            moveScrubber();
        };

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

            };

            if(showMic === true){

                $('li.mic_btn ul.options').empty();
                showMic = false;

            };

            if(showCam === true){

              $('li.camera_btn ul.options').empty();
              showCam = false;

            };

            if(showVolume === true){

                showVolume = false;
                $('ul.volume_level').css('display', 'none');

            };

            console.log('play: ', currentlyPlaying);

    };


    // SCRUBBER FUNCTION ------------------------------


    var moveScrubber = function(){

        xPos = (seek / dur) * width;
        $('.scrubber_icon').css('left', xPos + 8);
        // $('.scrubber_icon').offset({left: xPos + 8});

    };


     // MICROPHONE FUNCTION ------------------------------


     var showMicrophones = function(){

        var allMics = flash.getMicrophones();

        if(showMic === false && showCam === false){

            for(var i = 0, max = allMics.length; i<max; i++){

                $('li.mic_btn ul.options').append('<li data-id="'+i+'">' + allMics[i] + '</li>');

            }

            showMic = true;

        }else if(showMic === false && showCam === true){

            for(var i = 0, max = allMics.length; i<max; i++){

                $('li.mic_btn ul.options').append('<li data-id="'+i+'">' + allMics[i] + '</li>');

            }

            showMic = true;

            $('li.camera_btn ul.options').empty();
            showCam = false;

        }else{

            $('li.mic_btn ul.options').empty();
            showMic = false;
        };

        if(showVolume === true){

            showVolume = false;
            $('ul.volume_level').css('display', 'none');

        };

        $('li.mic_btn ul.options li').on('click', function(){

            selectedMic = $(this).attr('data-id');
            console.log(selectedMic);

        });

     };


    // CAMERA FUNCTION ------------------------------


    var showCameras = function(){

        var allCameras = flash.getCameras();

        if(showCam === false && showMic === false){

            for(var i = 0, max = allCameras.length; i<max; i++){

                $('li.camera_btn ul.options').append('<li data-id="'+i+'">' + allCameras[i] + '</li>');

            }  

            showCam = true;

        }else if(showCam === false && showMic === true){ 

            for(var i = 0, max = allCameras.length; i<max; i++){

                $('li.camera_btn ul.options').append('<li data-id="'+i+'">' + allCameras[i] + '</li>');

            }  

            showCam = true;

            $('li.mic_btn ul.options').empty();
            showMic = false;

        }else{

          $('li.camera_btn ul.options').empty();
          showCam = false;

        };

        if(showVolume === true){

            showVolume = false;
            $('ul.volume_level').css('display', 'none');

        };

        $('li.camera_btn ul.options li').on('click', function(){

            selectedCam = $(this).attr('data-id');
            console.log(selectedCam);

        });

    };


    // RECORD FUNCTION ------------------------------


    var record = function(){

        if(currentlyRec === false){

            flash.startRecording('testing', selectedCam, selectedMic);
            currentlyRec = true;
            $('.rec_btn').empty();
            $('.rec_btn').append('<img src="images/recording-icon.png">');

        }else{

            flash.stopRecording();
            $('.rec_btn').empty();
            $('.rec_btn').append('<img src="images/record-icon.png">');
            currentlyRec = false;

        };

    };


    // VOLUME FUNCTION ------------------------------


    var volume = function(){

        if(showVolume === false){

            showVolume = true;
            $('ul.volume_level').css('display', 'block');


            $('ul.volume_level li').click(function() {
                $('ul.volume_level').empty();

                var num = $(this).attr('id');

                if(num === '1'){
                    $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-icon.png"></li><li id="3"><img src="images/volume-level-icon.png"></li><li id="2"><img src="images/volume-level-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
                    flash.setVolume(0.2);
                }else if(num === '2'){
                    $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-icon.png"></li><li id="3"><img src="images/volume-level-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
                    flash.setVolume(0.4);
                }else if(num === '3'){
                    $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-icon.png"></li><li id="3"><img src="images/volume-level-selected-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
                    flash.setVolume(0.6);
                }else if(num === '4'){
                    $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-selected-icon.png"></li><li id="3"><img src="images/volume-level-selected-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
                    flash.setVolume(0.8);
                }else if(num === '5'){
                    $('ul.volume_level').append('<li id="5"><img src="images/volume-level-selected-icon.png"></li><li id="4"><img src="images/volume-level-selected-icon.png"></li><li id="3"><img src="images/volume-level-selected-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
                    flash.setVolume(1);
                };

                $('ul.volume_level').css('display', 'none');
                showVolume = false;

            });


        }else{

            showVolume = false;
            $('ul.volume_level').css('display', 'none');
        
        };

        if(showMic === true){

            $('li.mic_btn ul.options').empty();
            showMic = false;

        };

        if(showCam === true){

          $('li.camera_btn ul.options').empty();
          showCam = false;

        };
    
    };





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
    



            // $('ul.volume_level li#1').click(function() {
            //     $('ul.volume_level').empty();
            //     $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-icon.png"></li><li id="3"><img src="images/volume-level-icon.png"></li><li id="2"><img src="images/volume-level-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
            // });

            // $('ul.volume_level li#2').click(function() {
            //     $('ul.volume_level').empty();
            //     $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-icon.png"></li><li id="3"><img src="images/volume-level-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
            // });

            // $('ul.volume_level li#3').click(function() {
            //     $('ul.volume_level').empty();
            //     $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-icon.png"></li><li id="3"><img src="images/volume-level-selected-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
            // });

            // $('ul.volume_level li#4').click(function() {
            //     $('ul.volume_level').empty();
            //     $('ul.volume_level').append('<li id="5"><img src="images/volume-level-icon.png"></li><li id="4"><img src="images/volume-level-selected-icon.png"></li><li id="3"><img src="images/volume-level-selected-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
            // });

            // $('ul.volume_level li#5').click(function() {
            //     $('ul.volume_level').empty();
            //     $('ul.volume_level').append('<li id="5"><img src="images/volume-level-selected-icon.png"></li><li id="4"><img src="images/volume-level-selected-icon.png"></li><li id="3"><img src="images/volume-level-selected-icon.png"></li><li id="2"><img src="images/volume-level-selected-icon.png"></li><li id="1"><img src="images/volume-level-selected-icon.png"></li>');
            // });

});