import React from "react"
import {
    render, waitForElement
} from "react-testing-library"
jest.mock("./services/blogs")
import App from "./App"

describe("<App />", () => {
    it("if user not logged, blogs are not rendered",
        async () => {
            const component = render(<App />)
            component.rerender(<App />)

            await waitForElement(
                () => component.getByText("kirjaudu")
            )

            const blogs = component
                .container
                .querySelector(".blog")

            expect(blogs).toBe(null)

            const login = component
                .container.querySelector(".login")

            expect(login).toHaveTextContent(
                "käyttäjätunnus", "salasana"
            )
        }
    )

    it("blogs are rendered when user logs in",
        async () => {

            const user =  {
                username: "tester",
                token: "1231231214",
                name: "Teuvo Testaaja"
            }

            localStorage.setItem("loggedUser", JSON.stringify(user))

            const component = render(<App />)
            component.rerender(<App />)

            expect(component.container)
                .toHaveTextContent(
                    "create new"
                )
        }
    )
})