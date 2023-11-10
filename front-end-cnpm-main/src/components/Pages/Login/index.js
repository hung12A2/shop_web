import { useNavigate } from 'react-router-dom'
import {useEffect, useState} from 'react'
import { ReactNotifications } from 'react-notifications-component'
import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import {login, userInfo} from '../../../api/userApi'

export default function Login() {
    var result;
    var path= '';
    var notify ='warning';
    var titleNotify='Warning';
    var messageNotify='Please enter full input'
    
    
    const navigate=useNavigate()
    const [state,setState] = useState(true)
    const [formValue, setformValue] = useState({
        username:'',
        password:'', 
    });

    useEffect(()=>{
        (async () => {

           // console.log (formValue)
            const res = await login(formValue); 
            result =res;
        //    console.log(result.token);
            // const test = await userInfo(localStorage.getItem('user'))
            // console.log(localStorage.getItem('user'))
            if(result === undefined) {
                notify ='warning'
                titleNotify="Warning"
                messageNotify='Cần nhập đủ thông tin'
                handleNotify();
            }
        
            if(result !==undefined) {
                if(result.error !== undefined) {
                    notify ='danger'
                    titleNotify="Login failure"
                    messageNotify="Kiểm tra lại tài khoản và mật khẩu";     
                    handleNotify(); 
                }
                else if(result.token !== undefined) {
                    localStorage.setItem("user",result.token);
                    path ='/'
                    notify ='success'
                    titleNotify="Login successful"
                    messageNotify="Đăng nhập thành công";    
                    handleNotify();        
                    const userinfo1 = await userInfo();
                    if (userinfo1.role === "admin") {
                        setTimeout (() => navigate("/admin"), 1001)
                    }
                    else {
                        setTimeout (() => navigate("/"), 1001)
                    }
                }    
            }

          })()
    },[state]);

    const handleChange = (event) => {
        setformValue({
        ...formValue,
        [event.target.name]: event.target.value
        });
    }

       //notify
       const handleNotify=()=>{
        Store.addNotification({
            title: titleNotify,
            message: messageNotify,
            type: notify,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 1000,
              onScreen: true
            }
          });
      } 
    return (
      <>
      <ReactNotifications/>
        <div className="bg-grey-lighter min-h-screen flex flex-col bg-[url('https://asianfoodnetwork.com/content/dam/afn/global/en/homepage/new-content-carousel/AFN_Food_Made_Good_HK_Awards_good_to_go_award_mobile.jpg.transform/desktop-img/img.jpg')]">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center font-semibold">Sign In</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="username"
                        placeholder="username"
                        onChange={handleChange} required/>

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange} required />
            
                    <button
                        onClick={()=>{setState(!state); }}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Sign In</button>

                    <div className="text-center text-sm text-grey-dark mt-4">

                        <a className="no-underline border-b border-grey-dark text-md text-grey-dark text-green-700 font-semibold" href="#"  onClick={()=>{navigate('/')}}>
                            Back To Home
                        </a>

                    </div>

                    <div className="text-center text-sm text-grey-dark mt-4">
  
                        <a className="no-underline border-b border-grey-dark text-md text-grey-dark text-blue-700 font-semibold" href="#"  onClick={()=>{navigate('/ForgetPass')}}>
                            Or Reset Password Here
                        </a>
                    </div>
                </div>

                <div className="text-white mt-6 font-semibold">
                    Don't have an account? 
                    <a className="no-underline border-b border-blue text-blue-500 font-semibold" href="#" onClick={()=>{navigate('/Signup')}}>
                        Create Account
                    </a>.
                </div>

            </div>
        </div>
  
      </>
    )
}
  
