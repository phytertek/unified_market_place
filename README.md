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
  |- email (required) - UA
  |- password (required, hashed) -UA
  |- firstName - UA
  |- lastName - UA
  |- address - UA
    |- street
    |- city
    |- state
    |- postalCode
    |- country
  |- mobilePhone - UA
  |- fundraiserId (stripe)
  |- donorId (stripe)
  |- fundraisers (list - ref: Fundraisers)
  |- donations (list - ref: Donations)

|- Fundraiser
  |- owner (ref: User)
  |- title (required)
  |- description
  |- images (list),
  |- goal
  |- collected
  |- donations (list - ref: Donations)

|- Donations
  |- donor (ref: User - required)
  |- fundraiser (ref: Fundraiser - required)
  |- amount (required)
  |- currency (required)
  |- donationId (stripe)
```

### Routes

```
|- /
  |- /auth
    |- /register - POST - { email, password } => { token }
    |- /login - POST - { email, password } => { token }
    |- /logout - GET - AUTHENTICATED => { true }
    |- /verify - GET - AUTHENTICATED => { true }
  |- /user AUTHENTICATED
    |- /update - PUT - { UA fields } => { updatedUser }
    |- /:id - GET - OWNER => { user, user.fundraisers, user.donations }
  |- /fundraiser
    |- /all - GET => [ fundraisers ]
    |- /:id - GET => { fundraiser, fundraiser.donations}
    |- /create - POST - AUTHENTICATED { owner, title, description, goal, images } => { newFundraiser }
    |- /update - PUT - AUTHENTICATED / OWNER { All fields } => { updatedFundraiser }
    |- /delete - DELETE - AUTHENTICATED / OWNER => { true }
  |- /donations
    |-/create - POST - AUTHENTICATED { owner, fundraiser, amount, currency } => { newDonation }
```
