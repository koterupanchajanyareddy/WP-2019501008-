import os

from flask import Flask, session, render_template, request
from flask_session import Session
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from models import *

app = Flask(__name__)

# Check for environment variable
if not os.getenv("DATABASE_URL"):
    raise RuntimeError("DATABASE_URL is not set")

# Configure session to use filesystem
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Set up database
# engine = create_engine(os.getenv("DATABASE_URL"))
# db = scoped_session(sessionmaker(bind=engine))
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenc("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.app_context().push()
db.init_app(app)
db.create_all(app)

# @app.route("/")
# def index():
#     return "Project 1: TODO"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sign_up", methods = ["GET","POST"])
def signup():
    if request.method == "POST":
        data = request.form
        first_name = data.get("first_name")
        last_name = data.get("email_id")
        password = data.get("password")
        u = Users(first_name, last_name, email_id, password)
        try:
            db.session.add(u)
        except:
            return render_template("signup.html", details = [username, email,"Failed to registered."])
        db.session.commit()
        return render_template("signup.html", details = [username, email, "Successfully Registered."])
    else:
        return render_template("signup.html", details = 0)

@app.route("/admin")
def admin():
    users = Users.query.all()
    return render_template("admin.html",details = users)
