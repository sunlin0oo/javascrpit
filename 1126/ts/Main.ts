
// import ClassA from "./cls/ClassA";
// import ClassB from "./cls/ClassB";
// import { A } from "./O";

import EmitterEvent from "./event/EmitterEvent";
import EmitterTarget from "./event/EmitterTarget";
import { E } from "./O";

// console.log(ClassA.D);
// ClassA.b=3;


// public    共有的  
    // 该类的实例化对象可以调用public定义的属性和方法（包括静态、只读）
//  子类的方法中可以通过实例this调用获取protected定义的属性和方法（包括静态、只读）
// 子类中可以重写和覆盖public定义的方法（静态）


// private   私有的
    // 该类的实例化对象不能调用private定义的属性和方法（包括静态、只读）
    //  子类的方法中不可以获取pprivate定义的属性和方法（包括静态、只读）
// 子类中不可以重写和覆盖private定义的方法（静态）
// 只能在当前类的方法中调用使用private定义的属性和方法


// protected 受保护的
 // 该类的实例化对象不能调用pprotected定义的属性和方法（包括静态、只读）
//  子类的方法中可以通过实例this调用获取protected定义的属性和方法（包括静态、只读）
// 子类中可以重写和覆盖protected定义的方法（静态）




// var a=new ClassB();
// console.log(a.a);
// a.play();


// A   
// 暴露   play()   a:number=1;
// 只能在自身调用的  getTime();

// B==>继承==>A
// 暴露   play()  run()  a:number=1;  b:number=2;
// 修改 A中play()   d();

// class A{
//     public a:number=1;
//     public play():void
//     {

//     }
//     private getTime():void{

//     }
//     protected d():void{

//     }
// }
// class B extends A{
//    private constructor()
//     {
//         super();
//     }
//     public b:number=2;
//     public run():void
//     {

//     }
//     public play():void{

//     }
//     protected d():void{

//     }
// }

// 重写鼠标事件==>目标
// 实例化EmitterTarget
var o:EmitterTarget=new EmitterTarget();
// 以"abc"为key==>保存abcHandler
o.addEventListener("abc",abcHandler);
o.addEventListener("abc",abcHandler1);

//  实例化EmitterEvent事件
var evt:EmitterEvent=new EmitterEvent("abc");
// 抛发
o.dispatchEvent(evt);

// 参数一定要写出来,也包括this
function abcHandler(this:EmitterTarget,e:EmitterEvent){
   console.log(e)
}
function abcHandler1(this:EmitterTarget,e:EmitterEvent){
    console.log(e)
 }


// document.addEventListener("click",clickhandler);
// function clickhandler(this:EventTarget,e:MouseEvent){
//     console.log(this);
// }
