# scale - interview scheduler


## Backend


#### Make a virtual environment
```
python3 -m venv virtual
source ./virtual/bin/activate
```

#### Clone the repo and install requirements
```
git clone https://github.com/nightwarriorftw/scale.git
pip install -r requirements.txt
cd scale/scale
```

#### Makemigrations, migrate and run the server
```
python manage.py makemigrations
python manage.py migrate
python manage.oy runserver
```

#### Celery and Cronjob
Open another 2 terminals and run the following command respectivley in both of them
```
celery -A scale worker -l info
celery -A scale beat -l info
```

## Frontend

#### Move to the urban folder and install requirements
```
npm install 
```

#### Run the server
```
npm start
```
