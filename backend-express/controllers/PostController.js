//import prisma client
const { validationResult } = require("express-validator");

// import validationResult from express-validator
const prisma = require("../prisma/client");

//Import fs
const fs = require('fs');

//Import path
const path = require('path');


//Function findPosts
const findPost = async (req, res) => {
    try {

        //get all posts from database 
        const posts = await prisma.post.findMany({
            select: {
                 id: true,
                 image: true,
                 title: true,
                 content: true,
            },
            orderBy: {
                id: 'desc',
            }
        });

        //send respoonse
        res.status(200).send({
            success: true,
            message: 'Get all posts succesfully',
            data: posts,
        });
    } catch(error){
        res.status(500).send({
            success: false,
            message: "Internal server error",
        });
    }
};

//function createPost
const createPost = async (req, res) => {

    //Periksa hasil validasi
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        //Jika ada error, kembalikan error ke pengguna
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            erorrs: errors.array(),
        });
    }

    try{

        //insert data
        const post = await prisma.post.create({
            data: {
                image: req.file.filename,
                title: req.body.title,
                content: req.body.content,
            },
        });
        
        res.status(201).send({
            success: true,
            message: 'Post created successfully',
            data: post,
        });

    }catch(error){
        res.status(500).send({
            success:false,
            message: 'Internal server error',
        });

    }
}

//function findPostById
const findPostById = async(req,res) => {

    //const ID from params
    const { id } = req.params;

    try { 
        //get post by ID
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                image: true,
                title: true,
                content: true,
            }
        });

        //Send repsonse
        res.status(200).send({
            success: true,
            message: `Get post By ID :${id}`,
            data: post,
        });

    }catch(error){
        res.status(500).send({
            success: false,
            message: 'Internal server error',
        });

    }
}

//function updatePost

const updatePost = async (req, res) => {
    
    //get ID hasil validasi
    const { id } = req.params;

    //periksa hasil validasi
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        //jika ada erorr, kembalikan ke pengguna 
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: errors.array(),
        });
    }

    try {
        //init data
        const dataPost = {
            title : req.body.title,
            content: req.body.content,
            updateAt: new Date(),
        }

        if(req.file){
            //assign image to dataPost
            dataPost.image = req.file.filename;

            //get post by ID
            const post = await prisma.post.findUnique({
                where: {
                    id: Number(id),
                },
            });

            if (post && post.image) { 
                //bangun path ke file lama 
                const oldImagepath = path.join(process.cwd(), 'uploads', post.image);
    
                //Hapus gambar lama jika file ada 
                if (fs.existsSync(oldImagepath)) {
                    fs.unlinkSync(oldImagepath);
                }else {
                    console.log('File tidak dietmukan:', oldImagepath)
                }
            }
        }

        

        //update post
        const post = await prisma.post.update({
            where: {
               id: Number(id)
            },
            data: dataPost,
        
        });

         //send response
         res.status(200).send({
            success: true,
            message: 'Post updated successfully',
            data: post,
        });

    } catch (error) {

        res.status(500).send({
            success: false,
            message: 'Internal servers error'
        });
        
    }
}



module.exports = { findPost, createPost, findPostById, updatePost };