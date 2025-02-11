import 'dart:convert';
import 'dart:io';

import 'package:belajar_flutter/model/post.dart';
import 'package:belajar_flutter/model/post_action_response.dart';
import 'package:either_dart/either.dart';
import 'package:http/http.dart' as http;

class RemoteResource {
  final baseUrl = 'http://192.168.100.205:3000/api';

  Future<Either<String, List<Post>>> fetchPost() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/posts'));
      if (response.statusCode != 200) {
        return Left('Failed to fetch post');
      }

      final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
      final post = PostActionResponse.fromJson(jsonResponse);

      return Right(post.data ?? []);
    } catch (error) {
      return Left(error.toString());
    }
  }

  Future<Either<String, String>> createPost(
    File? image,
    String title,
    String content,
  ) async {
    try {
      final request =
          http.MultipartRequest('POST', Uri.parse('$baseUrl/posts'));
      request.fields['title'] = title;
      request.fields['content'] = content;

      if (image != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            'image',
            image.path,
          ),
        );
      }

      final req = await request.send();
      final response = await http.Response.fromStream(req);
      if (response.statusCode == 201) {
        final message = json.decode(response.body)['message'];
        return Right(message);
      } else {
        return Left('Failed to create post');
      }
    } catch (error) {
      return Left(error.toString());
    }
  }

  Future<Either<String, String>> updatePost(
    File? image,
    String title,
    String content,
    int id,
  ) async {
    try {
      final request =
          http.MultipartRequest('PUT', Uri.parse('$baseUrl/posts/$id'));
      request.fields['title'] = title;
      request.fields['content'] = content;

      if (image != null) {
        request.files.add(
          await http.MultipartFile.fromPath(
            'image',
            image.path,
          ),
        );
      }

      final req = await request.send();
      final response = await http.Response.fromStream(req);
      final message = json.decode(response.body)['message'];

      if (response.statusCode == 200) {
        return Right(message);
      } else if (response.statusCode == 422) {
        return Right(message);
      } else {
        throw Left('Failed to create post');
      }
    } catch (error) {
      return Left(error.toString());
    }
  }

  Future<Either<String, String>> deletePost(int id) async {
    try {
      final response = await http.delete(Uri.parse('$baseUrl/posts/$id'));
      if (response.statusCode != 200) {
        return Left('Failed delete post');
      }

      final Map<String, dynamic> jsonResponse = jsonDecode(response.body);
      final result = PostActionResponse.fromJson(jsonResponse);

      return Right(result.message ?? '');
    } catch (e) {
      return Left(e.toString());
    }
  }
}
