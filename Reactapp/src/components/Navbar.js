
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React from "react"
import img from '../images/360_F_259317013_nJJaBgGGzvXMd6cAyLd6yMJtbdnd61wk.jpg'
import { useNavigate } from 'react-router-dom';
import  Spinner  from 'react-bootstrap/Spinner';
import { useAuth } from './Auth';
import { Offcanvas, Button } from 'react-bootstrap';




const BootsrapNav = () => {
    return (
        <div>
           
        <Navbar key={'lg'} expand={'lg'} className="navbar-dark  mb-3" style={{height: "8vh"}}>
          <Container fluid >
            <Navbar.Brand href="#" >Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="#action2">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      
        </div>
       
    )
}

const Login = () =>{
    const [value,setvalue] = React.useState(0)
    const [Loginform, Changeloginform] = React.useState({email:"",username:"",password:"",password1:""})
    const [messagevalue,setmessagevalue] = React.useState(0)
    const [isVisible, setIsVisible] = React.useState(true);
    const [messageinfo,setmessageinfo] = React.useState('')
    const [Submitting, Setsubmitting] = React.useState(false)
    const auth = useAuth();
    const navigate = useNavigate()
    
    
    
    
   
    
   
  
    let form = ''
    let message =''
    if (messagevalue===1){
            message = <div  className={`message  ${isVisible ? 'fade' : ''} bg-warning  text-light`}>
                <p className='extraspecialdisplay' >{messageinfo}</p>
                 </div>
    }
    else if (messagevalue===2){
        message = <div className={`message ${isVisible ? 'fade' : ''} bg-success text-light`}>
                <p className='extraspecialdisplay' >{messageinfo}</p>
                 </div>
    }
    
   React.useEffect(() => {
       
        const timeout = setTimeout(() => {
          setIsVisible(true);
         }, 2000);
    
        return () => clearTimeout(timeout);
      },[isVisible]);
  
    
    
    const handleClick = () => {
         let vall = 1
         setvalue(prevval => prevval +1)
         if (value === vall){
            setvalue(prevval => 0)
         }
    }
   const Handleloginformchange = (event) => {
        
         const {name,value} = event.target
         Changeloginform(prev => {
            
            return({
                ...prev,
                [name]:value
            })
         })
        }

   
    const HandleSubmit =(event) =>{
        
        const Loginuser = async(url,header) => {
            Setsubmitting(true)
            try{
            const response = await fetch(url,header)
            let data = await response.json()
            if (data.detail){
                setmessagevalue(1)
                setmessageinfo('password incorrect')
                setIsVisible(false)
                Changeloginform(prev => {
                    return ({
                        ...prev,
                        password:""
                    })
                })
            }
            else if(data.access && data.refresh){
                setmessagevalue(2)
                setmessageinfo('Password Correct')
                setIsVisible(false)
                auth.login(data.username,data.access,data.refresh)
                localStorage.setItem('refreshtoken',data.refresh)
                localStorage.setItem('accesstoken',data.access)
                localStorage.setItem('email',data.email)
                localStorage.setItem('username', data.username)
                navigate('/home')
                 }
            else if (data.status === 201){
                setmessagevalue(2)
                setmessageinfo('Registeration succesful')
                setIsVisible(false)
                Changeloginform({
                    email:'',
                    username:'',
                    password:'',
                    password1:''
                })
            }
            else if (data.email[0] ==="user with this email already exists."){
                setmessagevalue(1)
                setmessageinfo('email already taken')
                setIsVisible(false)
                Changeloginform(prev =>{
                    return({
                        ...prev,
                        email:""
                    })
                })
            }
            }catch(error){
                console.log(error)
                let data = error.name
                if (data === 'TypeError'){
                    setmessagevalue(1)
                    setmessageinfo('Api not accessible')
                    setIsVisible(false)
                    
                }
                else if (data === 'NetworkError'){
                    setmessagevalue(1)
                    setmessageinfo('Check your Network')
                    setIsVisible(false)
                    
                }
            }finally{
                Setsubmitting(false)
            }
        
        }
        event.preventDefault()
        const formname = event.target.name
        if(formname === 'Login'){
            let email = Loginform.email
            let password = Loginform.password
            const headers = new Headers()
            let url = `https://django-reactapp.vercel.app/api/Login/`
            headers.set("Content-Type","application/json")
            const  header ={
               method : "POST",
               headers : headers,
               body: JSON.stringify({email:email , password:password})
            }
            if(email ==='' && password===''){
                setmessagevalue(1)
                setmessageinfo('Fields cannot be empty')
                setIsVisible(false)
            }
            else{
                 Loginuser(url,header)
            }
}
        else{
            let {email,username,password,password1} = Loginform
            let url = `https://django-reactapp.vercel.app/api/Register/`
            const headers = new Headers()
            headers.set("Content-Type","application/json")
            let header = {
                method : "POST",
                headers: headers,
                body : JSON.stringify({email:email, username:username,password:password})
            }
            if (password !== password1){
                console.log("passwords dont match")
                setmessagevalue(1)
                setmessageinfo('Passwords must match')
                Changeloginform(prev =>{
                    return({
                        ...prev,
                        password:"",
                        password1:""

                    })
                })
                setIsVisible(false)
            }
            else if(email === '' && username === '' && password === '' && password1=== ''){
                setmessagevalue(1)
                setmessageinfo('fields cannot be empty')
                setIsVisible(false)
            }
            else{
                Loginuser(url,header)
                 }
        }
 }
    if(value === 0){
        form = <Form className='w-100 p-5' name='Login' onSubmit={HandleSubmit}>
        <h1 className='my-5 text-center'>Sign in  <i className="bi bi-box-arrow-in-right"></i></h1>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                   <Form.Control name='email' type='email' value={Loginform.email} placeholder="email@example.com" onChange={Handleloginformchange}  />
               </Col>
            </Form.Group>

           <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
               <Form.Label column sm="2">Password</Form.Label>
               <Col sm="10">
                  <Form.Control name='password' type="password" value={Loginform.password}placeholder="Password" onChange={Handleloginformchange} />
               </Col>
          </Form.Group>
          <div className='text-center'>
          <button className={` btn btn-outline-secondary ${Submitting ? 'disabled' : ''}`} > { Submitting ?  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span></Spinner> : 'Submit' }</button>
          </div>
          <div className='text-center mt-3'>
          <p onClick={handleClick}>Dont have an account? click here</p>
          </div>
         
         </Form> 
   
    }
    else{
        form = <Form className='sliding-text h-75 w-100 py-3 px-5' name='Register' onSubmit={HandleSubmit}>
        <h1 className='my-3 text-center'>Sign up   <i className="bi bi-pen-fill"></i></h1>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                <Form.Label column sm="2">Email</Form.Label>
                <Col sm="10">
                   <Form.Control name='email' type='email' value={Loginform.email} placeholder="email@example.com" onChange={Handleloginformchange}/>
               </Col>
            </Form.Group>

           <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
               <Form.Label column sm="2">username</Form.Label>
               <Col sm="10">
                  <Form.Control type="text" name='username' value={Loginform.username} placeholder="Username" onChange={Handleloginformchange} />
               </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
               <Form.Label column sm="2">Password</Form.Label>
               <Col sm="10">
                  <Form.Control name='password' value={Loginform.password} type="password" placeholder="Password" onChange={Handleloginformchange}/>
               </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextPasswor">
               <Form.Label column sm="2">Password Again</Form.Label>
               <Col sm="10">
                  <Form.Control  name='password1' value={Loginform.password1} type="password" placeholder="Password again" onChange={Handleloginformchange} />
               </Col>
          </Form.Group>
          <div className='text-center'>
          <button className={` btn btn-outline-secondary ${Submitting ? 'disabled' : ''}`} > { Submitting ?  <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span></Spinner> : 'Submit' }</button>
          </div>
          <div className=' h-25 text-center mt-3 mb-2'>
          <p   onClick={handleClick}>Already have an account? click here</p>

          </div>
        </Form>
       
    }
    
    return (
         <Container className='w-100 ' style={{paddingTop:"100px",paddingBottom:"80px",position:"relative",height:"100vh"}}>
            {message}
            <div className='d-lg-flex align-items-center fadingdiv' style={{height:"60vh"}}>
               <div style={{backgroundImage: `url(${img})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}} className='d-flex w-100 text-center  h-100 align-items-center justify-content-center text-center '>
                  <div className='text-light p-3 ' style={{backgroundColor:"rgba(0, 0, 0, 0.8)"}}>
                    <h1 className='display-6 '><i className="bi bi-card-heading"></i> </h1>
                    <span className='display-6'>Marvels Todo</span>
                  </div>
                  
                </div>
                <div className='d-flex h-100 w-100 align-items-center  justify-content-center  bg-light' style={{overflowX:"hidden"}}>
                     {form}
                </div>
            </div>
         </Container>
    )
}

const Loginpage = () =>{
    return (
        <div className="w-100"style={{backgroundColor:"rgba(0, 0, 0, 0.7)",overflowY:"auto"}}>
           
            <Login/>
        </div>
    )
}
export {Loginpage,BootsrapNav}