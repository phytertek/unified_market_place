import React, { Component } from 'react';
import { connect } from 'react-redux';
import FundraiserCardPresentation from './presentation';
import { openDonationModal } from '../../donation/store';
class FundraiserCard extends Component {
  state = { expanded: false };
  handleExpansion = () =>
    this.setState(() => ({ expanded: !this.state.expanded }));
  render() {
    return (
      <FundraiserCardPresentation
        {...this.props}
        expanded={this.state.expanded}
        handleExpansion={this.handleExpansion}
      />
    );
  }
}

export default connect(null, { openDonationModal })(FundraiserCard);
