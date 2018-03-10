import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import NavBar from './nav/navBar';
import FundraiserList from './fundraiser/fundraiserList';
class App extends Component {
  render() {
    return (
      <div>
        <Reboot />
        <NavBar />
        <Switch>
          <Route path="/" component={FundraiserList} />
        </Switch>
      </div>
    );
  }
}
export default App;
