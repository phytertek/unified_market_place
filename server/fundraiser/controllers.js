const { User, Fundraiser } = require('enmapi/database');
const { sendUserError } = require('enmapi/common/errors');
const { requireFields } = require('enmapi/common/validation');
const SSK = process.env.SSK;
const SCID = process.env.SCID;
const stripe = require('stripe')(SSK);
const axios = require('axios');

module.exports = {
  getAllFundraisers: async (req, res) => {
    try {
      const fundraisers = await Fundraiser.find();
      res.json(fundraisers);
    } catch (error) {
      sendUserError(error, res);
    }
  },
  postCreateFundraiser: async (req, res) => {
    try {
      const { title, description, goal } = req.body;
      requireFields({ title, description, goal });
      const fundraiser = await new Fundraiser({
        title,
        description,
        goal,
        owner: req.safeUser._id
      }).save();
      req.unsafeUser.fundraisers.push(fundraiser._id);
      await req.unsafeUser.save();
      res.json(fundraiser);
    } catch (error) {
      sendUserError(error, res);
    }
  },
  postCreateFundraiserAcct: async (req, res) => {
    try {
      const { code } = req.body;
      requireFields({ code });
      const newStripeAcct = await axios.post(
        'https://connect.stripe.com/oauth/token',
        {
          client_secret: SSK,
          code: code,
          grant_type: 'authorization_code'
        }
      );
      req.unsafeUser.fundraiserAcct = newStripeAcct.data;
      req.unsafeUser.isFundraiser = true;
      await req.unsafeUser.save();
      res.json(newStripeAcct.data);
    } catch (error) {
      sendUserError(error, res);
    }
  }
};
