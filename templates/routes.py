from flask import Flask, jsonify, render_template, request
import firebase_admin
from firebase_admin import credentials, firestore
import datetime
import random

# Initialize Firebase Admin SDK
cred = credentials.Certificate('C:\\Users\\omcha\\Desktop\\Vision IQ\\app\\visioniq-ram22-firebase-adminsdk-ujv6c-d262a1838f.json')

firebase_admin.initialize_app(cred)

# Initialize Firestore
db = firestore.client()

# Initialize Flask app
app = Flask(__name__)

# Routes
@app.route('/')
def home():
    return render_template('home.html')

@app.route('/catalog')
def catalog():
    return render_template('catalog.html')

@app.route('/predict')
def predict():
    return render_template('predict.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/history')
def history():
    return render_template('history.html')


# API Routes
# Fetch history data from Firebase Firestore
@app.route('/api/history')
def get_history_data():
    history_ref = db.collection('history_data')  # 'history_data' is the Firestore collection
    docs = history_ref.stream()
    data = []
    for doc in docs:
        record = doc.to_dict()
        data.append({
            'date': record.get('date'),
            'time': record.get('time'),
            'records': record.get('records'),
            'class': record.get('class'),
            'status': record.get('status'),
            'remaining': f"{record.get('remaining_days')} days"
        })
    return jsonify(data)


# Handle predictions and store results in Firebase
@app.route('/api/predict', methods=['POST'])
def handle_prediction():
    # Get data from the POST request
    data = request.json
    input_data = data.get('input_data', '')

    if not input_data:
        return jsonify({'error': 'No input data provided'}), 400

    # Simulate a prediction process
    predicted_class = random.choice(['Class A', 'Class B', 'Class C'])
    status = random.choice(['Active', 'Inactive', 'Pending'])
    remaining_days = random.randint(0, 10)

    # Log prediction to Firebase Firestore
    current_date = datetime.datetime.now().strftime('%Y-%m-%d')
    current_time = datetime.datetime.now().strftime('%H:%M:%S')

# Define collection name (you can change this dynamically if needed)
    collection_name = 'history_data'  # The name of your collection

    # Check if the collection exists by trying to add a document
    history_ref = db.collection(collection_name)
    history_ref.add({
        'date': current_date,
        'time': current_time,
        'records': input_data,
        'class': predicted_class,
        'status': status,
        'remaining_days': remaining_days
    })

    # Return prediction result
    return jsonify({
        'input_data': input_data,
        'predicted_class': predicted_class,
        'status': status,
        'remaining_days': remaining_days
    })


# Example of other APIs for data visualization (Firebase)
@app.route('/api/delivery_share')
def get_delivery_share():
    # Firestore query for delivery_share collection
    delivery_share_ref = db.collection('delivery_share')
    docs = delivery_share_ref.stream()
    data = [{'category': doc.id, 'percentage': doc.to_dict().get('percentage')} for doc in docs]
    return jsonify(data)


@app.route('/api/freshness_selling')
def get_freshness_selling():
    # Firestore query for freshness_selling collection
    freshness_selling_ref = db.collection('freshness_selling')
    docs = freshness_selling_ref.stream()
    data = [{'product': doc.id, 'sales': doc.to_dict().get('sales')} for doc in docs]
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

