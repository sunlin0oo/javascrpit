var canvas:HTMLCanvasElement=document.querySelector("canvas") as HTMLCanvasElement;
var ctx:CanvasRenderingContext2D=canvas.getContext("2d") as CanvasRenderingContext2D;

// ctx.save();//入栈
// ctx.restore();//出栈
// 入栈和出栈必须保持成对出现，不能出现交叉，或者连续出栈和入栈,而且入栈的内容仅能获取一次
// 目的是保持各种绘制前的设置

// ctx.save();
// ctx.shadowOffsetX=4;
// ctx.shadowOffsetY=4;
// ctx.shadowColor="#000";
// ctx.shadowBlur=4;
// ctx.fillStyle="red";
// ctx.fillRect(50,50,100,100);
// ctx.restore();
// ctx.fillRect(200,50,100,100);


// ctx.save();
// ctx.translate(100,0);
// ctx.fillStyle="red";
// ctx.fillRect(0,0,100,100);
// ctx.translate(100,0);
// ctx.restore();
// ctx.fillStyle="blue";
// ctx.fillRect(0,0,100,100);




// 旋转
// ctx.translate(100,100);
// ctx.rotate(30);
// ctx.fillStyle="#FFF";
// ctx.fillRect(-50,-50,100,100);



// 缩放
// var  img:HTMLImageElement=document.createElement("img") as HTMLImageElement;
// img.src="../img/b.jpg";
// img.addEventListener("load",loadHandler);

// function loadHandler(e:Event){
//     ctx.translate(1200,0);
//     ctx.scale(-1,1);
//     ctx.drawImage(img,0,0,1200,600);
// }




// 形变
// var  img:HTMLImageElement=document.createElement("img") as HTMLImageElement;
// img.src="../img/b.jpg";
// img.addEventListener("load",loadHandler);

// function loadHandler(e:Event){
//     // ctx.transform(水平缩放,水平倾斜,垂直倾斜,垂直缩放,水平平移,垂直平移)
//     // ctx.transform(-1,0,0,1,300,1);
//     ctx.transform(1,Math.PI/180*60,0,1,0,1);
//     ctx.drawImage(img,0,0,300,150);
// }


// var x=50;
// var y=50;
// var speedX=2;
// var speedY=2;
// var angle=1;
// var scale=1;
// enum SCALE{SMALL="small",BIG="big"};
// var state=SCALE.SMALL;
// var fill:CanvasGradient=ctx.createRadialGradient(25,-25,0,25,-25,50);
// fill.addColorStop(0,"#FFF");
// fill.addColorStop(1,"red");
// ctx.fillStyle=fill;
// setInterval(move,16);
// function move():void
// {   
  
//     if(x+50>=canvas.width || x<50) speedX=-speedX;
//     if(y+50>=canvas.height || y<50) speedY=-speedY;
//     x+=speedX;
//     y+=speedY;
//     angle+=0.02;
//     if(angle>360) angle-=360;
//     if(state===SCALE.SMALL){
//         scale-=0.01;
//         if(scale<=0){
//             state=SCALE.BIG;
//         }
//     }else if(state===SCALE.BIG){
//         scale+=0.01;
//         if(scale>=1){
//             state=SCALE.SMALL;
//         }
//     }
//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     ctx.save();
//     ctx.translate(x,y);
//     ctx.scale(scale,scale); 
//     ctx.rotate(angle);
//     ctx.beginPath();
//     ctx.arc(0,0,50,0,Math.PI/180*360);
//     ctx.fill();
//     ctx.restore();
// }



// var  img:HTMLImageElement=document.createElement("img") as HTMLImageElement;
// img.src="../img/b.jpg";
// img.addEventListener("load",loadHandler);

// function loadHandler(e:Event){
//     ctx.fillRect(0,0,1200,600)
    
//     ctx.arc(50,50,50,0,Math.PI/180*360);
//     ctx.clip();
//     ctx.drawImage(img,0,0,1200,600);
// }




// var x=50;
// var y=50;
// var speedX=2;
// var speedY=2;
// var  img:HTMLImageElement=document.createElement("img") as HTMLImageElement;
// img.src="../img/b.jpg";
// img.addEventListener("load",loadHandler);
// ctx.fillStyle="red";
// function loadHandler(e:Event){
//     ctx.fillRect(0,0,1200,600)
//     setInterval(move,16);
// }

// function move(){
//     if(x+50>=canvas.width || x<50) speedX=-speedX;
//     if(y+60>=canvas.height || y<50) speedY=-speedY;
//     x+=speedX;
//     y+=speedY;

//     ctx.clearRect(0,0,canvas.width,canvas.height);
//     ctx.save();
//     ctx.beginPath();
//     ctx.arc(x,y,50,0,Math.PI/180*360);
//     ctx.clip();
//     ctx.drawImage(img,0,0,1200,600);
//     ctx.restore();
// }

var imgList:Array<HTMLImageElement>;
var arr:Set<{x:number,y:number}>=new Set();
const width=300,height=200;
init();

function loadImage(src:string):Promise<HTMLImageElement>{
    return new Promise(function(resolve:Function,reject:Function):void
    {
        var img:HTMLImageElement=new Image();
        img.src=src;
        img.onload=function(e:Event){
            resolve(img);
        }
        img.onerror=function(err:string|Event){
            reject(err);
        }
    })
}

async function init():Promise<void>{
   imgList=await Promise.all([loadImage("../img/a.jpg"),loadImage("../img/b.jpg")]);
   ctx.drawImage(imgList[0],0,0,1200,600);
   for(var i=0;i<4;i++){
       for(var j=0;j<3;j++){
        arr.add({x:1200/4*i,y:600/3*j});
       }
   }
  
   canvas.addEventListener("mousedown",mouseHandler);
}

function mouseHandler(e:MouseEvent):void
{
    if(e.type==="mousedown"){
        canvas.addEventListener("mousemove",mouseHandler);
        canvas.addEventListener("mouseleave",mouseHandler);
        canvas.addEventListener("mouseup",mouseHandler);
    }else if(e.type==="mousemove"){
        for(var item of arr){
            if(e.offsetX>=item.x && e.offsetX<=item.x+width && e.offsetY>=item.y && e.offsetY<=item.y+height){
                arr.delete(item);
            }
        }
        
        if(arr.size>0){
            ctx.save();
            ctx.beginPath();
            ctx.arc(e.offsetX,e.offsetY,20,0,Math.PI/180*360);
            ctx.clip();
            ctx.drawImage(imgList[1],0,0,1200,600);
            ctx.restore();
        }else{
            ctx.save()
            ctx.clearRect(0,0,1200,600);
            ctx.drawImage(imgList[1],0,0,1200,600);
            ctx.restore();
        }
    }else{
        canvas.removeEventListener("mousemove",mouseHandler);
        canvas.removeEventListener("mouseleave",mouseHandler);
        canvas.removeEventListener("mouseup",mouseHandler);
    }
}