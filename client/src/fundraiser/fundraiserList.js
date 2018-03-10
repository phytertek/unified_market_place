import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

import { getFundraisers } from './async';

import FundraiserCard from './fundraiserCard/container';
class FundraiserList extends Component {
  state = { awaitingFundraisers: true };
  componentDidMount() {
    this.props.getFundraisers();
  }
  componentWillReceiveProps(next) {
    if (!!next.fundraisers.length)
      this.setState({ awaitingFundraisers: false });
  }
  render() {
    return (
      <Paper style={{ padding: 20 }}>
        <Grid
          container
          direction="column-reverse"
          justify="center"
          alignItems="center"
        >
          {this.props.fundraisers.map((fundraiser, i) => (
            <Grid item key={fundraiser._id} xs={12} sm={10}>
              <FundraiserCard {...fundraiser} />
            </Grid>
          ))}
          {this.state.awaitingFundraisers && (
            <CircularProgress color="secondary" size={300} />
          )}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  fundraisers: state.fundraiserStore.fundraisers
});

const mapDispatchToProps = {
  getFundraisers
};

export default connect(mapStateToProps, mapDispatchToProps)(FundraiserList);
