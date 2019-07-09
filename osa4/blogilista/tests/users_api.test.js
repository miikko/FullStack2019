const supertest = require("supertest")
const mongoose = require("mongoose")
const helper = require("./test_helper")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: "root", password: "sekret" })
    await user.save()
})

describe("when there is initially one user at db", () => {
    
    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: "mikmal",
            name: "Mikko Mallikas",
            password: "salainen",
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test("creation fails when using an existing username", async () => {
        const usersAtStart = await helper.usersInDb()

        const existingUser = {
            username: usersAtStart[0].username,
            name: "Jaska Jokunen",
            password: "jaska",
        }
        await api.post("/api/users/").send(existingUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

describe ("when there are no users in db", () => {

    test("creation fails with missing password and username", async () => {
        const usersAtStart = await helper.usersInDb()
        const invalidUser = {
            name: "Trolli"
        }
        await api.post("/api/users/").send(invalidUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test("creation fails with too short username", async () => {
        const usersAtStart = await helper.usersInDb()
        const invalidUser = {
            username: "tr",
            name: "Trolli",
            password: "troll"
        }
        await api.post("/api/users/").send(invalidUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test("creation fails with too short password", async () => {
        const usersAtStart = await helper.usersInDb()
        const invalidUser = {
            username: "troll",
            name: "Trolli",
            password: "tr"
        }
        await api.post("/api/users/").send(invalidUser).expect(400)
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close();
})