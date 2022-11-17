# inversify-template

## Getting Started

### Background
This application follows the Layered Architecture design pattern. For more information, see this article for Java: https://medium.com/java-vault/layered-architecture-b2f4ebe8d587

### Prerequisites
Docker Desktop for Mac, Linux, or Windows: https://www.docker.com/products/docker-desktop/

### Installing
Execute the following command to install dependencies
``` 
yarn install
```

#### Create config files 
Use development_sample.json​ and docker-compose-example.yml​ as templates to create your own **development.json​** and **docker-compose.yml**

### Running the app
Build and run the Docker containers configured in your docker-compose.yml file
```
yarn docker
```

#### Confirm the container is running
Visit http://localhost:8080/api
if you deployed the container to a different port, replace 8080 with the port you used

## Working with the example use-case
### Configuring the example use-case
Check out the customer-example branch
```
git checkout customer-example
```

Install dependencies
```
yarn 
```
### Migrate and seed the database
```
NODE_ENV=development yarn migrate
NODE_ENV=development yarn seed
```
Visit http://localhost:8080/api/customers to confirm there is seeded data

### Run the tests
```
yarn test
```