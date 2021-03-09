AFRAME.registerComponent('level-completed', {

    schema: {
       finished: {
          type: 'boolean', 
          default: 'false'

       },
       pageHTML: {
          type: 'string'
       },
       evtbase: {
        type: 'string', 
        default: 'click'

     },
    },
 
    init: function () {
        this.addEvent();
     },
    addEvent: function () {
        let event = this.data.evtbase;
        this.handler = evt => this.onEvent(evt);
        this.el.addEventListener(event, this.handler);
     },

     onEvent: function () {
      if(this.data.finished){
         window.location.replace("http://127.0.0.1:8080/"+this.data.pageHTML);
      }
      else{
         console.log("not completed");
      }
     },
   
 })
