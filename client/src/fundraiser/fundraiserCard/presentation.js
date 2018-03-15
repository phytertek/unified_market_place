import React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import RedeemIcon from 'material-ui-icons/Redeem';
import NumberFormat from 'react-number-format';
const styles = theme => ({
  root: { maxWidth: 1200 },
  avatar: {
    backgroundColor: theme.palette.secondary.dark
  },
  icon: { color: theme.palette.secondary.dark }
});
const FundraiserCardPresentation = ({
  _id,
  title,
  owner,
  goal,
  description,
  openDonationModal,
  classes
}) => (
  <Card className={classes.root}>
    <CardHeader
      avatar={
        <Avatar aria-label="Fundraiser" className={classes.avatar}>
          {title.slice(0, 2).toUpperCase()}
        </Avatar>
      }
      action={
        <IconButton
          onClick={() => openDonationModal({ _id, title, owner })}
          className={classes.icon}
        >
          <RedeemIcon />
        </IconButton>
      }
      title={title}
      subheader={
        <NumberFormat
          value={goal}
          decimalScale={0}
          fixedDecimalScale={true}
          thousandSeparator
          displayType="text"
          prefix="$"
        />
      }
    />
    <CardContent>
      <Typography component="p">{description}</Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(FundraiserCardPresentation);
