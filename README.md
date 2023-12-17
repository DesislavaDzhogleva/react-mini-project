## Introduction

This react project is a platform for Restaurants owners and their customers.  It facilitates efficient menu management, allowing restaurant owners to easily update and showcase their offerings in a user-friendly manner. Simultaneously, customers can explore these menus, place orders, and view their order history within a single, intuitive interface.

&nbsp;

## Key Features

**Restaurants**:
 - **Menu Management** - Restaurant owners can  manage their menus - add new, update and delete menu items. They can also take orders from customers. In addition to this, it has category management for the menu.


**Clients**:
 - **Restaurant picker** - Customers have the option to peruse various restaurants available within the system and make a selection based on their preference for placing an order.
 - **Order Placement** - Customers can browse restaurant menus, select items  and conveniently place orders through the system.
 - **Order History** - Customers have access to a detailed order history, allowing them to track their previous orders.
 
 
&nbsp;

## Installation and Build

1. Clone the repo and install dependencies with npm install
2. Start the client - open *client* folder in terminal -> npm start dev
3. Start the server - open *server* folder in terminal -> node ./server.js

&nbsp;

## Database

It uses *oftuni practice server*for saving the data and managing data. [*https://github.com/softuni-practice-server/softuni-practice-server*]
Data: 

- **users** - holds the users (both Clients and Restaurants)
- **restaurants** - holds the data about all the restaurants.
- **orders** - Holds all orders.
- **mealCategories** - Holds the categories that are going to be needed by the restaurants for defining their menu.
- **meals** - Holds all the meals for each restaurant.
- **cartItems** - Holds all the currently active cart items, so that user can access their cart from different devices.

!You can use predefined users:
 - Client: peter@abv.bg: 123456 
 - Restaurant: DessDzh@abv.bg: 123456 


&nbsp;

## Integrations

- For initial setup it is used **vite**. 
- The app uses different libraries and packages for its purposes like *react router dom*, *react dom*, *react bootstrap*, *bootstrap*, etc..
- It uses JavaScript



&nbsp;

