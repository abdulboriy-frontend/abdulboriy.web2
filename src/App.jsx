import "./App.css"
import Sidebar from './ui/sidebar/Sidebar'
import Navbar from './ui/navbar/Navbar'
import Mahsulot from "./pages/mahsulotlar/mahsulot"
import { Route, Routes } from "react-router-dom"
import Asosiy from "./pages/asosiy/Asosiy"
import Buyurtma from "./pages/buyurtma/Buyurtma"
import Habar from "./pages/habar/Habar"
import Statistika from "./pages/statistika/Statistika"
const App = () => {
  
  return (
    <div className='body'>
      <Sidebar />
      <div className="inne-body">
        <Navbar />
        <Routes>
          <Route path="/asosiypanel" element={<Asosiy/>}/>
          <Route path="/" element={<Mahsulot/>}/>
          <Route path="/buyurtmalar" element={<Buyurtma/>}/>
          <Route path="/habarlar" element={<Habar/>}/>
          <Route path="/statistika" element={<Statistika/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
