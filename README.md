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


   ** and also it will direct you to the home page when register but logout and
     again login so that your token be saved and you can add your tasks 
     
**it has some features also that are going to be added but most of it are finished 
and it needs some improvement in the responsiveness too.
**You can login with this email : edl@gmail.com  and with this password: 123

## If the installation process is not working for you, please contact me at 0963152637 for further documentation.
