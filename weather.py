import requests


API_key="350e4384adf78c2ad64e4d24ea80ebdc"
city_name=input("enter the city:")
url=f"https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_key}&units=metric"



response=requests.get(url)
data=response.json()
if data.get("cod")==200:
    print("city is : ", data["name"])
    print("current temperature is : ",data["main"]["temp"],"°c")
    print("humidity is : ",data["main"]["humidity"])
    print("current weather is: ",data["weather"][0]["description"])
else:
    print("error: city not found / wrong api key")
    print(response.json())