part of 'weather_cubit.dart';

@immutable
abstract class WeatherState {}

class WeatherInitial extends WeatherState {}

class WeatherLoading extends WeatherState {}

class WeatherLoaded extends WeatherState {
  final Map<String, dynamic> weather;
  WeatherLoaded(this.weather);
}

class WeatherError extends WeatherState {
  final String error;
  WeatherError(this.error);
}

