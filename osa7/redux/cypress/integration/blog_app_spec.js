describe("Blog app", function () {

    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset")
        const user = {
            name: "Test Tost",
            username: "tester",
            password: "tostor"
        }
        cy.request("POST", "http://localhost:3003/api/users/", user)
        cy.visit("http://localhost:3000")
    })

    describe("User is not logged in", function () {

        it("a valid user can log in", function () {
            cy.get("[data-cy=login-username]").type("tester")
            cy.get("[data-cy=login-password]").type("tostor")
            cy.get("[data-cy=login-submit]").click()
            cy.get("[data-cy=home-title]")
        })

        it("notification is displayed on failed login attempt",
            function () {
                cy.get("[data-cy=login-username]").type("tester")
                cy.get("[data-cy=login-password]").type("wrong")
                cy.get("[data-cy=login-submit]").click()
                cy.get("[data-cy=notification]")
                    .contains("wrong username or password")
            })
    })

    describe("User is logged in", function () {

        beforeEach(function () {
            cy.get("[data-cy=login-username]").type("tester")
            cy.get("[data-cy=login-password]").type("tostor")
            cy.get("[data-cy=login-submit]").click()
        })

        it("A new valid blog can be added and it can be modified/removed",
            function () {
                //Testing creation
                cy.get("[data-cy=open-blog-form]").click()
                cy.get("[data-cy=blog-title]").type("test blog")
                cy.get("[data-cy=blog-author]").type("tester")
                cy.get("[data-cy=blog-url]").type("www.new.com")
                cy.get("[data-cy=submit-blog]").click()
                cy.get("[data-cy=notification]")
                    .contains("a new blog test blog by tester added")
                cy.get(".blogLink").contains("test blog tester").click()
                //Testing likes
                cy.get(".blog").contains("0 likes")
                cy.get("[data-cy=blog-add-like]").click()
                cy.get(".blog").contains("1 likes")
                //Testing comments
                cy.get("[data-cy=blog-comment-input]").type("Test comment")
                cy.get("[data-cy=blog-comment-submit]").click()
                cy.get("[data-cy=blog-comment-list]")
                    .contains("Test comment")
                //Testing removal
                cy.on("window:confirm", function (str) {
                    expect(str).to.eq("remove blog test blog by tester")
                    return true
                })
                cy.get("[data-cy=remove-blog]").click()
                cy.get("[data-cy=notification]")
                    .contains("Blog test blog by tester was removed")
            })
    })

})