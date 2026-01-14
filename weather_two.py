import requests
import pandas as pd
import matplotlib.pyplot as plt

API_key = "350e4384adf78c2ad64e4d24ea80ebdc"
city_name = input("Enter the city: ")

# --------- 1) Current Weather API ----------
url_current = f"https://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={API_key}&units=metric"
response = requests.get(url_current)
data = response.json()

if data.get("cod") != 200:
    print("Error: City not found / Wrong API key")
    print(data)
    exit()

print("\n------ Current Weather -------")
print("City:", data["name"])
print("Temperature:", data["main"]["temp"], "°C")
print("Humidity:", data["main"]["humidity"])
print("Weather:", data["weather"][0]["description"])

# --------- 2) 5-Day Forecast API ----------
url_forecast = f"https://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={API_key}&units=metric"
forecast_response = requests.get(url_forecast).json()

forecast_list = forecast_response["list"]

# --------- 3) Convert to DataFrame ----------
times = []
temps = []
humidity = []

for item in forecast_list:
    times.append(item["dt_txt"])
    temps.append(item["main"]["temp"])
    humidity.append(item["main"]["humidity"])

df = pd.DataFrame({
    "Time": times,
    "Temperature": temps,
    "Humidity": humidity
})

# Convert Time column to datetime
df["Time"] = pd.to_datetime(df["Time"])

print("\n------ Forecast Data Loaded Successfully ------")

# --------- 4) Visualization: Temperature Trend ----------
plt.figure(figsize=(12,5))
plt.plot(df["Time"], df["Temperature"])
plt.xticks(rotation=45)
plt.title(f"Temperature Trend for Next 5 Days in {city_name}")
plt.xlabel("Date & Time")
plt.ylabel("Temperature (°C)")
plt.tight_layout()
plt.show()

# --------- 5) Visualization: Humidity Trend ----------
plt.figure(figsize=(12,5))
plt.bar(df["Time"], df["Humidity"])
plt.xticks(rotation=45)
plt.title(f"Humidity Trend for Next 5 Days in {city_name}")
plt.xlabel("Date & Time")
plt.ylabel("Humidity (%)")
plt.tight_layout()
plt.show()

