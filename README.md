
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
