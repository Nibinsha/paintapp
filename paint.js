document.body.background = "paint.jpg";
var canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext('2d');
    cPushArray = new Array();
    cstep = -1;
    ctx.lineWidth = 1;
    ctx.lineCap = "round";
    flag = 0;
   
function fill() {
     flag = 1;
}
function outline(){
     flag = 0;
}
function resizeCanvas() {                        canvas.width = 500;
         canvas.height = 500;
}
function incline() {
         ctx.lineWidth = ctx.lineWidth+1;
}
function decline() {
         ctx.lineWidth = ctx.lineWidth-1;
}
function color(obj) {
      ctx.strokeStyle = obj;
      ctx.fillStyle = obj;
}

function clear_screen(){
     var m = confirm("want to clear");
     if (m) {
        ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
     }
}
function save(){
     var save_img = canvas.toDataURL("image/png");
     window.location = save_img;
}

function eraser(){
     canvas.onmouseup = eraser_up;
     canvas.onmousedown = eraser_down;
     canvas.onmousemove = eraser_move; 
     function eraser_down(event){
          eraser_flag = true;
     }
     function eraser_move(event){
         if(eraser_flag){
             ptx = event.x;
             pty = event.y;
             ctx.clearRect(ptx,pty,15,15);
          }
     }
     function eraser_up(event){
          eraser_flag = false;
     }
}   


  
function rectangle() {
      canvas.onmousedown = rect_down;
      canvas.onmousemove = rect_move;
      canvas.onmouseup = rect_up;
      var start_x, start_y, pos;
      
      function rect_down(event) {
            pos = ctx.getImageData(0,0,myCanvas.width,myCanvas.height);
            start_x = event.x;
            start_y = event.y;
            rect_flag = true;
      }
      function rect_up(event){
       rect_flag = false;
      }
      function rect_move(event){
          if(rect_flag){
          ctx.putImageData(pos,0,0);
          endx = event.x;
          endy = event.y;
          width = endx - start_x;
          height = endy - start_y; 
          if(flag == 1)
             ctx.fillRect(start_x,start_y,width,height);
          else
             ctx.strokeRect(start_x,start_y,width,height); 
      }
   }    
            
}
function circle(){
    canvas.onmousedown = cir_down;
    canvas.onmousemove = cir_move;
    canvas.onmouseup = cir_up;
   
    function cir_down(event){
         pos = ctx.getImageData(0,0,myCanvas.width,myCanvas.height);
         start_x = event.x;
         start_y = event.y;
         cir_flag = true;
    }
    function cir_up(){
         cir_flag = false;
    }
    function cir_move(event){
       if (cir_flag){        
           ctx.putImageData(pos,0,0);
           end_x = event.x;
           end_y = event.y;
           ctx.beginPath();
           ctx.arc(Math.abs(start_x+end_x)/2,Math.abs(start_y+end_y)/2,Math.sqrt(Math.pow(end_x-start_x,2)+Math.pow(end_y-start_y,2))/2,0,Math.PI*2,true);
            ctx.closePath();
            ctx.stroke(); 
            if(flag == 1){
               ctx.fill();
            }  
         }
     }
}
    
function line(){
   canvas.onmousedown = line_down;
   canvas.onmousemove = line_move;
   canvas.onmouseup = line_up;
   var startx,starty;
   var pos;
   function line_down(event){
       pos = ctx.getImageData(0,0,myCanvas.width,myCanvas.height);
       startx = event.x;
       starty = event.y;
       line_flag = true;  
   }
   function line_up(event){
       line_flag = false;
   }
   function line_move(event){
       if(line_flag){
           ctx.putImageData(pos,0,0);   
           endx = event.x;
           endy = event.y;
           ctx.beginPath();
           ctx.moveTo(startx,starty); 
           ctx.lineTo(endx,endy); 
           ctx.stroke();
           ctx.closePath();
        }
   }
}
function pencil(){
    canvas.onmousedown = pencil_down;
    canvas.onmousemove = pencil_move;
    canvas.onmouseup = pencil_up;
     var startx,starty;
     function pencil_down(e){
         startx = e.x;
         starty = e.y;
         pencil_flag = true;
     }
     function pencil_move(event){
         if(pencil_flag){
             endx = event.x;
             endy = event.y;
             ctx.beginPath();
             ctx.moveTo(startx,starty);
             ctx.lineTo(endx,endy);
             ctx.stroke();
             ctx.closePath();
             startx = endx;
             starty = endy;
          }
      }
      function pencil_up(event){
          pencil_flag = false;
      }
} 
