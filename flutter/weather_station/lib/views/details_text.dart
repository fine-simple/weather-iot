import 'package:flutter/material.dart';

class DetailsText extends StatelessWidget {
  DetailsText({required this.description,required this.value, Key? key}) : super(key: key);
  String? description;
  String? value;

  @override
  Widget build(BuildContext context) {
    print(description!);
    return Row(
      children: [
        Padding(
          padding: EdgeInsets.only(left: 20),
          child: Text(
            "${description}: ",
            style: TextStyle(
              color: Colors.white,
              fontSize: 20,
            ),
          ),
        ),
        Text(
          "${value}",
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),

        ),
      ],
    );
  }
}
