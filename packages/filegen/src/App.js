import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import Routes from './routes';
// import history from './services/history';

import HomePage from '~/pages/Home';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Dashboard from '~/pages/Dashboard';



const theme = createMuiTheme();

function App() {
  return (
    <>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
    </MuiThemeProvider>
    <ToastContainer autoClose={3000} />
    </>
  );
}

export default App;
