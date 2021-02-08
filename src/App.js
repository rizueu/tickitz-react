import Router from './router';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// State Management
import persistedStore from './redux/store'

// Import Assets
import 'bootstrap';
import './sass/App.scss';

const App = () => {
	const {store, persistor} = persistedStore()
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Router />
			</PersistGate>
		</Provider>
	)
}

export default App;
