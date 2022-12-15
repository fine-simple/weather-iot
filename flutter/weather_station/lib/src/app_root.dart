import 'package:flutter/material.dart';
import 'package:weather_station/views/home_view.dart';

class AppRoot extends StatelessWidget {
  const AppRoot({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      // darkTheme: ThemeData(
      //   scaffoldBackgroundColor: Colors.black,
      //   primaryColor: Colors.white,
      //   textTheme: Theme.of(context).textTheme.apply(
      //         bodyColor: Colors.white,
      //         displayColor: Colors.white,
      //       ),
      // ),
      // themeMode: ThemeMode.dark,
      home: HomeView(),
    );
  }
}
