const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe("api", () => {

    describe("GET requests", () => {

        test("blogs are returned as json", async () => {
            await api
                .get("/api/blogs")
                .expect(200)
                .expect("Content-Type", /application\/json/)
        })
    
        test("all blogs are returned", async () => {
            const res = await api.get("/api/blogs")
            expect(res.body.length).toBe(helper.initialBlogs.length)
        })
    
        test("a specific blog is within the returned blogs", async () => {
            const res = await api.get("/api/blogs")
            const authors = res.body.map(r => r.author)
            expect(authors).toContain("Mikko")
        })
    
        test("returned blogs have an identifier called 'id'", async () => {
            const res = await api.get("/api/blogs")
            expect(res.body[res.body.length - 1].id).toBeDefined()
        })
    })

    describe("POST requests", () => {

        test("a valid blog can be added", async () => {
            
            const newBlog = {
                title: "Third blog",
                author: "Sami",
                url: "www.third.com",
                likes: 3    
            }
    
            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect("Content-Type", /application\/json/)
            
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    
            const authors = blogsAtEnd.map(r => r.author)
            expect(authors).toContain("Sami")
        })
    
        test("blog 'likes' default value is 0", async () => {
            
            const newBlog = {
                title: "Third blog",
                author: "Sami",
                url: "www.third.com"   
            }
    
            await api
                .post("/api/blogs")
                .send(newBlog)

            const blogsAtEnd = await helper.blogsInDb()
            const newestBlog = blogsAtEnd.find(
                blog => blog.author === newBlog.author
            )
            expect(newestBlog.likes).toBe(0)
        })
    
        test("posting an invalid blog returns status code 400", async () => {

            const newBlog = {
                author: "Sami",
                likes: 3    
            }

            await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(400)
        })
    })  

    describe("DELETE requests", () => {

        test("deleting a note with a valid id succeeds with status code 204", async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
    
            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
    
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)
    
            const authors = blogsAtEnd.map(blog => blog.author)
            expect(authors).not.toContain(blogToDelete.author)
        })
    })

    describe("PUT requests", () => {

        test("updating a blog with a valid id succeeds", async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]
            blogToUpdate.likes = 6
    
            const res = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(blogToUpdate)
    
            expect(res.body.likes).toBe(6)
        })
    })    
})

afterAll(() => {
    mongoose.connection.close();
})