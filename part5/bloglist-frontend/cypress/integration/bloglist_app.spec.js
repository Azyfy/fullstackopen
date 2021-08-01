describe("Blog app", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/testing/reset")
      
      const user = {
          name: "Pengu-san",
          username: "Pengu",
          password: "12345"
      }

      const user2 = {
        name: "Pengu2-san",
        username: "Pengu2",
        password: "12345"
    }
      
      cy.request("POST", "http://localhost:3003/api/users/", user)
      cy.request("POST", "http://localhost:3003/api/users/", user2)
      cy.visit("http://localhost:3000")
    })
  
    it("Login form is shown", function() {
      cy.contains("Log in to application")
      cy.contains("Username")
      cy.contains("Password")
      cy.contains("Log In")
    })

    describe("Login", function() {
        it("Suceeds with correct credentials", function() {
            cy.get("#username").type("Pengu")
            cy.get("#password").type("12345")
            cy.get("#login-btn").click()

            cy.contains("Pengu-san logged in")
        })
        it("Fails with wrong crdentials", function() {
            cy.get("#username").type("Pengu")
            cy.get("#password").type("wrong")
            cy.get("#login-btn").click()
/*
            cy.get("Wrong credentials") passed first time,
                             while the message lasted 3s  
                             times out now.        

            cy.should("contain", "Wrong credentials")
                .and("have.css", "color", "rgb(0,0,255)")
*/
            cy.get("html").should("not.contain", "Pengu-san logged in")
        })
    })

    describe("When logged in", function() {
        beforeEach( function() {
            cy.login({ username:"Pengu", password: "12345" })
        })

        it("A blog can be created", function() {
            cy.get("#open-blog-form-btn").click()
            cy.get("#title-input").type("Writing the title with cypress")
            cy.get("#author-input").type("Pengu")
            cy.get("#url-input").type("https://www.cypress.io/")
            cy.get("#create-blog-btn").click()

            cy.contains("Writing the title with cypress Pengu")
        })

        describe("Blogs exist", function() {
            beforeEach( function() {
                cy.createBlog({
                    title: "Blog does exist", 
                    author: "Pengu", 
                    url: "Pengus page",
                    likes: 0
                 })
            })

            it("Check if blog exists", function() {
                cy.contains("Blogs")
                cy.contains("Blog does exist")
            })
      
            it("Can like a blog", function() {
                cy.get("#show-hide-blog-details-btn").click()
                cy.get("#like-btn").click()

                cy.contains("1")
            })

            it("Can delete a blog", function () {
                cy.get("#show-hide-blog-details-btn").click()
                cy.get("#remove-blog-btn").click()

                cy.get("html").should("not.contain", "Blog does exist Pengu")
            })

            it("User cant delete anothers blog", function() {
                cy.login({ username:"Pengu2", password: "12345" })

                cy.get("#show-hide-blog-details-btn").click()

                cy.get("#remove-blog-btn").should("not.exist")
            })

            it("Check if blogs are ordered by the number of likes", function() {
                cy.createBlog({
                    title: "Should be first with more likes", 
                    author: "Pengu", 
                    url: "Pengus page",
                    likes: 3
                 })

                cy.log("First element based on likes")

                cy.get(".blog").first().should("contain", "Should be first with more likes Pengu")
            })
        })
    })

  })