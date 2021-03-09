AFRAME.registerComponent('timer', {
   multiple: true,
    schema: {
       evtbase: {
          type: 'string', 
          default: 'click'

       },
       timer: {
          type: 'int', 
          default: 2000
       },
       evtfinal: {
        type: 'string'
     },
    },

    init: function () {
        console.log("init-timer");
        this.startEvent();
        this.state=0;
     },
     startEvent: function () {
        console.log("init-timer2");
        let event = this.data.evtbase;
        this.timeOut = evt => this.startTimer(evt);
        this.el.addEventListener(event, this.timeOut);   
    },
    startTimer: function () {
        
        setTimeout(() => {
            this.el.emit(this.data.evtfinal);
          }, this.data.timer);
     },
 
 })