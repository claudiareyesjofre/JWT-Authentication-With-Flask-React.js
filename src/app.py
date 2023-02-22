"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

jwt = JWTManager(app)
# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

@app.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    if "email" not in body:
        return {"msg":"falta ingresar tu email",
                "token":"",
                "status": 400}
    elif "password" not in body:
        return {"msg":"falta tu password",
                "token":"",
                "status": 400}
    else:
        user = User.query.filter_by(
        email=body['email'], password=body['password']).first()

    if (user):

        expira = datetime.timedelta(minutes=4320)
        access = create_access_token(identity=user.serialize(), expires_delta=expira)
        data = {
            "msg": "logeado",
            "token": access,
            "status": 200,
        }
        return jsonify(data),200

    else:
        return {"msg": "datos invalidos",
                "token":"",
                "status": 404}


@app.route('/signup', methods=['POST'])
def sign_up():
    body = request.get_json()
    if "email" not in body:
        return jsonify({"msg":"Falta ingresar tu email",
                        "token":"",
                        "status": 400})
    elif "password" not in body:
        return jsonify({"msg":"Falta ingresar tu password",
                        "token":"",
                        "status": 400})
    else:
        userdb = User.query.filter_by(email=body['email']).first()
        if (userdb):
            return jsonify({"msg": "El usuario ya existe",
                            "token": "",
                            "status": 400})
        usermail = User.query.filter_by( email=body['email']).first()
        if(usermail):
         return {"msg": "email ya registrado",
                    "token": "",
                    "status":400}
        
        user = User()            
        user.email = body["email"]
        user.password = body["password"]          
        db.session.add(user)
        db.session.commit()

        expira = datetime.timedelta(minutes=4320)
        access = create_access_token(identity=user.id, expires_delta=expira)

        expira = datetime.timedelta(minutes=4320)
        access = create_access_token(identity=user.serialize(), expires_delta=expira)

        return jsonify({"msg": "Usuario registrado",
                        "token": access,
                        "status":200
                        })

@app.route('/token', methods=['POST'])
@jwt_required()
def token_validation():
    
    return jsonify({
        "msg":"token valido"
    })

@app.route('/user', methods=['POST'])
@jwt_required()
def get_user():
     body = request.get_json()
     all = User.query.filter_by( rol=body['rol'])
    
     all = list(map(lambda user: user.serialize(), all))

     return jsonify({
         "user": all
     }), 200


@app.route('/signup', methods=['GET'])
def get_user_register():

    all_Register = User.query.all()

    all_Register = list(
        map(lambda register: register.serialize(), all_Register))

    return jsonify({
        "user": all_Register
    }), 200



# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
