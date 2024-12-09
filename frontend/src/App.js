import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from "./components/Auth";
import Background from "./components/Background";
import Nav from "./components/Nav";
// ... other imports

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Background />
          <Nav />
          <div className="content-wrapper">
            <Switch>
             <AuthProvider>

              
             </AuthProvider>
            </Switch>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;