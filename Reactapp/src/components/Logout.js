import Container  from "react-bootstrap/Container"
import { BootsrapNav } from "./Navbar"
import { useAuth } from "./Auth"
import { useNavigate } from "react-router-dom"


 export const Logout = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    auth.logout()
    localStorage.removeItem('refreshtoken')
    localStorage.removeItem('accesstoken')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    const Handleclick = () => {
          navigate('/',{replace:true})
    }
    return (
        <Container className="d-flex align-items-center justify-content-center p-5" style={{height: "100vh"}}>
        <div className="w-100 bg-light text-center p-3" style={{height: "70vh", boxShadow:"1px 1px 1px 3px rgba(0, 0, 0, 0.1)", borderRadius : "30px"}}>
          <div>
          <h1 className="display-6"><i className="bi bi-stars"></i></h1>
          <h1 className="display-6 specialdisplay">You have been Logged out </h1>
          </div>
          <div className="d-lg-flex h-75 align-items-center justify-content center" style={{overflowY:"auto"}}>
             <div className="w-100">
                <p> Direct to Log in</p>
                <button className="btn btn-outline-dark" onClick={Handleclick}>LOG IN</button>
             </div>
          </div>
        </div>

     </Container>
    )
}