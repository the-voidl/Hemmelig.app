import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './i18n';
import { Suspense } from 'react';
import { LoadingOverlay } from '@mantine/core';

import App from './client/app';
import configureStore from './client/helpers/configureStore';
import './client/index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Suspense
            fallback={
                <LoadingOverlay
                    loaderProps={{ size: 'xl', color: 'green', variant: 'bars' }}
                    overlayOpacity={0.3}
                    overlayColor="#1A1B1E"
                    visible
                />
            }
        >
            <App />
        </Suspense>
    </Provider>,
    document.getElementById('root')
);
