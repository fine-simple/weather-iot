class WeatherModel{
   int? temp;
   int? humidity;
   int? pressure;
   int? altitude;

    WeatherModel({
      this.temp,
      this.humidity,
      this.pressure,
      this.altitude,
    });

    factory WeatherModel.fromJson(Map<String, dynamic> json) {
      return WeatherModel(
        temp: json['temp'],
        humidity: json['humidity'],
        pressure: json['pressure'],
        altitude: json['altitude'],
      );
    }

    Map<String, dynamic> toJson() {
      final Map<String, dynamic> data = new Map<String, dynamic>();
      data['temp'] = temp;
      data['humidity'] = humidity;
      data['pressure'] = pressure;
      data['altitude'] = altitude;
      return data;
    }
}