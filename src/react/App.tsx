import React from 'react';
import './App.css';
import BabylonCanvas from './components/BabylonCanvas';

function App() {
	return (
		<React.Fragment>
			<BabylonCanvas style={{ width: '100%', position: 'absolute' }} />
		</React.Fragment>
	);
}

export default App;
