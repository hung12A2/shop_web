import axios from '../setup/CustomAxios';

const getDish = async() => {
    try {
      // make axios post request
      const res = await axios.get ('/dishes')
       return (res);
    } catch(error) {
        return error.response.data;
    }
    
   
  }

 export const getCate = async() => {
    try {
      // make axios post request
      const res = await axios.get ('/categories')
      return (res) ;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

  export const deleteDish = async(id,token) => {

    if(id===undefined) return;

    const url = "http://localhost:5000/api/dish/"+ id;
    try {
      // make axios post request
      const res = await axios({
        method: "delete",
        url: url,
        headers: {authorization:token}
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

  export const updateDish= async(formValue,token,id) => {

    if( formValue===undefined || formValue == [] || id === undefined){
        return;
    }

    const url ="http://localhost:5000/api/dish/" + id;
    try {
      // make axios post request
      const res = await axios({
        method: "patch",
        url:url,
        data: formValue,
        headers: { authorization:token},
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }

  export const createDish= async(formValue,token) => {

    if( formValue===undefined || formValue == [] ){
        return;
    }

    const url ="http://localhost:5000/api/dish/create" ;
    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url:url,
        data: formValue,
        headers: { authorization:token},
      });
      return res.data;
    } catch(error) {
        return error.response.data;
    }
  }

export default getDish;