import * as React from "react";
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store";
import { createRoot } from 'react-dom/client';

const store = setupStore()

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
)