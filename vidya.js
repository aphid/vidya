//set up some things we're going to use in an accessible scope so they can be accessed via console for debugging
var pop, aud, canvas, ctx, vid;

//this object has source media information for a second video we're going to load. 
var hygine = { 
    mp4: "https://archive.org/download/Personal1950/Personal1950_512kb.mp4",
    ogg: "https://archive.org/download/Personal1950/Personal1950.ogv"
};

//this stuff runs after the DOM/page has finished loading (not media, but the tags and such that load them)
document.addEventListener("DOMContentLoaded", function (event) {
    
    //initialize canvas
    canvas = document.querySelector('#thecanvas');
    ctx = canvas.getContext("2d");
    
    vid = document.querySelector('#tehvidya'); //this is a dom object;
    
    //these are Popcorn objects
    aud = Popcorn('#burroughs');
    pop = Popcorn('#tehvidya', {
        frameAnimation: true
    }); //http://popcornjs.org/popcorn-docs/popcorn-constructor/

    //this is the title
    var h1 = document.querySelector("h1");

    //the stuff in here happens when the video has loaded enough to know its duration, width, height, etc.
    pop.on("loadedmetadata", function () {
        
        //mutes the video, since we want to hear 'aud' instead.
        pop.mute();

        //starts playing audio from the beginning.  play(5) would start at 5 and so on
        aud.play();
        
        //makes canvas the size of the video itself, not however it's scaled using CSS.
        canvas.width = vid.videoWidth;
        canvas.height = vid.videoHeight;

        console.log(pop.duration());
        //fade out the title
        h1.style.opacity = 0;
    });

    //this happens when the css transition (from the opacity change) ends on the title element
    h1.addEventListener("transitionend", function () {
        pop.play();

    });

    //this draws a google map centered on guatemala city from 56 seconds to 65 seconds.
    pop.googlemap({
        start: 56,
        end: 65,
        target: "imagediv",
        type: "HYBRID ",
        lat: 14.613333,
        lng: -90.535278,
        zoom: 7,
        onmaploaded: function (options, map) {
            // map is a reference to the actual map object
            // options is the options object that was passed in initially
        }
    });

    //this shows an an image, in 'imagediv' from 3-5 seconds.
    pop.image({
        // seconds
        start: 3,
        // seconds
        end: 5,
        src: "http://media.giphy.com/media/issHYYSN6OW3K/giphy.gif",
        target: "imagediv"
    });
    
    //at the 5 second mark, jump to the 48 second mark
    pop.cue(5, function () {
        pop.play(48);

    });

    //the timeupdate event fires every 0.06 seconds while the video is playing
    pop.on("timeupdate", function () {
        //draw the contents of the video into the canvas.
        ctx.drawImage(vid, 0, 0);
    });

    //at 65 seconds, change the URLs in the source elements, change the title, and load the new media
    pop.cue(65, function () {
        document.querySelector('#mp4').src = hygine.mp4;
        document.querySelector('#ogg').src = hygine.ogg;
        h1.textContent = "HYGENE";
        h1.style.opacity = 1;
        vid.load();

    });

    //if the video pauses, also pause the audio element
    pop.on("pause", function () {
        aud.pause();
    });
    
    //if the video starts playing, also play the audio element
    pop.on("play", function () {
        aud.play();
    });

    //if the video seeks, change the currentTime of the audio element to that of the video element.
    pop.on("seeked", function () {
        aud.currentTime(pop.currentTime());
    });

});

//this function runs when volume is changed, it passes a number between 0 and 1 to the volume property of the audio element
function outputUpdate(vol) {
    aud.volume(vol);
    document.querySelector('#volume').value = vol;

}