import 'dart:io';

import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:belajar_flutter/model/post.dart';
import 'package:belajar_flutter/rescource/remote_resource.dart';

part 'post_state.dart';

class PostCubit extends Cubit<PostState> {
  PostCubit() : super(PostInitial());

  void fetchPost() async {
    emit(PostLoading());
    try {
      final result = await RemoteResource().fetchPost();
      result.fold(
        (error) => emit(PostError(message: error)),
        (posts) => emit(PostLoaded(posts: posts)),
      );
    } catch (error) {
      emit(PostError(message: error.toString()));
    }
  }

  void createPost({
    required String title,
    required String content,
    required File image,
  }) async {
    emit(PostLoading());
    try {
      final result = await RemoteResource().createPost(image, title, content);
      result.fold(
        (error) => emit(PostError(message: error)),
        (response) => emit(PostCreated(message: response)),
      );
    } catch (error) {
      emit(PostError(message: error.toString()));
    }
  }

  void deletePost(int id) async {
    emit(PostLoading());
    try {
      final result = await RemoteResource().deletePost(id);
      result.fold(
        (error) => emit(PostError(message: error)),
        (response) => emit(PostDeleted(message: response)),
      );
    } catch (error) {
      emit(
        PostError(message: error.toString()),
      );
    }
  }

  void updatePost({
    required int id,
    required String content,
    required String title,
    required File? image,
  }) async {
    emit(PostLoading());
    try {
      final result =
          await RemoteResource().updatePost(image, title, content, id);
      result.fold(
        (error) => emit(PostError(message: error)),
        (response) => emit(PostUpdated(message: response)),
      );
    } catch (error) {
      emit(PostError(message: error.toString()));
    }
  }
}
