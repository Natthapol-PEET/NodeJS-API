import requests

url = 'http://localhost:3000/api/movies'

myobj = {
        "name": "Social Network",
        "type": "moive",
        "isPublished": False
}

x = requests.post(url, data = myobj)

print(x.text)