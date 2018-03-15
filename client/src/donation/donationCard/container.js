import React, { Component } from 'react';
import DonationCardPresentation from './presentation';

class DonationCard extends Component {
  state = { editAmount: '', editMode: false };
  componentDidMount() {
    this.setState(() => ({ editAmount: this.props.amount }));
  }
  componentWillReceiveProps(next) {
    const newState = {};
    if (this.props.amount !== next.amount) newState.editAmount = next.amount;
    if (!this.props.inCheckout && next.inCheckout) newState.editMode = false;
    this.setState(() => newState);
  }
  handleChange = e => {
    const { value } = e.target;
    this.setState(() => ({
      editAmount: value
    }));
  };
  handleEditMode = () => this.setState(() => ({ editMode: true }));
  submitEdit = index => {
    this.setState(() => ({ editMode: false }));
    this.props.handleEdit(this.state.editAmount);
  };
  render() {
    return (
      <DonationCardPresentation
        {...this.props}
        {...this.state}
        handleChange={this.handleChange}
        handleEditMode={this.handleEditMode}
        submitEdit={this.submitEdit}
      />
    );
  }
}

export default DonationCard;
