import axios from '../setup/CustomAxios';


const getCart = async() => {

    try {
      // make axios post request
      const res = await axios.get ('/carts/dishincarts')
      return res;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

  export const updateCart= async(formValue,token) => {

    if( formValue===undefined || formValue == []){
        return;
    }

    try {
      // make axios post request
      const res = await axios({
        method: "patch",
        url: "http://localhost:5000/api/cart/update",
        data: formValue,
        headers: { authorization:token},
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

  export default getCart;