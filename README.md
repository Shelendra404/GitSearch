## Project info

After learning some basic JavaScript and turning my attention into React, I decided to redo my old GitSearch-project. The old version was made with php for a WordPress-page, the new one utilizes ReactJS. This is a work in progress, and the first project I have made with React, ever (following along tutorials doesn't really count).

### Implementation

There is currently no implementation of this code for testing purposes. I might eventually add this on my website.

### To-do

- Some blocks of code have already been turned into their own components. Check out if more clean-up can be done
- Add some proper styling to the components
- Possibly implement this to my web site for public testing
- Find a way to set headers only once as a variable
- Show last 10 commits
- Possibly show more commits and page through them
- Show more than X repositories and page through them

### Fixes waiting to happen

- When returning to the page, might show username but it won't be on state. Need to wipe this on exit/re-enter
- Proper handling of errors when user is not found
- User info gets called too many times. Why?

### Fixes and done to-do's

- Headers not being sent with second fetch, resulting in errors
- Add functionality: show last commits with name, avatar, date and message of commit
- Find a way to map through all commits within each repo
- Succesfully moved public repositories into its own component. Hurray!
- Parse dates properly for joined date and commits.

### Future ideas ###
- Add "x days ago" to the commits