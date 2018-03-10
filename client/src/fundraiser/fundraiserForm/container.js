import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeFundraiserDrawer } from '../store';
import { createFundraiser } from '../async';
import FundraiserFormPresentation from './presentation';

class FundraiserForm extends Component {
  state = {
    title: '',
    __titleError: null,
    description: '',
    __descriptionError: null,
    goal: '',
    __goalError: null
  };
  changeHandler = e => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };
  submitHandler = e => {
    e.preventDefault();
    const fundraiser = {
      title: this.state.title,
      description: this.state.description,
      goal: this.state.goal
    };
    this.props.createFundraiser(fundraiser);
    this.props.closeFundraiserDrawer();
  };
  render() {
    return <FundraiserFormPresentation {...this.state} {...this} />;
  }
}

const mapStateToProps = state => ({ ...state.fundraiserStore });

const mapDispatchToProps = { closeFundraiserDrawer, createFundraiser };

export default connect(mapStateToProps, mapDispatchToProps)(FundraiserForm);
