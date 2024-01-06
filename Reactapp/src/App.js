import React from "react";
import {Loginpage} from "./components/Navbar";
import { Homepage } from "./components/Homepage";
import "react-bootstrap"
import "./App.css"
import { BrowserRouter, Route ,Routes } from "react-router-dom";
import { Create } from "./components/createtask";

import {Protectedroute,AlreadyLoggedin} from "./components/Protectedroutings"
import { Refresh } from "./components/Refresh";
import { Todo } from "./components/Todo";
import { Edittask } from "./components/Edittask";
import { AllTask } from "./components/Alltask";
import { Logout } from "./components/Logout";
const App =() =>{



  return(
       
         <BrowserRouter>
            <Refresh>
                <Routes>
                    <Route path="/" element={<AlreadyLoggedin><Loginpage/> </AlreadyLoggedin>}/>
                    <Route path="/home" element={<Protectedroute ><Homepage/></Protectedroute>} />
                    <Route path="/Todo" element={<Protectedroute ><Todo/></Protectedroute>} />
                    <Route path="/createtask" element={<Protectedroute ><Create/></Protectedroute>} />
                    <Route path="/Todo/:taskId" element={<Protectedroute ><Edittask/></Protectedroute>} />
                    <Route path="/Alltask" element={<Protectedroute ><AllTask/></Protectedroute>} />
                    <Route path="/Logout" element={<Protectedroute ><Logout/></Protectedroute>} />
               </Routes>
            </Refresh>
          </BrowserRouter>
  
    
  )
}
export default App