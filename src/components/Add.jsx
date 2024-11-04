import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { addStudentApi } from '../servises/allApi';
import { addResponseContext } from '../contextApi/Context';


function Add() {
  const [show, setShow] = useState(false);
  const [student, setStudent] = useState({
    name: "", phone: "", batch: "", image: ""

  })
  const [preview,setPreview]=useState("")

  const{addResponse,setAddResponse}=useContext(addResponseContext)

  useEffect(()=>{
    if(student.image){
      setPreview(URL.createObjectURL(student.image))
    }
    else{
      setPreview("")
    }
  },
  [student.image])
  

  const handleAddstudent = async () => {
    console.log(student)
    const {name,batch,phone,image}=student
    if(!name || !batch || !phone || !image){
      toast.warning("Enter Valid Data")
    }
    else{
      const fd=new FormData()
      fd.append("name",name)
      fd.append("batch",batch)
      fd.append("phone",phone)
      fd.append("image",image)

      const header={
        "Content-Type":"multipart/form-data",
        "Authorization":`Token ${sessionStorage.getItem('token')}`
      }
      const res=await addStudentApi(fd,header)
      console.log(res)
      if(res.status==200){
        toast.success("Student Added!!")
        handleClose()
        setAddResponse(res)
      }
      else{
        toast.error("Adding Failed")
      }
   }
  }

  const handleClose = () => {
    setStudent({    name: "", phone: "", batch: "", image: ""
  })
  setShow(false);

  }
  const handleShow = () => setShow(true);

  return (
    <>
      <div className='d-flex  p-4'>
        <Row>
          <Col sm={4} md={12}>
            <button className='btn btn-warning ' onClick={handleShow}>
              < i className="fa-solid fa-user-plus" style={{ color: "#4f7cc9", }} />
              Add Students
            </button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Add Students Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col sm={6}>
                    <label >
                      <input type="file" style={{ display: 'none' }} onChange={(e) => setStudent({ ...student, image: e.target.files[0] })} />
                      <img src={preview?preview:"https://t3.ftcdn.net/jpg/03/62/56/24/360_F_362562495_Gau0POzcwR8JCfQuikVUTqzMFTo78vkF.jpg"}
                        alt="" className='img-fluid' />
                    </label>
                  </Col>
                  <Col sm={6} className='d-flex flex-column justify-content-center'>
                    <input type="text" onChange={(e) => setStudent({ ...student, name: e.target.value })} placeholder='Enter Name' name='name' className="form-control mb-3" />
                    <input type="text" onChange={(e) => setStudent({ ...student, batch: e.target.value })} placeholder='Enter Class' name='class' className="form-control mb-3" />
                    <input type="number" onChange={(e) => setStudent({ ...student, phone: e.target.value })} placeholder='Enter Phone number' name='phone' className="form-control mb-3" />


                  </Col>
                </Row>

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddstudent}>Add</Button>
              </Modal.Footer>
            </Modal>
          </Col>
          <Col sm={8} md={12}></Col>
        </Row>

      </div>


    </>
  )
}

export default Add
