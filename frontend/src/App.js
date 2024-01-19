// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SupportAgentForm from './components/SupportAgentForm';
import SupportTicketForm from './components/SupportTicketForm';
import TicketList from './components/TicketList';
import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/api/support-agents" element={<SupportAgentForm />} />
        <Route path="/api/support-ticket-form" element={<SupportTicketForm />} />
        <Route
          path="/api/support-tickets"
          element={
            <>
            <div className="card-container"> 
                <SupportTicketForm />
                <TicketList />
            </div>
              
            </>
          }
        />
      </Routes>
    </Router>
    // <div>
    //   <h1>Support Ticket Entry System</h1>
    //   <SupportAgentForm />
    //   <SupportTicketForm />
    //   <TicketList/>
    // </div>
  );
};

export default App;
