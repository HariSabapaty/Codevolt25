from flask import render_template, request, Blueprint,redirect,url_for
from EVConnect.models import *
main = Blueprint('main', __name__)



@main.route('/', methods=['GET', 'POST'])
def home():
    return "hi";
