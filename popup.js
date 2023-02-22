document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".button")
  let regex =
    /^https:\/\/(github|githubbox|github1s)\.(com|dev)\/[A-Za-z0-9-_]+\/[A-Za-z0-9-_]+(.*)/

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = new URL(tabs[0].url)
        if (regex.test(url)) {
          let redirect_url
          switch (button.value) {
            case "GitHub Dev":
              redirect_url = `${url.protocol}/github.dev${url.pathname}`
              break

            case "Code Sandbox":
              redirect_url = `${url.protocol}/githubbox.com${url.pathname}`
              break

            case "GitHub 1s":
              redirect_url = `${url.protocol}/github1s.com${url.pathname}`
              break

            case "Gitpod":
              redirect_url = `${url.protocol}/gitpod.io/#${url.href}`
              break

            case "StackBlitz":
              redirect_url = `${url.protocol}/stackblitz.com/github/${url.pathname}`
              break
          }
          chrome.tabs.update({ url: redirect_url })
          window.close()
        }
      })
    })
  })
})
