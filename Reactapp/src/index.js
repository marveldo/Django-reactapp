
import ReactDom from "react-dom"

import App from "./App";
import { Authprovider } from "./components/Auth";


const container = document.getElementById('root')
// const root = createRoot(container)
const Root = () => {
   
    return(
          <Authprovider>
            <App/>
            </Authprovider>
    )
}
// root.render(<Root/>)
ReactDom.render(<Root/>,container)