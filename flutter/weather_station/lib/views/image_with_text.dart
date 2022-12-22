import 'package:flutter/material.dart';

class ImageWithText extends StatelessWidget {
  ImageWithText({required this.description, this.imageName, Key? key}) : super(key: key);
  String? description;
  String? imageName;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Image.asset(
        imageName!,
        width: 70,
        height: 70,
        color: Colors.white,
            ),
            Text(
        description!,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 30,
          fontWeight: FontWeight.bold,
        ),
            ),
      ],
    );
  }
}
