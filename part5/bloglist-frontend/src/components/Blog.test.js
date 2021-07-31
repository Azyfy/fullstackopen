import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"

test("renders title and author", () => {
    const blog = {
        title: "Frontend Post",
        author: "Pengu",
        user: {
            name: "Pengu-san",
        },
    }

    const loggedUser = {
        name: "NO",
    }

    const component = render(
        <Blog  blog={blog}  loggedUser={loggedUser} />
    )

    expect(component.container).toHaveTextContent(
        "Frontend Post"
    )
    expect(component.container).toHaveTextContent(
        "Pengu"
    )
    
    //method2 etc
    const div = component.container.querySelector('.blog')
        expect(div).toHaveTextContent(
        "Frontend Post"
  )

  // component.debug()
  // console.log(prettyDOM(div))

})

test("clicking the button shows more details", () => {
    const blog = {
        title: "Frontend Post",
        author: "Pengu",
        url: "some page",
        likes: 3,
        user: {
            name: "Pengu-san",
        },
    }

    const loggedUser = {
        name: "NO",
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog  blog={blog}  loggedUser={loggedUser} />
    )

    const button = component.getByText("View")
     fireEvent.click(button)

  //   console.log(prettyDOM(button))
  //   component.debug()

     expect(component.container).toHaveTextContent(
        "some page"
    )
    expect(component.container).toHaveTextContent(
        3
    )
})