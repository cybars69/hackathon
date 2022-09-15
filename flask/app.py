from flask import Flask, request
from model import Model

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    print(request.json)
    print("HE")
    return str(model.predict(request.json)), 200

if __name__ == "__main__":
    model = Model()
    app.run(debug=True)

