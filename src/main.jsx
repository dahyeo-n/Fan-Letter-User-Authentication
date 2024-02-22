import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { Provider } from 'react-redux';
import getStore from './store/config/configStore';

const store = getStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
        <GlobalStyle />
    </Provider>
);
