AFRAME.registerPrimitive('a-musicplayer',  {
    defaultComponents: {
      'musicplayer': {}
    },

    // Defined mappings from HTML attributes to component properties (using dots as delimiters).
    mappings: {
      music: 'musicplayer.music',
    }
  });
  


AFRAME.registerComponent('musicplayer', {

    schema: {
        music: {type: 'src', default: 8}
    },

    init:function() {
       let playing = false;
       let audio = this.music;
       this.el.addEventListener('click', () => {
            if(!playing) {
                audio.playSound();
             } else {
                audio.pauseSound();
                audio.currentTime = 0;
             }
             playing = !playing;
       });
    }
  })