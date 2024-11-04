import { useState } from 'react'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { registerApi, loginApi } from '../servises/allApi'
import { useNavigate } from 'react-router-dom'

function Auth() {
    const nav = useNavigate()

    const [user, setUser] = useState({
        email: "", username: "", password: ""
    })

    const [state, setState] = useState(false)
    const changeAuth = () => {
        setState(!state)
    }

    const handleRegister = async () => {
        console.log(user)
        const { email, username, password } = user
        if (!email || !username || !password) {
            toast.warning("Enter Valid Inputs!!")
        }
        else {
            const res = await registerApi(user)
            console.log(res)
            if (res.status == 200) {
                toast.success("Registration Success!!")
                changeAuth()
                setUser({
                    email: "", username: "", password: ""


                })
            }
            else {
                toast.error("Registration Failed!!")   }

        }
    }

   const handleLogin = async () => {
        const { email, password } = user
        if (!email || !password) {
            toast.warning("Enter Valid Data!!")


        } else {
            const res = await loginApi({ email, password })
            if (res.status == 200) {
                console.log(res)
                sessionStorage.setItem("token",res.data.token)
                sessionStorage.setItem("uname",res.data.username)

                toast.success("Login Successfull!!")
                setUser({ email: "", username: "", password: "" })
                nav('/dash')
            }
            else{
                toast.error("Login failed")
                console.log(res)
            }
        }
    }



    return (
        <>
            <div className='w-100 d-flex justify-content-center align-items-center ' style={{ height: '100vh' }} >
                <div className='w-75 border shadow  p-2 '>
                    <Row>
                        <Col>
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-illustration-download-in-svg-png-gif-file-formats--app-developing-development-secure-mobile-webapp-and-pack-design-illustrations-3783954.png?f=webp"

                                className='img-fluid w-75' alt="" />
                        </Col>
                        <Col className='d-flex flex-column juctify-content-center'>
                            {
                                state ?
                                    <h3 className='p-2' >Registration</h3>
                                    :
                                    <h3 className='p-2'>Login</h3>

                            }
                            <input type="email" className='form-control mt-3 mb-4' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Enter Email' />
                            {
                                state &&
                                <input type="text" className='form-control mb-4' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} placeholder='Enter Username' />


                            }
                            <input type="password" className='form-control mb-4' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Enter Password' />
                            <div className='d-flex justify-content-between'>
                                {
                                    state ?
                                        <button className='btn btn-success' onClick={handleRegister}  >Registration</button>
                                        :
                                        <button className='btn btn-success' onClick={handleLogin}>Login</button>



                                }
                                {
                                    state ?
                                        <button className='btn btn-link' onClick={changeAuth} >Already a user?</button>
                                        :
                                        <button className='btn btn-link' onClick={changeAuth} >New user?</button>


                                }

                            </div>



                        </Col>
                    </Row>

                </div>

            </div>
        </>
    )
}

export default Auth
