import Registration from './registration'
import Sidebar from '../Feed/Templates/sidebar'
import Header from '../globalmessage/Header'
import '../globalmessage/globalUI.css'
function Registerme(props){
    return(
        <div className='global'>
        <Sidebar/>
        <div className='Chat-box'>
        <Header 
          name="Tutor Form"
        />
        <div className="form">
        <Registration/></div>
        </div>
        </div>
    )
}

export default Registerme;