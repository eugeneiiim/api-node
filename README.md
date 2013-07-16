# Ordr.in Node Library

A node library for the ordr.in API.
See full API documentation at http://hackfood.ordr.in

## Table of Contents

 - [Installation](#installation)
 - [Usage](#usage)
   - [Initialization](#initialization)
   
   - [Order Endpoints](#order)
     - [Guest Order](#guest-order) (`order_guest`)
     - [User Order](#user-order) (`order_user`)
     
   - [Restaurant Endpoints](#restaurant)
     - [Delivery Check](#delivery-check) (`delivery_check`)
     - [Delivery List](#delivery-list) (`delivery_list`)
     - [Fee](#fee) (`fee`)
     - [Restaurant Details](#restaurant-details) (`restaurant_details`)
     
   - [User Endpoints](#user)
     - [Change Password](#change-password) (`change_password`)
     - [Create Account](#create-account) (`create_account`)
     - [Create Address](#create-address) (`create_addr`)
     - [Create Credit Card](#create-credit-card) (`create_cc`)
     - [Remove address](#remove-address) (`delete_addr`)
     - [Remove Credit Card](#remove-credit-card) (`delete_cc`)
     - [Get Account Information](#get-account-information) (`get_account_info`)
     - [Get All Saved Addresses](#get-all-saved-addresses) (`get_all_saved_addrs`)
     - [Get all saved credit cards](#get-all-saved-credit-cards) (`get_all_saved_ccs`)
     - [Get an Order](#get-an-order) (`get_order`)
     - [Get Order History](#get-order-history) (`get_order_history`)
     - [Get a single saved address](#get-a-single-saved-address) (`get_saved_addr`)
     - [Get a single saved credit card](#get-a-single-saved-credit-card) (`get_saved_cc`)
     

## Installation

This library can be installed with npm:

    npm install ordrin-api

## Usage


### Callbacks

Because node is async, every function call you make to the ordrin api includes a
callback. This callback will be called when the API has finished processing the
request. This callback takes two arguments, `error` and `data`. If the request
fails, then `error` will be an `Error` object; otherwise it will be falsy. The
`data` argument contains the JavaScript object returned by the API.

### Initialization

```js
var ordrin = require("ordrin-api");
var ordrin_api = new  ordrin.APIs(api_key, servers);
```

In the initializer, the second argument sets the servers that API requests will
be sent to, and must be set to either `ordrin.PRODUCTION` or `ordrin.TEST`
(defaults to `ordrin.TEST`).


### Order Endpoints ([API Reference](http://hackfood.ordr.in/docs/order))

#### Guest Order ([API Reference](http://hackfood.ordr.in/docs/order#order_guest))

    ordrin_api.order_guest(args, callback)

##### Arguments
- `args.rid` : Ordr.in's unique restaurant identifier for the restaurant.
- `args.em` : The customer's email address
- `args.tray` : Represents a tray of menu items in the format '[menu item id]/[qty],[option id],...,[option id]'
- `args.tip` : Tip amount in dollars and cents
- `args.first_name` : The customer's first name
- `args.last_name` : The customer's last name
- `args.phone` : The customer's phone number
- `args.zip` : The zip code part of the address
- `args.addr` : The street address
- `args.addr2` : The second part of the street address, if needed
- `args.city` : The city part of the address
- `args.state` : The state part of the address
- `args.card_name` : Full name as it appears on the credit card
- `args.card_number` : Credit card number
- `args.card_cvc` : 3 or 4 digit security code
- `args.card_expiry` : The credit card expiration date.
- `args.card_bill_addr` : The credit card's billing street address
- `args.card_bill_addr2` : The second part of the credit card's biling street address.
- `args.card_bill_city` : The credit card's billing city
- `args.card_bill_state` : The credit card's billing state
- `args.card_bill_zip` : The credit card's billing zip code
- `args.card_bill_phone` : The credit card's billing phone number


###### Either
- `args.delivery_date` : Delivery date
- `args.delivery_time` : Delivery time

###### Or
- `args.delivery_date` : Delivery date



#### User Order ([API Reference](http://hackfood.ordr.in/docs/order#order_user))

    ordrin_api.order_user(args, callback)

##### Arguments
- `args.rid` : Ordr.in's unique restaurant identifier for the restaurant.
- `args.tray` : Represents a tray of menu items in the format '[menu item id]/[qty],[option id],...,[option id]'
- `args.tip` : Tip amount in dollars and cents
- `args.first_name` : The customer's first name
- `args.last_name` : The customer's last name
- `args.email` : The user's email address
- `args.current_password` : The user's current password

###### Either
- `args.phone` : The customer's phone number
- `args.zip` : The zip code part of the address
- `args.addr` : The street address
- `args.addr2` : The second part of the street address, if needed
- `args.city` : The city part of the address
- `args.state` : The state part of the address

###### Or
- `args.nick` : The delivery location nickname. (From the user's addresses)



###### Either
- `args.card_name` : Full name as it appears on the credit card
- `args.card_number` : Credit card number
- `args.card_cvc` : 3 or 4 digit security code
- `args.card_expiry` : The credit card expiration date.
- `args.card_bill_addr` : The credit card's billing street address
- `args.card_bill_addr2` : The second part of the credit card's biling street address.
- `args.card_bill_city` : The credit card's billing city
- `args.card_bill_state` : The credit card's billing state
- `args.card_bill_zip` : The credit card's billing zip code
- `args.card_bill_phone` : The credit card's billing phone number

###### Or
- `args.card_nick` : The credit card nickname. (From the user's credit cards)



###### Either
- `args.delivery_date` : Delivery date
- `args.delivery_time` : Delivery time

###### Or
- `args.delivery_date` : Delivery date




### Restaurant Endpoints ([API Reference](http://hackfood.ordr.in/docs/restaurant))

#### Delivery Check ([API Reference](http://hackfood.ordr.in/docs/restaurant#delivery_check))

    ordrin_api.delivery_check(args, callback)

##### Arguments
- `args.datetime` : Delivery date and time
- `args.rid` : Ordr.in's unique restaurant identifier for the restaurant.
- `args.addr` : Delivery location street address
- `args.city` : Delivery location city
- `args.zip` : The zip code part of the address


#### Delivery List ([API Reference](http://hackfood.ordr.in/docs/restaurant#delivery_list))

    ordrin_api.delivery_list(args, callback)

##### Arguments
- `args.datetime` : Delivery date and time
- `args.addr` : Delivery location street address
- `args.city` : Delivery location city
- `args.zip` : The zip code part of the address


#### Fee ([API Reference](http://hackfood.ordr.in/docs/restaurant#fee))

    ordrin_api.fee(args, callback)

##### Arguments
- `args.datetime` : Delivery date and time
- `args.rid` : Ordr.in's unique restaurant identifier for the restaurant.
- `args.subtotal` : The cost of all items in the tray in dollars and cents.
- `args.tip` : The tip in dollars and cents.
- `args.addr` : Delivery location street address
- `args.city` : Delivery location city
- `args.zip` : The zip code part of the address


#### Restaurant Details ([API Reference](http://hackfood.ordr.in/docs/restaurant#restaurant_details))

    ordrin_api.restaurant_details(args, callback)

##### Arguments
- `args.rid` : Ordr.in's unique restaurant identifier for the restaurant.



### User Endpoints ([API Reference](http://hackfood.ordr.in/docs/user))

#### Change Password ([API Reference](http://hackfood.ordr.in/docs/user#change_password))

    ordrin_api.change_password(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.password` : The user's new password
- `args.current_password` : The user's current password

#### Create Account ([API Reference](http://hackfood.ordr.in/docs/user#create_account))

    ordrin_api.create_account(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.pw` : The user's password
- `args.first_name` : The user's first name
- `args.last_name` : The user's last name


#### Create Address ([API Reference](http://hackfood.ordr.in/docs/user#create_addr))

    ordrin_api.create_addr(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.nick` : The nickname of this address
- `args.phone` : The customer's phone number
- `args.zip` : The zip code part of the address
- `args.addr` : The street address
- `args.addr2` : The second part of the street address, if needed
- `args.city` : The city part of the address
- `args.state` : The state part of the address
- `args.current_password` : The user's current password

#### Create Credit Card ([API Reference](http://hackfood.ordr.in/docs/user#create_cc))

    ordrin_api.create_cc(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.nick` : The nickname of this address
- `args.card_number` : Credit card number
- `args.card_cvc` : 3 or 4 digit security code
- `args.card_expiry` : The credit card expiration date.
- `args.bill_addr` : The credit card's billing street address
- `args.bill_addr2` : The second part of the credit card's biling street address.
- `args.bill_city` : The credit card's billing city
- `args.bill_state` : The credit card's billing state
- `args.bill_zip` : The credit card's billing zip code
- `args.bill_phone` : The credit card's billing phone number
- `args.current_password` : The user's current password

#### Remove address ([API Reference](http://hackfood.ordr.in/docs/user#delete_addr))

    ordrin_api.delete_addr(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.nick` : The nickname of this address
- `args.current_password` : The user's current password

#### Remove Credit Card ([API Reference](http://hackfood.ordr.in/docs/user#delete_cc))

    ordrin_api.delete_cc(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.nick` : The nickname of this address
- `args.current_password` : The user's current password

#### Get Account Information ([API Reference](http://hackfood.ordr.in/docs/user#get_account_info))

    ordrin_api.get_account_info(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.current_password` : The user's current password

#### Get All Saved Addresses ([API Reference](http://hackfood.ordr.in/docs/user#get_all_saved_addrs))

    ordrin_api.get_all_saved_addrs(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.current_password` : The user's current password

#### Get all saved credit cards ([API Reference](http://hackfood.ordr.in/docs/user#get_all_saved_ccs))

    ordrin_api.get_all_saved_ccs(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.current_password` : The user's current password

#### Get an Order ([API Reference](http://hackfood.ordr.in/docs/user#get_order))

    ordrin_api.get_order(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.oid` : Ordr.in's unique order id number.
- `args.current_password` : The user's current password

#### Get Order History ([API Reference](http://hackfood.ordr.in/docs/user#get_order_history))

    ordrin_api.get_order_history(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.current_password` : The user's current password

#### Get a single saved address ([API Reference](http://hackfood.ordr.in/docs/user#get_saved_addr))

    ordrin_api.get_saved_addr(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.nick` : The nickname of this address
- `args.current_password` : The user's current password

#### Get a single saved credit card ([API Reference](http://hackfood.ordr.in/docs/user#get_saved_cc))

    ordrin_api.get_saved_cc(args, callback)

##### Arguments
- `args.email` : The user's email address
- `args.nick` : The nickname of this address
- `args.current_password` : The user's current password


