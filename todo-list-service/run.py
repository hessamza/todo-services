from flask import Flask

from app.routes import api_bp
from flask_mongoengine import MongoEngine

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://todo-service_mongodb_1:27017/todo_list_db'
}
db = MongoEngine(app)

# Register the blueprint with the application instance
app.register_blueprint(api_bp, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
