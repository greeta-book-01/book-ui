import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { config } from './Constants'
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core';

const keycloak = new Keycloak({
  url: `${config.url.KEYCLOAK_BASE_URL}`,
  realm: "book-realm",
  clientId: "book-app"
})

const initOptions = { pkceMethod: 'S256' }

const handleOnEvent = async (event: AuthClientEvent, error: AuthClientError | undefined) => {
  if (event === 'onAuthSuccess') {
    if (keycloak.authenticated) {
      //TODO: ignore for now
    }
  }
}  

const loadingComponent = (
  <div></div>
)  

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ReactKeycloakProvider
    authClient={keycloak}
    initOptions={initOptions}
    LoadingComponent={loadingComponent}
    onEvent={(event, error) => handleOnEvent(event, error)}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReactKeycloakProvider>       
);
