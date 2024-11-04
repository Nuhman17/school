import React from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <>
    <div className='w-100 d-flex justify-content-center  align-items-center' style={{height:'100vh'}}>
        <div className='w-75 p-5 border shadow ' style={{height:'90vh'}}>
            <Row>
                <Col>
                <h2 className='mt-5' >Student Management</h2>

                <p className='mt-4'>Contact management is the process of recording and tracking all customer interactions within an organization. It includes technologies and strategies to collect and organize customer information.</p>
               <Link to={'/auth'} className='btn btn-info'>Let's Go</Link>
                </Col>
                <Col>
                <img src="https://img.freepik.com/free-photo/digital-art-young-students-attending-school-education_23-2151065226.jpg"
                className='w-100  img-fluid' alt="" />
                </Col>



            </Row>


        </div>

    </div>
    </>
  )
}

export default Landing
