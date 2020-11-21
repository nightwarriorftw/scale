<p align="center">
<img src="./urban/public/scale.png" width="50px" height="50px">
</p>

[![Open Issues](https://img.shields.io/github/issues/nightwarriorftw/scale?style=for-the-badge&logo=github)](https://github.com/nightwarriorftw/scale/issues) [![Forks](https://img.shields.io/github/forks/nightwarriorftw/scale?style=for-the-badge&logo=github)](https://github.com/nightwarriorftw/scale/network/members) [![Stars](https://img.shields.io/github/stars/nightwarriorftw/scale?style=for-the-badge&logo=reverbnation)](https://github.com/nightwarriorftw/scale/stargazers) ![Maintained](https://img.shields.io/maintenance/yes/2020?style=for-the-badge&logo=github) ![Made with Python](https://img.shields.io/badge/Made%20with-Python-blueviolet?style=for-the-badge&logo=python) [![ForTheBadge uses-js](http://ForTheBadge.com/images/badges/uses-js.svg)](http://ForTheBadge.com) ![Open Source Love](https://img.shields.io/badge/Open%20Source-%E2%99%A5-red?style=for-the-badge&logo=open-source-initiative) ![Built with Love](https://img.shields.io/badge/Built%20With-%E2%99%A5-critical?style=for-the-badge&logo=ko-fi) [![Follow Me](https://img.shields.io/twitter/follow/nightwarriorftw?color=blue&label=Follow%20%40nightwarriorftw&logo=twitter&style=for-the-badge)](https://twitter.com/intent/follow?screen_name=nightwarriorftw) [![Telegram](https://img.shields.io/badge/Telegram-Chat-informational?style=for-the-badge&logo=telegram)](https://telegram.me/nightwarriorftw)

## :ledger: Index

- [About](#beginner-about)
- [Usage](#zap-usage)
  - [Commands](#package-commands)
- [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [Developmen Environment](#nut_and_bolt-development-environment)
  - [File Structure](#file_folder-file-structure)
- [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
  - [Branches](#cactus-branches)
  - [Guideline](#exclamation-guideline)
- [Gallery](#camera-gallery)
- [Credit/Acknowledgment](#star2-creditacknowledgment)
- [License](#lock-license)

## :beginner: About

A WebApp built using **React** and **Django**, where admins can create interviews by selecting participants, interview start time and end time.

## :zap: Usage

- An interview creation page where the admin can create an interview by selecting participants, start time, and end time. Backend should throw an error with a proper error message if:
  - Any of the participants is not available during the scheduled time (i.e, has another interview scheduled)
  - No of participants is less than 2
- An interview list page where admin can see all the upcoming interviews.
- An interview edit page where admin can edit the created interview with the same validations as on the creation pag

## :wrench: Development

### :notebook: Pre-Requisites

Knowledge of React and Django

### :nut_and_bolt: Development Environment

- Backend

#### 1. Make a virtual environment

```
python3 -m venv virtual
source ./virtual/bin/activate
```

#### 2. Clone the repo and install requirements

```
git clone https://github.com/nightwarriorftw/scale.git
pip install -r requirements.txt
cd scale/scale
```

#### 3. Makemigrations, migrate and run the server

```
python manage.py makemigrations
python manage.py migrate
python manage.oy runserver
```

#### 4. Install RabbitMQ

```
sudo apt-get install rabbitmq-server`
sudo rabbitmqctl add_user myuser mypassword
sudo rabbitmqctl set_permissions -p / myuser ".*" ".*" ".*"
```

- Update celery configuration in settings.py

```
Add celery configuration in settings.py

    import djcelery
    djcelery.setup_loader()
    BROKER_URL = 'amqp://myuser:mypassword@127.0.0.1:5672//'
    CELERY_ACCEPT_CONTENT = ['json']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_IMPORTS = ('api.tasks',)
```

#### 4. Celery and Cronjob

Open another 2 terminals and run the following command respectivley in both of them

```
celery -A scale worker -l info
celery -A scale beat -l info
```

- frontend

#### Move to the urban folder and install requirements

```
npm install
```

#### Run the server

```
npm start
```

## :camera: Gallery

Pictures of project.

## :star2: Credit/Acknowledgment

Credits goes to me and other contributors

## :lock: License

[LICENSE](/LICENSE)
