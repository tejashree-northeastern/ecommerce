
# E-Commerce Platform

This project is an E-Commerce Platform built using Spring Boot for the backend and React for the frontend. It provides functionalities for user management, product management, order processing, and cart management.

## Table of Contents

- [E-Commerce Platform](#e-commerce-platform)
  - [Table of Contents](#table-of-contents)
  - Features
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - Prerequisites
    - Installation
    - [Running the Application](#running-the-application)
  - [Environment Variables](#environment-variables)
  - [Backend Endpoints](#backend-endpoints)
  - [Frontend Routes](#frontend-routes)
  - [Backend Design Patterns](#backend-design-patterns)
  - [Technologies Used](#technologies-used)
  - Contributing
  - License

## Features

- User authentication and authorization
- Product management (create, update, delete, view)
- Order management (create, update, view)
- Cart management (add, remove items)
- Checkout process
- Admin dashboard for managing products and orders

## Project Structure

```
.DS_Store
.mvn/
  wrapper/
    maven-wrapper.jar
    maven-wrapper.properties
    MavenWrapperDownloader.java
E-Commerce-Platform/
  .gitignore
  .mvn/
    wrapper/
  Dockerfile
  mvnw
  mvnw.cmd
  pom.xml
  src/
    main/
    test/
  target/
    classes/
    ...
ecommerce/
  frontend/
frontend/
  .gitignore
  build/
    ...
  package.json
  postcss.config.js
  public/
  README.md
  src/
  tailwind.config.js
mvnw
mvnw.cmd
pom.xml
README.md
render.yaml
target/
  classes/
  generated-sources/
  generated-test-sources/
  test-classes/
```

## Getting Started

### Prerequisites

- Java 17
- Node.js (v14 or later)
- npm (v6 or later)
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-username/e-commerce-platform.git
cd e-commerce-platform
```

2. Install backend dependencies:

```sh
cd E-Commerce-Platform
./mvnw clean install
```

3. Install frontend dependencies:

```sh
cd frontend
npm install
```

### Running the Application

1. Start the backend server:

```sh
cd E-Commerce-Platform
./mvnw spring-boot:run
```

2. Start the frontend development server:

```sh
cd frontend
npm start
```

3. Open your browser and navigate to `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the 

frontend

 directory and add the following environment variables:

```env
REACT_APP_API_BASE_URL=http://localhost:8080
```

## Backend Endpoints

### UserController

- `GET /v1/user/getAll` - Get all users
- `GET /v1/user/{id}` - Get user by ID
- `PUT /v1/user/{id}` - Update user by ID
- `DELETE /v1/user/{id}` - Delete user by ID
- `POST /v1/user/create` - Create a new user
- `POST /v1/user/login` - User login

### ProductController

- `GET /v1/products` - Get all products
- `GET /v1/products/{id}` - Get product by ID
- `POST /v1/products` - Create a new product
- `PUT /v1/products/{id}` - Update product by ID
- `DELETE /v1/products/{id}` - Delete product by ID

### OrderController

- `GET /v1/orders` - Get all orders
- `POST /v1/orders/place` - Place a new order
- `GET /v1/orders/{id}` - Get order by ID
- `POST /v1/orders/next/{id}` - Move order to next state
- `POST /v1/orders/prev/{id}` - Move order to previous state

### CartController

- `GET /v1/cart` - Get all cart items
- `POST /v1/cart/add` - Add item to cart
- `POST /v1/cart/add/{productId}` - Add item to cart by product ID
- `DELETE /v1/cart/remove` - Remove item from cart
- `DELETE /v1/cart/remove/{productId}` - Remove item from cart by product ID

### CheckoutController

- `GET /v1/checkout` - Complete checkout

## Frontend Routes

### Public Routes

- `/` - Login
- `/admin-login` - Admin login
- `/add-employee` - Create user

### Protected Routes (requires authentication)

- 

home

 - Home
- `/cart` - Cart
- `/shopping` - Product list
- `/checkout` - Checkout
- `/admin` - Admin dashboard
- `/create-product` - Create product
- `/remove-product` - Remove product
- `/orders` - Orders management

## Backend Design Patterns

### 1. **Controller Pattern**
   - Used to handle HTTP requests and map them to appropriate service methods.
   - Example: `UserController`, `ProductController`, `OrderController`, `CartController`, `CheckoutController`.

### 2. **Service Pattern**
   - Encapsulates business logic and interacts with repositories.
   - Example: `UserService`, `ProductService`, `OrderService`, `CartService`.

### 3. **Repository Pattern**
   - Provides an abstraction layer over data access logic.
   - Example: `UserRepository`, `ProductRepository`, `OrderRepository`, `CartRepository`.

### 4. **DTO (Data Transfer Object) Pattern**
   - Used to transfer data between layers, especially between the client and server.
   - Example: `UserDTO`, `ProductDTO`, `OrderDTO`.

### 5. **Factory Pattern**
   - Used to create objects without specifying the exact class of object that will be created.
   - Example: `OrderFactory` to create different types of orders.

### 6. **Singleton Pattern**
   - Ensures a class has only one instance and provides a global point of access to it.
   - Example: `ApplicationConfig` for configuration settings.

### 7. **Strategy Pattern**
   - Defines a family of algorithms, encapsulates each one, and makes them interchangeable.
   - Example: `PaymentStrategy` for different payment methods.

## Technologies Used

- **Backend**: Spring Boot, Hibernate, PostgreSQL
- **Frontend**: React, Material-UI, React Router
- **Build Tools**: Maven, Docker
- **Other**: Tailwind CSS, Axios

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
