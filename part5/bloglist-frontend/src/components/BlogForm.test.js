import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import BlogForm from "./BlogForm"

test("BlogForm sends its input info", () => {
    const createNewBlog = jest.fn()

    const component = render(
        <BlogForm createNewBlog={ createNewBlog } />
    )

    const title = component.container.querySelector("#title-input")
    const author = component.container.querySelector("#author-input")
    const url = component.container.querySelector("#url-input")
    const form = component.container.querySelector("#new-blog-form")

    fireEvent.change(title, {
        target: { value: "title input field" }
    })
    fireEvent.change(author, {
        target: { value: "author input field" }
    })
    fireEvent.change(url, {
        target: { value: "url input field" }
    })

    fireEvent.submit(form)

    expect(createNewBlog.mock.calls).toHaveLength(1)
    expect(createNewBlog.mock.calls[0][0].title).toBe("title input field")
    expect(createNewBlog.mock.calls[0][0].author).toBe("author input field")
    expect(createNewBlog.mock.calls[0][0].url).toBe("url input field")

})