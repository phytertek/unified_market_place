# UNIFIED MARKETPLACE

## Part 1: ​ Connect Express

* Allow individuals to sign up for a fundraising account (eg. John's Fundraiser, Mary's Fundraiser)

## Part 2: ​ Donors

* Should see all available fundraisers on your site and select two to donate to.
* At checkout, allow Donor to pay any input amount by card (Stripe Elements) or \*Apple/Google Pay (Payment Request Button).
* Upon payment submission, Platform should take a 5% commission and split the remaining funds between the two selected fundraisers.

> \*Both card and Apple/Google Pay options should be available to the Donor.

### Data Model

```
|- User
  |- email (required)
  |- password (required, hashed)
  |- firstName
  |- lastName
  |- isFundraiser
  |- fundraiserAcct (stripe)
  |- isDonor
  |- donorAcct (stripe)
  |- fundraisers (list - ref: Fundraisers)
  |- donations (list - ref: Donations)

|- Fundraiser
  |- owner (ref: User)
  |- title (required)
  |- description
  |- goal
  |- donations (list - ref: Donations)

|- Donations
  |- donor (ref: User)
  |- amount (required)
  |- fundraiser (ref: Fundraiser)
  |- fundraiserOwner (ref: User)
```

### Routes

```
|- /
  |- /auth
    |- /register - POST - { email, password } => { token }
    |- /login - POST - { email, password } => { token }
    |- /logout - GET - AUTHENTICATED => { true }
    |- /validate - GET - AUTHENTICATED => { true }
  |- /fundraiser
    |- /all - GET => [ fundraisers ]
    |- /create - POST - AUTHENTICATED { title, description, goal } => { newFundraiser }
    |- /create-acct - POST - AUTHENTICATED { code (from stripe OAuth flow) } => { success }
  |- /donations
    |-/create - POST - AUTHENTICATED { token (from stripe Elements), donations } => { isDonor, donationsTotal, success }
```
