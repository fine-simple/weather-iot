import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../bloc/weather_cubit.dart';
import 'details_text.dart';

class HomeView extends StatefulWidget {

  HomeView({Key? key}) : super(key: key);

  @override
  State<HomeView> createState() => _HomeViewState();
}

class _HomeViewState extends State<HomeView> {
  String background = "assets/cloudy.jpeg";

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => WeatherCubit()..getWeather(),
      child: BlocConsumer<WeatherCubit,WeatherState>(builder: (context, state)
      {
        var weatherCubit = WeatherCubit.get(context);
        if(state is WeatherInitial)
          return const Center(child: Text("Initial State"),);
        else if(state is WeatherLoading)
          return const Center(child: CircularProgressIndicator(),);
        else if(state is WeatherLoaded) {
          print (weatherCubit.weatherModel.temp);
          return Scaffold(
            body: AnimatedSwitcher(
              duration: const Duration(seconds: 1),
              child: Container(
                key: ValueKey(background),
                decoration: BoxDecoration(
                  image: DecorationImage(
                    image: AssetImage(background),
                    fit: BoxFit.cover,
                  ),
                ),
                child: BackdropFilter(
                  filter: ImageFilter.blur(sigmaX: 5, sigmaY: 5),
                  child: Center(
                    child: Card(
                      color: Colors.black.withOpacity(0.5),
                      elevation: 10,
                      child: Container(
                        width: MediaQuery.of(context).size.width * 0.8,
                        height: MediaQuery.of(context).size.height * 0.65,
                        child: Column(
                          children: [
                            const Padding(
                            padding: EdgeInsets.only(top: 20),
                            child: Text(
                              "Weather Details",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 30,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(top: 20),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Image.asset(
                                  "assets/thermometer.png",
                                  width: 70,
                                  height: 70,
                                  color: Colors.white,
                                ),
                                Text(
                                  "${weatherCubit.weatherModel.temp}°C",
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 30,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                // add the Humidity Icon
                                const SizedBox( height: 20,),
                                Image.asset(
                                  "assets/humidity.png",
                                  width: 70,
                                  height: 70,
                                  color: Colors.white,
                                ),
                                Text(
                                  "${weatherCubit.weatherModel.humidity}%",
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 30,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                // add the pressure Icon
                                const SizedBox( height: 20,),
                                Image.asset(
                                  "assets/pressure.png",
                                  width: 70,
                                  height: 70,
                                  color: Colors.white,
                                ),
                                Text(
                                  "${weatherCubit.weatherModel.pressure}hPa",
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 30,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                // add the altitude Icon
                                const SizedBox( height: 20,),
                                Image.asset(
                                  "assets/altitude.png",
                                  width: 70,
                                  height: 70,
                                  color: Colors.white,
                                ),
                                Text(
                                  "${weatherCubit.weatherModel.altitude}m",
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 30,
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                              ],
                            ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            floatingActionButton: FloatingActionButton(
              // make it transparent
              backgroundColor: Colors.transparent,
              hoverColor: Colors.transparent,
              splashColor: Colors.transparent,
              focusColor: Colors.transparent,
              foregroundColor: Colors.white,
              elevation: 0,
              onPressed: () {
                weatherCubit.getWeather();
                if (background == "assets/cloudy.jpeg")
                  background = "assets/sunny.jpg";
                else
                  background = "assets/cloudy.jpeg";
              },
              child: const Icon(
                  Icons.refresh,
                size: 40,

              ),
            ),


          );
        } else
          return const Center(child: Text("Error State"),);
      },

      listener: (context, state) {}
      ),
    );
  }
}
