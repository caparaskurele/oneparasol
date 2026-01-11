---
title: "Working with APIs and the Requests Library"
description: "Fetch data from APIs and handle HTTP requests"
image: "/img/python-requests.png"
type: "article"
resources:
  - name: "Requests API Guide"
    link: "https://example.com/requests-guide.pdf"
    type: "pdf"
  - name: "API Projects Colab"
    link: "https://colab.research.google.com/drive/requests-notebook"
    type: "colab"
  - name: "REST API Tutorial"
    link: "https://youtube.com/watch?v=rest-api-python"
    type: "video"
---

## Making Requests

```python
import requests
import json

# GET request
response = requests.get('https://api.example.com/users')
print(response.status_code)  # 200 if success
print(response.json())       # Parse JSON response

# POST request
data = {
    'name': 'John',
    'email': 'john@example.com'
}
response = requests.post('https://api.example.com/users', json=data)
```

## Handling Responses

```python
response = requests.get('https://api.github.com/users/github')

# Check status
if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")

# Headers and content
print(response.headers)
print(response.text)        # Raw text
print(response.content)     # Bytes
```

## Query Parameters

```python
# Using parameters
params = {
    'q': 'python',
    'sort': 'stars'
}
response = requests.get('https://api.github.com/search/repositories', params=params)
```

## Common HTTP Methods

```python
# GET - Retrieve data
requests.get(url)

# POST - Create data
requests.post(url, json=data)

# PUT - Update data
requests.put(url, json=data)

# DELETE - Delete data
requests.delete(url)

# PATCH - Partial update
requests.patch(url, json=data)
```

## Error Handling

```python
try:
    response = requests.get('https://api.example.com/data', timeout=5)
    response.raise_for_status()  # Raise error for bad status
    data = response.json()
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")
```

## Real-World Example

```python
def get_weather(city):
    api_key = 'your_api_key'
    url = 'https://api.openweathermap.org/data/2.5/weather'
    
    params = {
        'q': city,
        'appid': api_key,
        'units': 'metric'
    }
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
        return {
            'temp': data['main']['temp'],
            'description': data['weather'][0]['description']
        }
    except Exception as e:
        print(f"Error fetching weather: {e}")
        return None
```
