import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'

import { AppProvider } from './providers/app';
import GlobalLoading from './components/GlobalLoading';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <GlobalLoading />
        <RouterProvider router={router} />
      </AppProvider>
    </div>
  );
}

export default App;
