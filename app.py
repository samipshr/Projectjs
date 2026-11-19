from flask import Flask, request, Response, send_from_directory
# to locate where the application lives
app = Flask(__name__)


@app.route('/')
def home():
    return send_from_directory('static', 'index.html')


# start the sever
if __name__ == '__main__': 
    app.run(host= '127.0.0.1', port= 3000, use_reloader = True)

