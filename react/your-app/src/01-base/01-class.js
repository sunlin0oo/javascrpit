// class Test{
//     constructor(){
//         this.a = 1; 
//     }

//     testa(){
//         console.log("aaaaa")
//     }

//     testb(){
        
//     }
// }

// class ChildTest extends Test{
//     testb(){
//         console.log("bbbbbbbbb")
//     }
// }

// var obj = new Test();
// var childObj = new ChildTest();
// obj.testa();
// childObj.testa();
// console.log(obj.a);

// 标签语法
import React from "react";
export default class App extends React.Component{
    render(){ 
        //  必须要单标签,不可以有兄弟节点
        return <div>hello react Component</div>
    }
}
