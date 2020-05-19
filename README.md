## Project info

After learning some basic JavaScript and turning my attention into React, I decided to redo my old GitSearch-project. The old version was made with php for a WordPress-page, the new one utilizes ReactJS. This is a work in progress, and the first project I have made with React, ever (following along tutorials doesn't really count).

### Implementation

There is currently no implementation of this code for testing purposes. I might eventually add this on my website.

### To-do

- Some blocks of code have already been turned into their own components. Check out if more clean-up can be done
- Possibly implement this to my web site for public testing
- Additional page styling

### Fixes waiting to happen

- Proper handling of errors when user is not found
- User info gets called too many times. Why?
- Currently only returns a user if the exact match is found. Possible to make partial search results?

### Fixes and done to-do's

- Headers not being sent with second fetch, resulting in errors
- Add functionality: show last commits with name, avatar, date and message of commit
- Find a way to map through all commits within each repo
- Succesfully moved public repositories into its own component. Hurray!
- Parse dates properly for joined date and commits.
- Headers are now brought in as variables.
- Show last 10 commits
- Show more than X repositories and page through them
- Add some proper styling to the components
- When returning to the page, might show username but it won't be on state. Need to wipe this on exit/re-enter
- Throws an error when trying to access repositories with no commits
- Button styling

### Future ideas

- Add "x days ago" to the commits
