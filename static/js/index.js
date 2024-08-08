window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})

document.addEventListener('DOMContentLoaded', function() {
  const videoSections = document.querySelectorAll('video-section');

  videoSections.forEach((section, index) => {
      const videos = Array.from(section.querySelectorAll('video'));

      // Function to check all videos are ready to play
      function allVideosReady(videos) {
          return Promise.all(videos.map(video => {
              return new Promise(resolve => {
                  video.addEventListener('canplaythrough', resolve);
              });
          }));
      }

      // Start playing all videos simultaneously
      function playAllVideos(videos) {
          videos.forEach(video => video.play());
      }

      // Synchronize all videos to restart after they end and a 1-second pause
      function setupEndEvent(videos) {
          videos.forEach(video => {
              video.addEventListener('ended', () => {
                  if (videos.every(v => v.ended)) {
                      setTimeout(() => {
                          videos.forEach(v => {
                              v.currentTime = 0;
                              v.play();
                          });
                      }, 1000); // Pause for 1 second before restarting
                  }
              });
          });
      }

      // Initialize
      allVideosReady(videos).then(() => {
          playAllVideos(videos);
          setupEndEvent(videos);
      });
  });
});