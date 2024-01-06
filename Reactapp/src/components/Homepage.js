import Container  from "react-bootstrap/Container"
import { BootsrapNav } from "./Navbar"
import { useAuth } from "./Auth"
import { useNavigate } from "react-router-dom"
const Home = ()=> {
    const auth = useAuth()
    const navigate = useNavigate()
    let user = auth.user
    if(user === null){
        user = localStorage.getItem('username')
    }
    let access = auth.access
    if (access === null){
        access = localStorage.getItem('accesstoken')
    }
    const Handleclick = () =>{
        navigate('/Todo')
 }
 const Handleclick2 = () =>{
     navigate('/Alltask')
 }
    const listdivs = [
        {"key": 1,'color': 'bg-success', 'message':"View Undone tasks",'onclick': Handleclick},
        {"key": 2, 'color': 'bg-info', 'message': "View Tasks History", 'onclick': Handleclick2}
    ]
 
   const divs = listdivs.map(div => {
        return <Container key={div.key} className=" p-5 slideup trans">
            <div className={`${div.color} w-100 text-center d-flex align-items-center justify-content-center  `} onClick={div.onclick} style={{height:"20vh", borderRadius : "30px"}}>
            <p className="specialdisplay">{div.message}</p>
            </div></Container>
   })
    return( 
        <Container className="d-flex align-items-center justify-content-center p-5" style={{height: "100vh"}}>
           
           <div className="w-100 bg-light text-center p-3" style={{height: "70vh", boxShadow:"1px 1px 1px 3px rgba(0, 0, 0, 0.1)", borderRadius : "30px"}}>
             <div>
             <h1 className="display-6"><i className="bi bi-stars"></i></h1>
             <h1 className="display-6 specialdisplay">Welcome to your Todo {user} </h1>
             </div>
             <div className="d-lg-flex h-75 align-items-center justify-content center" style={{overflowY:"auto"}}>
                {divs}
             </div>
           </div>

        </Container>
    )
}


const Homepage  = () => {
    return(
        <div className="w-100" style={{ backgroundColor:"rgba(0, 0, 0, 0.7)"}}>
            <Home/>
        </div>
    )
}
export {Homepage}