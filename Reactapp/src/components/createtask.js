import React from "react"
import Container  from "react-bootstrap/Container"
import { BootsrapNav } from "./Navbar"
import { useAuth } from "./Auth"
import { useNavigate } from "react-router-dom"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap"
import Row from 'react-bootstrap/Row';


export const Create = () => {
    const [form, formchange] = React.useState({name : '', description: "", is_complete: ""})
    const [nameempty, setnameempty] = React.useState(false)
    const [descriptionempty, setdescriptionempty] = React.useState(false)
    const [is_completeempty, setis_completeempty] = React.useState(false)
    const [loading, setloading] = React.useState(false)
    const auth = useAuth()
    const navigate = useNavigate()
    const spinner = <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>
    const handlechange = (event) => {
    const {name,value} = event.target
      setnameempty(false)
      setdescriptionempty(false)
      setis_completeempty(false)
      formchange(prev=> {
        return ({
          ...prev,
          [name] : value
        })
      })

    }
    const SubmitForm = async(accesstoken) => {
      const url = 'https://django-reactapp-production.up.railway.app/api/tasks/'
      const headers = new Headers()
      headers.set('Authorization', `Bearer ${accesstoken}`)
      headers.set('Content-Type', 'application/json')

      const header ={
        method : 'POST',
        headers : headers,
        body: JSON.stringify({name : form.name , description : form.description , is_complete : form.is_complete})
      }

      try {
        setloading(true)
        const response = await fetch(url,header)
        const data = await response.json()
        if(data.status === 201){
          navigate('/Todo')
        }

      }
      catch(error){
        console.log(error.name)
      }finally{
        setloading(false)
      }

    }
    const HandleSubmit = (event) => {
      event.preventDefault()
      const accesstoken = auth.access ? auth.access : localStorage.getItem('accesstoken')
     
      if(form.name === ''){
        setnameempty(true)
      }
      else if(form.description === ''){
        setdescriptionempty(true)
      }
      else if(form.is_complete === ''){
        setis_completeempty(true)
      }
      else{
          SubmitForm(accesstoken)
      }
    }
    const Clickcancel = () =>{
      navigate('/Todo')
    }


    return(
        <div className="w-100 bg-primary bg-gradient" style={{}}>
            <Container className="p-4" style={{height:"100vh"}}>
            <div className="w-100  text-light p-5 fadingdiv" style={{height: "85vh", boxShadow:"1px 1px 1px 3px rgba(0, 0, 0, 0.1)", borderRadius : "30px", backgroundColor:"rgba(255, 255, 255, 0.6)"}}>
             <div className="fadingdiv py-4 text-center">
                  <h1 className="display-6"><i className="bi bi-stars"></i></h1>
                    <h1 className="display-6 specialdisplay">Create A Todo </h1>
             </div>
            
             <div className="d-lg-flex   bg-light p-2" style={{overflowY:"auto", height:"70%", borderRadius:"10px"}}>
              <div className="w-100 px-5 py-3 text-dark specialdisplay" >
                 <h1 className="h4 fw-400X2 specialdisplay ">Add a new Todo :</h1>
                 <Form className="pt-4"  onSubmit={HandleSubmit}>
                 <Col sm="6" className={`${nameempty? 'd-block' : 'd-none'}`}>
        <p className="text-center text-danger">Field is empty</p>
      </Col>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Name :
        </Form.Label>
        <Col sm="4">
          <Form.Control name="name" value={form.name} onChange={handlechange} type='text' placeholder="Todo name" />
        </Col>
      </Form.Group>
      <Col sm="6" className={`${descriptionempty? 'd-block' : 'd-none'}`} >
        <p className="text-center text-danger">Field is empty</p>
      </Col>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Description :
        </Form.Label>
        <Col sm="4">
          <Form.Control name="description"  value={form.description} onChange={handlechange}  type="text" placeholder="Todo description" style={{height: "90px"}} />
        </Col>
      </Form.Group>
      <Col sm="6" className={`${is_completeempty? 'd-block' : 'd-none'}`}>
        <p className="text-center text-danger">Field is empty</p>
      </Col>
      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
          Completed :
        </Form.Label>
        <Col sm="4">
        <Form.Select name="is_complete" onChange={handlechange}  aria-label="Default select example">
        
           <option>{form.is_complete}</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
       
        
      </Form.Select>
        </Col>
      </Form.Group>
              
      <div className="w-100 d-flex justify-content-end">
         <input type="submit" className={`btn btn-outline-primary me-3 ${loading ? 'disabled' : '' }`} value={loading ? spinner  : 'Save' }/>
         <input type="button" className="btn btn-outline-dark" value='Cancel' onClick={Clickcancel}/>
      </div>
       
    </Form>
                
              </div>
                
             </div>
             </div>
            </Container>
        </div>
    )
}


