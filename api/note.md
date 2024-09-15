1. Install JWT to make our code more secured, this is used to verify users and provide them with a token after login process.

2. Import the jsonwebtoken using require

3. create a variable for `access_token`
4. Create JWT_SEC in your env file
5. Now we will update user so we can understand why we need access token by going to the user route
6. But we need to create a middleware that verifies the web token. so we create verifytoken & verifytoken alternates functions.
7. Then we import the the alternates where needed middle ware in the user route

Set up for more than one word query for getting all cars

Check to ensure we do the delete `cart?` if needed
