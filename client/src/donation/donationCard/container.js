import React, { Component } from 'react';
import DonationCardPresentation from './presentation';

class DonationCard extends Component {
  state = { editAmount: 0, editMode: false };
  componentDidMount() {
    this.setState(() => ({ editAmount: this.props.amount }));
  }
  componentWillReceiveProps(next) {
    if (this.props.amount !== next.amount)
      this.setState(() => ({ editAmount: next.amount }));
    if (!this.props.inCheckout && next.inCheckout)
      this.setState(() => ({ editMode: false }));
  }

  handleChange = e => {
    this.setState({ editAmount: e.target.value });
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
