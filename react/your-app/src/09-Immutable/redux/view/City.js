import React, { useState } from 'react'
import store from '../redux/store'

export default function City(props) {
    const [list,setlist] = useState(['北京','上海','深圳','广州']);
  return (
    <div>
        city

        <ul>
            {
                list.map(item=>
                <li key={item} onClick={()=>{
                    store.dispatch({
                        type:"change-city",
                        payload:item,
                    })
                    // props.history.push(`/cinemas`)
                    // 回到上一个页面 也就是/cinemas 
                    props.history.goBack();
                }}>{item}</li>)
            }
        </ul>
    </div>
  )
}
