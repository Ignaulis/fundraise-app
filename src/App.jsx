import { Router } from './context/Router';
import Nav from './components/Nav';
import './style/main.scss';
import Main from './components/Main';
import { Data } from './context/Data';
import { ToastContainer } from 'react-toastify';
import { Wrap } from './context/Wrap';
import { Auth } from './context/Auth';





function App() {

  return (
    <Router>
      <Auth>
        <Data>
          <Wrap>
            <Nav />
            <Main />
            <ToastContainer />
          </Wrap>
        </Data>
      </Auth>
    </Router>
  );

}
export default App
