import { Route, Switch } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/Navbar';

import ImageDetail from './pages/ImageDetail';
import ImageForm from './pages/ImageForm';
import ImageGallery from './pages/ImageGallery';

function App() {
  return (
    <div className="bg-dark text-light">
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route path="/" component={ImageGallery} exact />
          <Route path="/upload" component={ImageForm} />
          <Route path="/images/:id" component={ImageDetail} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
