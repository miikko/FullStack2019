import React from "react"
import { render, fireEvent } from "react-testing-library"
import Blog from "./Blog"

test("before clicking blog renders only the name and author", () => {
    const user = {
        username: "uname",
        name: "name"
    }

    const blog = {
        title: "Test title",
        author: "Developer",
        url: "https://testing.com",
        user: user,
        likes: 2
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const titleAndAuthor = component.container.querySelector(".normalView")
    expect(titleAndAuthor).toHaveTextContent(
        "Test title", "Developer"
    )
    expect(titleAndAuthor).not.toHaveTextContent(
        "uname, name"
    )
})

test("clicking the blog shows rest of the information", async () => {
    const user = {
        username: "uname",
        name: "name"
    }

    const blog = {
        title: "Test title",
        author: "Developer",
        url: "https://testing.com",
        user: user,
        likes: 2
    }

    const component = render(
        <Blog blog={blog} user={user} />
    )

    const div = component.container.querySelector(".normalView")
    fireEvent.click(div)

    expect(component.container).toHaveTextContent(
        "2", "uname"
    )
})