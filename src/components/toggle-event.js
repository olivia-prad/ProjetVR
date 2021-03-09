AFRAME.registerComponent('toggle-event', {

   schema: {
      evtbase: {
         type: 'string',
         default: 'click'
      },
      evt1: {
         type: 'string'
      },
      evt2: {
         type: 'string'
      },
   },

   init: function () {
      this.addEvent();
      this.state=0;
   },
   addEvent: function () {
      let event = this.data.evtbase;
      this.handler = evt => this.onEvent(evt);
      this.el.addEventListener(event, this.handler);
   },


   onEvent: function () {
      
    if(this.state==0){
       this.el.emit(this.data.evt1);
       this.state=1;
    }
    else{
      this.el.emit(this.data.evt2);
      this.state=0;
    }
   },



})