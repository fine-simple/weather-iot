import 'package:dio/dio.dart';

class DioHelper
{
  static Dio? dio;
  static init() {
    dio = Dio(
      BaseOptions(
        baseUrl: "",
        receiveDataWhenStatusError: true,
      ),
    );
  }

  static Future<Response> getData({
    required String url,
    required Map<String,dynamic> query,
  }) async {
    // return dummy data
    print("Returning ..");
    return Response(
      data: {
        "temp": 20,
        "humidity": 30,
        "pressure": 1,
        "altitude": 30,
      },
      statusCode: 200, requestOptions: RequestOptions(path: ""),
    );
    // return await dio!.get(url, queryParameters: query);
  }

}