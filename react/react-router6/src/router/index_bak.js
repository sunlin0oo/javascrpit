import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Redirect from '../components/Redirect';
// import Film from '../view/Film';
// import Cinema from '../view/Cinema';
// import Center from '../view/Center';
// import NotFound from '../view/NotFound';
// import Search from '../view/Search';
// import Nowplaying from '../view/films/Nowplaying';
// import ComingSoon from '../view/films/ComingSoon';
// // import Detail_Search from '../view/Detail_Search';
// import Detaildongtai from '../view/Detail_dongtai'
// import Login from '../view/Login';
export default function MRouter() {
  return (
    <div>
      {/* Route 必须包裹在Routes中 */}
      <Routes>
        {/* index是嵌套路由==>
        匹配父路径（http://localhost:3000/ #/），设置渲染的组件==>
        无法确定渲染子路由，通过index指定默认路由==>
        解决http://localhost:3000什么都没加的情况下没有显示的问题*/}
        {/*在最外层使用 可以说是要代替<Route path='/' element={<Film/>}></Route> 有相同的效果
        但是 index ≠  path='/'
         <Route index element={<Film></Film>}></Route> */}
        <Route path='/films' element={Lazyload('Film')}>
          <Route path='' element={<Redirect to='/films/nowplaying'></Redirect>}></Route>
          {/* <Route index element={<Film></Film>}></Route>
          当下面的子路由没有匹配的就会走这里  父路径则是http://localhost:3000/#/films */}
          {/* 相对路径==等价于==>/films/nowplaying */}
          <Route path='nowplaying' element={Lazyload('films/Nowplaying')}></Route>
          <Route path='comingsoon' element={Lazyload('films/Comingsoon')}></Route>
        </Route>
        <Route path='/cinemas' element={Lazyload('Cinema')}></Route>
        <Route path='/cinemas/search' element={Lazyload('Search')}></Route>
        {/* <Route path='/centers' element={isAuth()?<Center></Center>:<Redirect to='/login'></Redirect>}></Route> */}
        {/* routerv6 这里三目表达式只会执行一次==>解决方案是自己封装一个AuthComponent(包含<Center></Center>)==>增加复用性 */}
        {/* 路由拦截是在路由跳转之前先进行一次判断，是否有能力跳转==>用于受保护的组件 */}
        <Route path='/centers' element={
          <AuthComponent>
           { Lazyload('Center')}
          </AuthComponent>}>
        </Route>
        {/* 与router5进行区分: v5中 render={()=>isAuth()?<Center></Center>:<Redirect to='/login'></Redirect>} 
        这是一个回调函数，每次匹配路径 render就会执行，所以可以进行刷新 */}
        <Route path='/login' element={Lazyload('Login')}></Route>
        {/* 如果用 query 则可以暂时不用动态路由 */}
        {/* <Route path='/detail' element={<Detail_Search></Detail_Search>}></Route> */}
        {/* 动态路由 :myid是占位符*/}
        <Route path='/detail/:myid' element={Lazyload('Detail_dongtai')}></Route>
        {/* 方案1:Navigate组件代替Redirect(重定向组件)==> * 用万能匹配，匹配不到到films */}
        {/* <Route path='*' element={<Navigate to='/films'></Navigate>}></Route> */}
        {/* 方案2:自己写一个重定向组件==>将要传的值(路由)以属性的形式传过去 */}
        <Route path='/' element={<Redirect to='/films'></Redirect>}></Route>
        <Route path='*' element={Lazyload('Notfound')}></Route>
      </Routes>
    </div>
  )
}
// function isAuth(){
//     return localStorage.getItem('token');
// }

// 路由拦截组件的封装
function AuthComponent({ children }) {
  const isLogin = localStorage.getItem('token');
  return isLogin ? children : <Redirect to='/login'></Redirect>;
}
// 路由懒加载的封装==>解决第一次加载过慢的情况
const Lazyload = (path)=>{
  const Comp = React.lazy(()=>import(`../view/${path}`));
  return (
    <React.Suspense fallback={<>加载中...</>}>
      <Comp></Comp>
    </React.Suspense>
  )
}