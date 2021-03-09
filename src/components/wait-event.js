AFRAME.registerComponent('wait-event', {

    schema: {
       evtbase: {
          type: 'string', 
          default: 'click'

       },
       evtfinal: {
          type: 'string'
       },
       nbevent: {
        type: 'int'
     },
    },
 
    init: function () {
       console.log("init");
       this.addEvent();
       this.state=1;
    },
    addEvent: function () {
 
       let event = this.data.evtbase;
       this.handler = evt => this.onEvent(evt);
       this.el.addEventListener(event, this.handler);
    },
 
    onEvent: function () {
       console.log(this.state);
     if(this.state!=this.data.nbevent){
        this.state++;
     }
     else{
        //console.log(this.data.evtfinal);
       this.el.emit(this.data.evtfinal);
       this.state=100000;
     }
    },
 
 })