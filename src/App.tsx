import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'

import { AppProvider } from './providers/app';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </div>
  );
}

export default App;
