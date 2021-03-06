AFRAME.registerComponent('portal', {

    schema: {
      evtbase: {
          type: 'string', 

       },
       page: {
          type: 'string'
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
        window.location.replace("http://127.0.0.1:8080/"+this.data.page);
    },
 
 })