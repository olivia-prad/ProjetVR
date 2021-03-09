AFRAME.registerComponent('double-condition', {
   multiple: true,
    schema: {
       cond1: {
          type: 'string'

       },
       cond2: {
          type: 'string', 
          default: 'click'
       },
       result: {
        type: 'string'
     },
    },
 
    init: function () {
       console.log("doublecondition-init");
       this.cond1= false;
       this.cond2=false;
       this.el.addEventListener(this.data.cond1, ()=>{this.onEvent('cond1')});
       this.el.addEventListener(this.data.cond2, ()=>{this.onEvent('cond2')});
       
    },
    onEvent: function (cond) {

     if(cond == 'cond1'){
         console.log("cond 1 ok");
        this.cond1= true;
     }
     if(cond == 'cond2'){
      console.log("cond 2 ok");
        this.cond2= true;
     }
     if(this.cond1 && this.cond2){
        this.el.emit(this.data.result);
     }
    },

 
 })