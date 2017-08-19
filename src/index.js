import * as React from 'karet';
import * as ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';

import registerServiceWorker from './register-service-worker';

import App from './app';

//

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();
