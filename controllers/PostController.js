//import prisma client
const prisma = require("../prisma/client");

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

module.exports = { findPost };