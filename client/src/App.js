import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import TeamScreen from './screens/TeamScreen.js'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import ExpenseScreen from './screens/ExpenseScreen.js'
import carScreen from './screens/CarScreen.js'
import ContractScreen from './screens/contractScreen.js'
import Navbar from './components/Navbar/navbar.js'
import dashboardScreen from './screens/dashboardScreen.js';
import Trying from './screens/Trying.js';
import CalendarScreen from './screens/calendarScreen.js';
import Tryy from './screens/tryy.js';
import Try from './screens/try.js';
import Footer from './components/Footer.js';
import Modal from 'react-modal';
import AgencyScreen from './screens/agencyScreen';
import AddCarPopup from './screens/addCarPopup';
import Essai from './screens/essai.js';
import Essaii from './screens/essaii.js';

Modal.setAppElement('#root')

const App = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  return (
    <Router>
      <div className='row'>
        {userInfo ? <div className='App col-sm-2'><Sidebar /></div> : <div></div>}
        <div className='col-sm-10'>
          <Navbar />
          <Route path='/login' component={LoginScreen} />
          <Route path='/contrat' component={ContractScreen} />
          <Route path='/expenses' component={ExpenseScreen} />
          <Route path='/cars' component={carScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/users' component={TeamScreen} exact />
          <Route path='/dashboard' component={dashboardScreen} />
          <Route path='/calendrier' component={CalendarScreen} />
          <Route path='/trying' component={Trying} />
          <Route path='/tryy' component={Tryy} />
          <Route path='/try' component={Try} />
          <Route path='/add' component={AddCarPopup} />
          <Route path='/agency' component={AgencyScreen} />
          <Route path='/ess' component={Essai} />
          <Route path='/essaii' component={Essaii} />
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
