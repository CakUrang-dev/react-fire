// Library
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
// Page
import Dashboard from '../Dashboard';
import Login from '../Login';
import Register from '../Register';
import { store } from '../../../config/redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
