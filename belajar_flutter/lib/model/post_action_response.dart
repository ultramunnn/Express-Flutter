import 'dart:convert';
import 'package:belajar_flutter/model/post.dart';

class PostActionResponse {
  final bool? success;
  final String? message;
  final List<Post>? data;

  PostActionResponse({
    this.success,
    this.message,
    this.data,
  });

  factory PostActionResponse.fromRawJson(String str) =>
      PostActionResponse.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory PostActionResponse.fromJson(Map<String, dynamic> json) =>
      PostActionResponse(
        success: json["success"],
        message: json["message"],
        data: json["data"] == null
            ? []
            : List<Post>.from(json["data"]!.map((x) => Post.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "success": success,
        "message": message,
        "data": data == null
            ? []
            : List<dynamic>.from(data!.map((x) => x.toJson())),
      };
}

