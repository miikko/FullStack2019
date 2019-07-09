const blogs = [
    {
        title: "First title",
        author: "Developer1",
        url: "https://one.com",
        user: {
            username: "user1",
            name: "name1"
        },
        likes: 1
    },
    {
        title: "Second title",
        author: "Developer2",
        url: "https://two.com",
        user: {
            username: "user2",
            name: "name2"
        },
        likes: 2
    },
    {
        title: "Third title",
        author: "Developer3",
        url: "https://three.com",
        user: {
            username: "user3",
            name: "name3"
        },
        likes: 3
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

const setToken = () => {
    return null
}

export default { getAll, setToken }