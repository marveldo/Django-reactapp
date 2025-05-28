import React from "react";
import { Container } from "react-bootstrap";
import { useAuth } from "./Auth";
import  Spinner  from 'react-bootstrap/Spinner';
import { useNavigate } from "react-router-dom";
export const AllTask= () =>{
     
      
       
       const [tasks, settasks] = React.useState(null)
       const [isloading , setisloading] = React.useState(false)
       const [edithover , setedithover] = React.useState(false)
      
       const auth = useAuth()
       const navigate = useNavigate()
      const handlemouseenter = () =>{
          navigate('/createtask')
       }

       const handlechangeedit = () => {
         setedithover(true)
         
       }
       const handlechangedelete = () => {
        setedithover(false)
        
      }
      
       let spinner = <div className="h-100 d-flex align-items-center justify-content-center">
         <Spinner animation="border" variant="primary" />
              </div>
     
       
       const Gettask = async(accesstoken) => {
        setisloading(true)
        let url = `https://django-reactapp.vercel.app/api/alltasks/`
 
        let  headers = {
          Authorization: `Bearer ${accesstoken}`,
          'Content-Type': 'application/json', // Include other headers as needed
        }
        
        const header = {
          method : 'GET',
          headers : headers,
        }
        
        try {
      
          const response = await fetch(url , header)
          const data = await response.json()
          if(data.status === "success"){
            settasks(data.data)
          }
          
        } catch (error) {
         let data = error.name
         if (data === 'TypeError'){
         
          console.log('Typeerror')
         }
        else if (data === 'NetworkError'){
           console.log('Network error')
          
         }

        }finally{
          setisloading(false)
        }
         
     }
     const Handleeditclick = (id) =>{
      navigate(`/Todo/${id}`)
  }
     let tasksdisplay = ''
     

     if(tasks !== null){
        if(tasks.length > 0){tasksdisplay = tasks.map(object => {
        
        return ( <div key={object.id} className={`row row-cols-5 mt-3 w-100 text-dark ${edithover?'trans': '' }`}>
       <div className="col-3">{object.name}</div>
       <div className="col-3" style={{overflowX:"auto"}}>{object.description}</div>
       <div className="col-3">{object.is_complete? <i className="bi bi-check2"></i> : <i className="bi bi-x"></i>}</div>
       <div className="col-1" onMouseEnter={handlechangeedit} onMouseLeave={handlechangedelete} onClick={() => Handleeditclick(object.id)}><i className="bi bi-pencil-square "></i></div>
       <div className="col-1" ><i className="bi bi-calendar-x "></i></div>
   </div>) })
     }
     else if(tasks.length === 0){
      tasksdisplay = <div className="h-100 d-flex align-items-center justify-content-center">
               No Task to display You can create new
      </div>
     }
    }
     
     else{
      tasksdisplay = <div className="h-100 d-flex align-items-center justify-content-center">
      Error!!
         </div>
     }
      
       React.useEffect(() => {
        let access = auth.access
        if (access === null){
          access = localStorage.getItem('accesstoken')
         }
      
          Gettask(access)
       }, [])


      const clickicon = () => {
        navigate('/home', {replace: true})
      }

       return(
        <div className="w-100 bg-primary bg-gradient" style={{}}>
            <Container className="p-4" style={{height:"100vh"}}>
            <div className="w-100 text-center text-light p-5 fadingdiv" style={{height: "85vh", boxShadow:"1px 1px 1px 3px rgba(0, 0, 0, 0.1)", borderRadius : "30px", backgroundColor:"rgba(255, 255, 255, 0.6)", position: "relative"}}>
            <div className="icon" onClick={clickicon}><i className="bi bi-arrow-left"></i></div>
             <div className="fadingdiv">
                  <h1 className="display-6"><i className="bi bi-stars"></i></h1>
                    <h1 className="display-6 specialdisplay">Here's your Todo </h1>
             </div>
             <div className="py-4 d-flex text-dark">
                <div className="w-50 d-flex justify-content-start extraspecialdisplay" >
                    <div className={`d-flex align-items-center justify-content-center w-75  bg-light`} onClick={handlemouseenter}  style={{ borderRadius:"10px"}} >
                      Add new todo
                    </div>
                </div>
                <div className="w-50 d-flex justify-content-end extraspecialdisplay" > <div className={`d-flex align-items-center justify-content-center w-25 p-2 bg-primary text-light`}   style={{borderRadius:"10px"}}>
                     All
                    </div></div>

                </div>
             <div className="d-lg-flex  justify-content center  bg-light p-2" style={{overflowY:"auto", height:"60%", borderRadius:"10px"}}>
              <div className="w-100 p-2 ">
                <div className="row row-cols-3  w-100 text-dark fw-3 extraspecialdisplay fw-400X2 ">
                  <div className="col-3"> Task</div>
                  <div className="col-3">Description</div>
                  <div className="col-3">Completed</div>
                </div>
                <div className="w-100 h-75 pt-3 text-dark extraspecialdisplay">
                  {isloading? spinner : tasksdisplay}
                 </div>
              </div>
                
             </div>
             </div>
            </Container>
        </div>
       )
}