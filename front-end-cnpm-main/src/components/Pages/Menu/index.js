import Card from "../../Contents/Cards/card";
import SelectCard from "../../Contents/ExampleCard/SelectCard";
import Footer from "../../Footer";
import Header from "../../Header";
// import foodList from '../../../data/data'
import {useState,useEffect} from 'react';
import getDish from "../../../api/dishApi";


let cate ='all';
let foodList=[];
export default function Menu({foodList,cateList}) {


    const [state, setState] = useState(cate);

    // useEffect(()=>{
   
    //   // call api
    //   (async () => {
    //     // const res = await updateCart(food,localStorage.getItem('user')); 
    //     const res = await getDish();
    //     foodList=res;
    //   })()
    // },[])


    return (
      <>
        <Header></Header>
        <SelectCard cateList={cateList} state={state} setState={setState}/>
        <Card foodList={foodList} state={state} setState={setState}/>
        <Footer/>
      </>
    )
}
  
