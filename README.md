Clone the Repository
   - Clone the project and navigate to the frontend directory:
     ```bash
     git clone https://github.com/Edlawit21/TODO_LIST_APP.git
     cd Frontend
     npm install
 Clone the Repository
   - Clone the project and navigate to the backend directory:
     ```bash
     git clone https://github.com/Edlawit21/TODO_LIST_APP.git
     cd Backend
     composer install
     cp .env.example .env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=todo_db
     DB_USERNAME=root
     DB_PASSWORD=your_password
      php artisan key:generate
          php artisan migrate --seed
     
     php artisan serve
     

