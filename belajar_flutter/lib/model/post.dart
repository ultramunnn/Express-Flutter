import 'dart:convert';

class Post {
  final int? id;
  final String? image;
  final String? title;
  final String? content;

  Post({
    this.id,
    this.image,
    this.title,
    this.content,
  });

  factory Post.fromRawJson(String str) => Post.fromJson(json.decode(str));

  String toRawJson() => json.encode(toJson());

  factory Post.fromJson(Map<String, dynamic> json) => Post(
        id: json["id"],
        image: json["image"],
        title: json["title"],
        content: json["content"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "image": image,
        "title": title,
        "content": content,
      };
}

