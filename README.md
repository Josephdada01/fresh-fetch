# Fresh-Fetch

## Description
Welcome to Fresh Fetch! Fresh Fetch allows users to browse and purchase a variety of fresh vegetables.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)
6. [Contact](#contact)

## Features
- Basket functionality to add and manage items.
- Search functionality to find vegetables quickly.
- Detailed product pages with descriptions and images.
- Vendor accounts, buyers and vendors login system.
- Order tracking and history.

## Installation
### Prerequisites
- Node.js
- npm
- Python 3.x
- Django
- React
- React Testing Library
- MySQL
- Linux Environment

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/Josephdada01/fresh-fetch.git
    ```

2. In the base directory containing requirement.txt run - $ pip install -r requirement.txt

3. Setup
   cd into the backend directory containing database_setup.sql run:
   ```bash 
   $ mysql -u root -p < database_setup.sql
   ```

   if requested for password in the above step input your mysql password
   cd into the backend directory containing settings.py and create a .env file, copy and paste the following code into it.
   
   Copy this into the .env file created

   This is the environment variable

   ```bash
   SECRET_KEY=django-insecure-e+pou$ltl%m!qe6v@9ib2j^14t_4(4mmm)=fm+rd@sgo#xao

   DATABASE_NAME=fresh_fetch
   DATABASE_USER=root
   DATABASE_PASSWORD=your password
   DATABASE_HOST=localhost
   ```
4. Once the django server is running go into the frontend directory and into the fresh-fetch directory.
   
   ```bash
   npm install
   ```
   Then,
   ```bash
   npm start
   ``` 

## Usage
1. Visit `http://localhost:3000` in your web browser.
2. Use the search bar to find vegetables.
3. Add items to your basket and proceed to checkout.
4. Manage your account settings and view order history.

## Contributing
We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m 'Your commit message'
    ```
4. Push to the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License.

## Authors
This project was created with passion by:

Solomon Nweke
- Email: [solomonuche@gmail.com
- Github: [Solomonuche](https://github.com/Solomonuche)


Dada Ridwan Olamilekan
- Email : [ridwandada500@gmail.com]
- Github: [Josephdada01](https://github.com/Josephdada01)

Benoni Esckinder
- Email: [besckinder@gmail.com]
- Github: [Benonii](https://github.com/Benonii)

Brian Kibugi
- Email: [njugunabrian843@gmail.com]
- GitHub: [Kibugi1](https://github.com/Kibugi1)

