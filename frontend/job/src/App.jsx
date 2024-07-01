
import Home from './Component/Home'
import {Routes , Route} from "react-router-dom"
import Login from "./Component/Login"
import Register from "./Component/Register"
import Jobpost from './Pages/Jobpost'
import AddjobDetails from './Pages/AddjobDetails'
import Edit from './Pages/Edit'
import Delete from './Pages/Delete'
import Apply from './Pages/Apply'
import Jobdescription from './Component/Jobdescription'
import Applied from './Pages/Applied'
import Posted from './Component/Posted'
import Check from './Pages/Check'
import Reject from './Component/Reject'
function App() {

  return (
    <>
   <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/register" element={<Register></Register>}></Route>
    <Route path='/jobpost' element={<Jobpost></Jobpost>}></Route>
    <Route path="/addjob/:id" element={<AddjobDetails></AddjobDetails>}></Route>
    <Route path='/edit/:id' element={<Edit></Edit>}></Route>
    <Route path='/delete/:id' element={<Delete></Delete>}></Route>
    <Route path='/apply/:id' element={<Apply></Apply>}></Route>
    <Route path='/applied' element={<Applied/>}></Route>
    <Route path='/posted' element={<Posted></Posted>}></Route>
    <Route path="posted/check/:id" element={<Check></Check>}></Route>
    <Route path='/reject/:id' element={<Reject></Reject>}></Route>
   </Routes>
   
    </>
  )
}

export default App
