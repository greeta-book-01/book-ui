import React from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { config } from './Constants'
import { AuthClientError, AuthClientEvent } from '@react-keycloak/core';
import { Dimmer, Header, Icon } from 'semantic-ui-react'

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
  <Dimmer inverted active={true} page>
    <Header style={{ color: '#4d4d4d' }} as='h2' icon inverted>
      <Icon loading name='cog' />
      <Header.Content>Keycloak is loading
        <Header.Subheader style={{ color: '#4d4d4d' }}>or running authorization code flow with PKCE</Header.Subheader>
      </Header.Content>
    </Header>
  </Dimmer>
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
