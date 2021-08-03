import './App.css';
import { Switch, Route } from "react-router-dom";
import Login from './components/login'
import Register from './components/register'
import UserDashboard from './components/UserDash'
import OwnerDashboard from './components/OwnerDash'
import CreateRestaurant from './components/Create'
import AuthContextProvider from './context/authContext'

function App() {
  return (
    <div>
      <AuthContextProvider>
       <Switch>
       <Route   exact path='/' component={Login}/>
        <Route  path='/login' component={Login}/>
        <Route  path='/register' component={Register}/>
        <Route  path='/user/dash' component={UserDashboard}/>
        <Route  path='/owner/dash' component={OwnerDashboard}/>
        <Route  path='/add/restaurant' component={CreateRestaurant}/>
        
      </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
