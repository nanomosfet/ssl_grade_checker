# SSL Grade Checker with admin
Made with Python's Flask Framework
### Instructions for setting this file up

*Recommend using [virtualenv](https://virtualenv.pypa.io)*

1. Clone or download source
```
$ git clone https://github.com/nanomosfet/ssl_grade_checker.git
```
2. Install app from root of directory. That is, where setup.py is located.
```
$ pip install --editable .
```
3. Instruct flask to use the correct app
```
$ export FLASK_APP=ssl_grade_checker
```
4. Set up your Database

* Export your SQLAlchemy database URI and Cloud Storage Bucket environment variables:
```
$ export SQLALCHEMY_DATABASE_URI=postgresql+psycopg2://[USER]:[PASSWORD]@/[DATABASE]?host=/cloudsql/[INSTANCE NAME]
$ export CLOUD_STORAGE_BUCKET=[BUCKET NAME]
```

5. Now you can run the server
```
flask run
```
