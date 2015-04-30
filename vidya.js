document.addEventListener("DOMContentLoaded", function (event) {

    var vid = document.querySelector('#tehvidya'); //this is a dom object;
    var pop = Popcorn('#tehvidya'); //http://popcornjs.org/popcorn-docs/popcorn-constructor/
    var h1 = document.querySelector("h1");


    pop.on("loadedmetadata", function () {
        //video has loaded, we now have duration and other metadata
        console.log(pop.duration());
        h1.style.opacity = 0;
    });

    h1.addEventListener("transitionend", function () {
        pop.play();

    });

    
    pop.image({
        // seconds
        start: 3,
        // seconds
        end: 5,
       href: "http://chiquita.com/",
       src: "http://images.halloweencostumes.com/products/11904/1-1/adult-chiquita-banana-costume.jpg",
      target: "imagediv"
     });
 
    pop.cue(5, function(){
       pop.pause(300); 
        
    });
     
    
});