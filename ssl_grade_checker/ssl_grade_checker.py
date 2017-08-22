import requests

from flask import Flask, render_template, url_for, jsonify

from database import init_db, db_session, drop_all
from models import Domain

from datetime import datetime
init_db()
app = Flask(__name__)

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/domains/JSON')
def domains_JSON():
    domains = db_session.query(Domain).all()
    return jsonify(Domains=[i.serialize for i in domains])

@app.route('/domains/addtestdata', methods=['get'])
def add_test_domains():
    domains = []
    domains.append(Domain(
        domain_name='example_one.ru',
        grade='A+',
        last_updated=1491918400000,
        status='OK',
        active=True))
    domains.append(Domain(
        domain_name='example_two.ru',
        grade='F',
        last_updated=1491918400000,
        status='OK',
        active=True))
    domains.append(Domain(
        domain_name='example_three.ru',
        grade='B',
        last_updated=1491918400000,
        status='OK',
        active=True))
    domains.append(Domain(
        domain_name='example_disabled.ru',
        grade='A+',
        last_updated=1491918400000,
        status='OK',
        active=False))
    db_session.add_all(domains)
    db_session.commit()
    return "success"

@app.route('/domains/resetdata', methods=['get'])
def reset_domain_data():
    domains = db_session.query(Domain).all()
    for d in domains:
        db_session.delete(d)
    db_session.commit()
    drop_all()
    return "success"

@app.route('/checkSSL/<domain_name>')
def check_ssl(domain_name):
    r = requests.get('https://api.ssllabs.com/api/v2/analyze?host=%s' % domain_name)
    return jsonify(r.json())
