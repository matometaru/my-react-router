import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'

import { LoadingProvider } from './context/LoadingContext';

function App() {
  return (
    <div className="App">
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </div>
  );
}

export default App;
