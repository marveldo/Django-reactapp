import React from "react";

import Container  from "react-bootstrap/Container"
import { BootsrapNav } from "./Navbar"
import { useAuth } from "./Auth"
import { useNavigate } from "react-router-dom"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Spinner } from "react-bootstrap"
import Row from 'react-bootstrap/Row';
import { useParams } from "react-router-dom";


export const Edittask = () => {
      const Id = useParams()
      const [nameempty, setnameempty] = React.useState(false)
      const [descriptionempty, setdescriptionempty] = React.useState(false)
      const [is_completeempty, setis_completeempty] = React.useState(false)
      const auth = useAuth()
      const [loading, setloading] = React.useState(false)
      const navigate = useNavigate()
      const [form, formchange] = React.useState({name : '', description: "", is_complete:""})
      
      const Gettask = async(id, accesstoken) => {
          let url = `http://127.0.0.1:8000/api/task/${id}/`
          let headers = new Headers()
          headers.set('Authorization', `Bearer ${accesstoken}`)
          headers.set('Content-Type', 'application/json')

          let header = {
            method : "GET",
            headers : headers,
          }
          
          try{
            const response = await fetch(url,header)
            const data = await response.json()
            
            if(data.status === 'success'){
               formchange(data.data)
            }
            
          }catch(error){
           console.log(error.name)
          }
      }
      const SubmitForm = async(accesstoken,id) => {
        const url = `http://127.0.0.1:8000/api/task/${id}/`
        const headers = new Headers()
        headers.set('Authorization', `Bearer ${accesstoken}`)
        headers.set('Content-Type', 'application/json')
  
        const header ={
          method : 'PUT',
          headers : headers,
          body: JSON.stringify({name : form.name , description : form.description , is_complete : form.is_complete})
        }
  
        try {
          setloading(true)
          const response = await fetch(url,header)
          const data = await response.json()
          if(data.status === 'success'){
            navigate('/Todo', {replace:true})
          }
          console.log(data)
  
        }
        catch(error){
          console.log(error.name)
        }finally{
          setloading(false)
        }}
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
    const Clickcancel = () =>{
        navigate('/Todo')
      }
      const HandleSubmit = (event) => {
        const id = Id.taskId
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
            SubmitForm(accesstoken,id)
        }
      }
      React.useEffect(()=>{
       const id = Id.taskId
       const access = auth.access ? auth.access : localStorage.getItem('accesstoken')
       
       Gettask(id,access)
      }, [])
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
             <Form className="pt-4" >
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
  <Col sm="6" className={`${nameempty? 'd-block' : 'd-none'}`}>
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
  <Col sm="6" className={`${nameempty? 'd-block' : 'd-none'}`}>
        <p className="text-center text-danger">Field is empty</p>
      </Col>
  <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
    <Form.Label column sm="2">
      Completed :
    </Form.Label>
    <Col sm="4">
    <Form.Select name="is_complete" onChange={handlechange}  aria-label="Default select example">
    
       <option>{form.is_complete ? 'True' : 'False'}</option>
        <option value="true">True</option>
        <option value="false">False</option>
   
    
  </Form.Select>
    </Col>
  </Form.Group>
          
  <div className="w-100 d-flex justify-content-end">
     <input type="submit" onClick={HandleSubmit} className={`btn btn-outline-primary me-3 ${loading ? 'disabled' : '' }`} value={loading ?  <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner> : 'Save' }/>
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