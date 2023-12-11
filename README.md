
# Build a REST API for an e-commerce marketplace.
You will be building a set of REST API endpoints that enable the following functionality
Buyers and sellers can register and login to the system,
Sellers can build a catalog of items, with each item having a name and price,
Buyers can GET a list of sellers,
Buyers can GET a specific seller's catalog (list of items),
Buyers can create an Order that contains a list of items from the seller's catalog,
Sellers can GET a list of all orders they've received


## Installation

Follow these steps to set up and run the project locally:

1. **Clone the Repository:**
2. **Install Dependencies:**
      npm install
3. **Configure Environment Variables::**(make config.env file and add)
* PORT=3000
* DBURI=mongodb://localhost:27017/e_commerce_db
* SECRETKEY=mysecretkey
* EXPIREC=1
* WEBLINK="http://localhost:5000" (if you hosted your frontend then write here your hosted url)
4. **Run the Application:** node app.js



## API Reference

#### Auth APIs
Register a user (accept username, password, type of user - buyer/seller)
```http
  POST/api/auth/register
```

Let a previously registered user log in (e.g. retrieve authentication token)
```http
  POST /api/auth/login
```

#### APIs for buyers

Get a list of all sellers
```http
 GET /api/buyer/list-of-sellers
```

Get the catalog of a seller by seller_id
```http
GET /api/buyer/seller-catalog/:seller_id
```

Send a list of items to create an order for seller with id = seller_id
```http
 POST /api/buyer/create-order/:seller_id
```



#### APIs for sellers

Send a list of items to create a catalog for a seller
```http
 POST /api/seller/create-catalog
```
Retrieve the list of orders received by a seller
```http
GET /api/seller/orders
```



