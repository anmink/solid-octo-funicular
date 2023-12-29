from flask import Flask, request, jsonify
from rembg import remove

app = Flask(__name__)

print('hi')

def remove_background(image):
    input_path = image
    output_path = '/Users/anne/Desktop/Ordner/Code/dressflow/images'
    with open(input_path, 'rb') as i:
      input = i.read()
      output = remove(input)
      output.save(output_path)
    print("done")

@app.route('/remove', methods=['POST'])
def image_processing():
  try:
    parameter_value = request.json.get('path')
    remove_background(parameter_value)
    print('worked')
    return ('result')
  except Exception as e:
    return jsonify({'error': str(e)})
  
if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=8080)