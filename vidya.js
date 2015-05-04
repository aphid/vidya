var pop, aud;
var hygine = {
    mp4: "https://archive.org/download/Personal1950/Personal1950_512kb.mp4",
    ogg: "https://archive.org/download/Personal1950/Personal1950.ogv"
}
var canvas, ctx, vid;

document.addEventListener("DOMContentLoaded", function (event) {
    canvas = document.querySelector('#thecanvas');
    ctx = canvas.getContext("2d");
    vid = document.querySelector('#tehvidya'); //this is a dom object;
    aud = Popcorn('#burroughs');
    pop = Popcorn('#tehvidya', {
        frameAnimation: true
    }); //http://popcornjs.org/popcorn-docs/popcorn-constructor/

    var h1 = document.querySelector("h1");


    pop.on("loadedmetadata", function () {
        pop.mute();
        aud.play();
        canvas.width = vid.videoWidth;
        canvas.height = vid.videoHeight;
        //video has loaded, we now have duration and other metadata
        console.log(pop.duration());
        h1.style.opacity = 0;
    });

    h1.addEventListener("transitionend", function () {
        pop.play();

    });

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


    pop.image({
        // seconds
        start: 3,
        // seconds
        end: 5,
        src: "http://media.giphy.com/media/issHYYSN6OW3K/giphy.gif",
        target: "imagediv"
    });

    pop.cue(5, function () {
        pop.play(48);

    });

    pop.on("timeupdate", function () {
        ctx.drawImage(vid, 0, 0);
    });

    pop.cue(65, function () {
        document.querySelector('#mp4').src = hygine.mp4;
        document.querySelector('#ogg').src = hygine.ogg;
        h1.textContent = "HYGENE";
        h1.style.opacity = 1;
        vid.load();

    });


    pop.on("pause", function () {
        aud.pause();
    });

    pop.on("play", function () {
        aud.play();
    });

    pop.on("seeked", function () {
        aud.currentTime(pop.currentTime());
    });

});




function outputUpdate(vol) {
    aud.volume(vol);
    document.querySelector('#volume').value = vol;

}