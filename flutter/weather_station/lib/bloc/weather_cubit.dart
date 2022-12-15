import 'package:bloc/bloc.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:meta/meta.dart';
import 'package:weather_station/model/weather_model.dart';
import 'package:weather_station/services/dio_helper.dart';

part 'weather_state.dart';

class WeatherCubit extends Cubit<WeatherState> {
  static WeatherCubit get (context)=> BlocProvider.of(context);
  WeatherCubit() : super(WeatherInitial());
  Map<String,dynamic> weather = {};
  WeatherModel weatherModel = WeatherModel();

  getWeather(){
    emit(WeatherLoading());
    DioHelper.getData(
      url: "",
      query: {
      },
    ).then((value) {
      weather = value.data;
      weatherModel = WeatherModel.fromJson(weather);
      print(weather);
      emit(WeatherLoaded(weather));
    }).catchError((error){
      print(error.toString());
      emit(WeatherError(error.toString()));
    });
  }
}
