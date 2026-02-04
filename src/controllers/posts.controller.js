import { prisma } from "../config/prisma.client.js";

export const createPost = async (req, res) => {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category || !tags) {
    return res.status(400).json({ message: "Please fill all the fields" });
  }

  try {
    const post = await prisma.post.findFirst({ where: { title } });
    if (post) {
      return res.status(400).json({ message: "The post already exists" });
    }

    await prisma.post.create({
      data: {
        title,
        content,
        category,
        tags,
      },
    });

    return res.status(201).json({ message: "The post was created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Please enter an id" });
  }

  try {
    const checkPost = await prisma.post.findUnique({
      where: { id }
    });

    if (!checkPost) {
      return res.status(400).json({ message: "The post does not exist" });
    }

    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        category,
        tags
      }
    });

    return res.status(200).json({ message: "The post was updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Provide the id for the item" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return res.status(400).json({ message: "The post does not exist" });
    }

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const getAllPosts = async (_, res) => {
  try {
    const posts = await prisma.post.findMany();

    if (!posts) {
      return res.status(400).json({ message: "No posts available" });
    }

    return res.status(200).json(posts);

  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const getSomePosts = async (req, res) => {
  const { term } = req.query;

  if (!term) {
    return res.status(400).json({ message: "No search term" });
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        body: {
          search: term,
        },
      },
    })
    if (!posts) {
      return res.status(400).json({ message: "No posts with that search term" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "No post by that id" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id }
    })

    if (!post) {
      return res.status(400).json({ message: "The post does not exist" });
    }

    await prisma.post.delete({
      where: { id }
    })

    return res.status(400).json({ message: "The post was deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}
