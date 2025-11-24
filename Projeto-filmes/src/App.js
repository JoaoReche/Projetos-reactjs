import RoutesFile from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={2500} />
      <RoutesFile />
    </div>
  );
}

export default App;