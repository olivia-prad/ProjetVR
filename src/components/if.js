AFRAME.registerComponent('if', {

    schema: {
       cond1: {
          type: 'string', 
          default:"grabbed",
       },

       cond2: {
        type: 'string',
        default:"click",

       },
       result: {
        type: 'string'
     },
    },
 
    init: function () {
       console.log("init");
       this.addEvent();
       this.okCond1=0;
       this.okCond2=0;
    },
    addEvent: function () {
       let event = this.data.cond1;
       this.handler = evt => this.onEvent1(evt);
       this.el.sceneEl.addEventListener(event, this.handler);
    },
 
    onEvent1: function () {
        this.okCond1=1;
        console.log("cond1ok");
    },

     
    onEvent2: function () {
        this.okCond2=1;
        console.log("cond2ok");

    },


    tick: function () {
        console.log("cond2ok")
        let event2 = this.data.cond2;
        this.handler2 = evt => this.onEvent2(evt);
        this.el.addEventListener(event2, this.handler2);

        if(okCond1==1 & okCond2==1){
            this.el.emit(result);
        }

    }
 })