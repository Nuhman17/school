import React from 'react'
import { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Row, Col } from 'react-bootstrap';
import base_url from '../servises/base_url';
import { toast } from 'react-toastify';
import { updateStudentApi } from '../servises/allApi';
import { editResponseContext } from '../contextApi/Context';

function Edit({ data }) {
  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState({ ...data })
  const [preview, setPreview] = useState("")

  const { setEditResponse } = useContext(editResponseContext)

  useEffect(() => {
    if (detail.image.type) { setPreview(URL.createObjectURL(detail.image)) }
    else {
      setPreview("")
    }

  }, [detail.image])

  const handleEdit = async () => {
    console.log(detail)
    const { name, batch, phone, image } = detail
    if (!name || !batch || !phone || !image) {
      toast.warning("Invalid Inputs!!")
    } 
    else {
      if (image.type) {
        const fd = new FormData()
        fd.append('name', name)
        fd.append('batch', batch)
        fd.append('phone', phone)
        fd.append('image', image)

        const header = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Token ${sessionStorage.getItem('token')}`
        }
        const res = await updateStudentApi(data._id,fd, header)
        if (res.status == 200) {
          toast.success("Student Details Updated!!")
          setEditResponse(res)
          handleClose()
          setDetail({ ...res.data })
          setPreview("")

        }
        else {
          toast.error("Updation Failed!!")
          console.log(res)
        }
      }
      else {
        const header = {
          "Content-Type": 'application/json',
          "Authorization": `Token ${sessionStorage.getItem('token')}`
        }
        const res = await updateStudentApi(data._id,detail,header)
        if (res.status == 200) {
          toast.success("Student Details Updated!!")
          setEditResponse(res)
          handleClose()
          setDetail({ ...res.data })
          setPreview("")


        }
        else {
          toast.error("Updation Failed!!")
          console.log(res)
        }
      }
    }
  }

  const handleClose = () => {
    setShow(false)

  };
  const handleShow = () => setShow(true);
  return (
    <>

      <button className='btn' onClick={handleShow}>
        <i className="fa-solid fa-user-pen" style={{ color: "#bde665", }} /></button>

      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Students Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <label >
                <input type="file" style={{ display: 'none' }} onChange={(e) => setDetail({ ...detail, image: e.target.files[0] })} />
                <img src={preview ? preview : `${base_url}/uploads/${data.image}`}
                  alt="" className='img-fluid' />
              </label>
            </Col>
            <Col sm={6} className='d-flex flex-column justify-content-center'>
              <input type="text" defaultValue={data?.name} placeholder='Enter Name' onChange={(e) => setDetail({ ...detail, name: e.target.value })} name='name' className="form-control mb-3" />
              <input type="text" defaultValue={data?.batch} placeholder='Enter Class' onChange={(e) => setDetail({ ...detail, batch: e.target.value })} name='class' className="form-control mb-3" />
              <input type="number" defaultValue={data?.phone} placeholder='Enter Phone number' onChange={(e) => setDetail({ ...detail, phone: e.target.value })} name='phone' className="form-control mb-3" />


            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit
