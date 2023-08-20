import './App.css';
import Banner from './components/Home';
import AddEmplye from './components/AddEmplye'
import ListEmployees from './components/EmplyList'
import { Route, Routes } from 'react-router-dom';
import EditEmployee from './components/EditEmployee'
function App() {
  return (<>
    
    <Banner/>
    <Routes>
          <Route path="/addEmployee" element={<AddEmplye/>} />
          <Route path="/listEmployees" element={<ListEmployees/>} />
          <Route path="/editEmployee/:EmployeeID" element={<EditEmployee />} />
        </Routes>
        
    </>
  );
}

export default App;
