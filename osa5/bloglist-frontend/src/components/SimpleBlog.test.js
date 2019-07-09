import React from "react"
import { render, fireEvent } from "react-testing-library"
import SimpleBlog from "./SimpleBlog"

test("renders content", () => {
    const blog = {
        title: "Test title",
        author: "Developer",
        likes: 2
    }

    const component = render(
        <SimpleBlog blog={blog} />
    )

    const titleAndAuthor = component.container.querySelector(".mainContent")
    expect(titleAndAuthor).toHaveTextContent(
        "Test title", "Developer"
    )

    const likes = component.container.querySelector(".likes")
    expect(likes).toHaveTextContent(
        "blog has 2 likes"
    )
})

test("clicking the button twice calls the event handler twice", async () => {
    const blog = {
        title: "Test title",
        author: "Developer",
        likes: 2
    }

    const mockHandler = jest.fn()

    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const button = component.container.querySelector("button")
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
})
