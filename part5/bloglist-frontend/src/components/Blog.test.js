import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
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


})