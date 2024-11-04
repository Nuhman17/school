import React, { useEffect, useState, useContext } from 'react'
// import Header from '../components/Header'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import Add from '../components/Add'
import Edit from '../components/Edit'
import { getStudentApi, deleteStudentApi } from '../servises/allApi'
import { addResponseContext, editResponseContext } from '../contextApi/Context'
import { toast } from 'react-toastify'




function Dashboard() {
    const [students, setStudents] = useState([])
    const [searchKey, setSearchKey] = useState("")
    console.log(searchKey)
    const nav = useNavigate()

    const { addResponse, setAddResponse } = useContext(addResponseContext)
    const { editResponse } = useContext(editResponseContext)

    useEffect(() => {
        getData()

    }, [addResponse, editResponse, searchKey])


    const getData = async () => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }
        const res = await getStudentApi(header, searchKey)
        console.log(res)
        if (res.status == 200) {
            setStudents(res.data)

        } else {
            console.log(res)
        }

    }
    const deleteStudent = async (id) => {
        const header = {
            "Content-Type": "application/json",
            "Authorization": `Token ${sessionStorage.getItem('token')}`
        }

        const res = await deleteStudentApi(id, header)
        if (res.status == 200) {
            toast.success("Student Details Removed!!")
            getData()
        } else {
            toast.error("Something Went Wrong")
        }
    }
    const logout=()=>{
        sessionStorage.clear()
        nav('/auth')
    toast.success("User Logouted")

    }



    return (
        <>
            {/* <Header /> */}
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home" style={{ fontSize: '25px' }}>
                        <i className="fa-solid fa-school-circle-check fa-xl me-2" style={{ color: "#25028d", }} />
                        {' '}

                        Student Management
                    </Navbar.Brand>
                    <button className="btn btn-danger" onClick={logout} >Logout</button>
                </Container>
            </Navbar>

            <div className='container p-3'>
                <div className='d-flex justify-content-between'>


                    <Add />
                    <div>
                        <input type="text" placeholder='Enter Name to Search' onChange={(e) => setSearchKey(e.target.value)} className="form control p-1  border border-light" />
                    </div>
                </div>
                <div>
                    {
                        students?.length > 0 ?
                            <table className='table table-bordered mt-4'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Phone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        students.map((item, index) => (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.batch}</td>
                                                <td>{item.phone}</td>

                                                <td>
                                                    <Edit data={item} />
                                                    <button className='btn me-3' onClick={() => { deleteStudent(item._id) }}>
                                                        <i className="fa-solid fa-trash" style={{ color: "#e02929", }} />
                                                    </button>

                                                </td>
                                            </tr>

                                        )

                                        )
                                    }

                                </tbody>
                            </table>
                            :
                            <h3 className='text-danger text-center'>No Students Added!!</h3>
                    }

                </div>
            </div>

        </>
    )
}

export default Dashboard


