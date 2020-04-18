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
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URL")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.app_context().push()
db.init_app(app)
db.create_all()

# @app.route("/")
# def index():
#     return "Project 1: TODO"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/signup", methods = ["GET","POST"])
def signup():
    if request.method == "POST":
        session["data"] = []
        data = request.form
        first_name = data.get("fname")
        last_name = data.get("lname")
        email_id= data.get("email")
        password = data.get("password")
        session["data"].append(first_name)
        session["data"].append(last_name)
        session["data"].append(email_id)
        session["data"].append(password)
        u = Users(first_name, last_name, email_id, password,)
        try:
            db.session.add(u)
        except:
            return render_template("signup.html", details = [first_name, email_id,"Failed to registered."])
        db.session.commit()
        return render_template("signup.html", details = [first_name, email_id, "Successfully Registered."])
    else:
        return render_template("signup.html", details = 0)

@app.route("/admin")
def admin():
    users = Users.query.all()
    return render_template("admin.html",details = users)

@app.route("/signin", methods = ["GET", "POST"])
def signin():
    if request.method == "POST":
        session["data1"] = []
        email = request.form.get("email")
        password = request.form.get("password")
        user = Users.query.get(email)
        first_name = user.first_name
        last_name = user.last_name
        session["data1"].append(email)
        session["data1"].append(first_name)
        session["data1"].append(last_name)
        if((email == user.email_id) and (password == user.password)):
            return render_template("layout.html", details = [first_name, last_name, email])
        else:
            return render_template("signin.html",details = 1)

    else:
        return render_template("signin.html", details = 0)

@app.route("/logout",methods = ["POST","GET"])
def logout():
    session.clear()
    return render_template("signin.html",details = 0)
