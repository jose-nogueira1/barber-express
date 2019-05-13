import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App.jsx';
import 'mapbox-gl/dist/mapbox-gl.css' // Import of Mapbox CSS
import mapboxgl from 'mapbox-gl/dist/mapbox-gl'
// import registerServiceWorker from './registerServiceWorker';

// Inform your Mapbox token (https://www.mapbox.com/account/)
mapboxgl.accessToken = 'pk.eyJ1IjoiaWFtYWxpdHRsZWtpZCIsImEiOiJjanVsMWR0dDkxdnF0M3lxamM5cGltajhpIn0.HKbAc83dAXOzVDvmO9Qy3Q'

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
// registerServiceWorker();
