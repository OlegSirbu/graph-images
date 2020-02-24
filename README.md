# MedSpoke React Challenge

## Description

This project is a React application allowing users to query for nice pictures, upvote them and download. The core idea is to build the app where user can find and download any picture he wants, with user-friendly UI and good UX.

Luckily, the API server is completed, so there is only frontend work left. Your task will be to update current frontend app according to the design specs by adding required funtionallity, fixing bugs and improving quality of the frontend code.  

This is not a production project, and it's used for purpose of interviewing. Please read everything carefully before starting challenges, as below we will explain in detail how to run the project, what's expected and how to submit the results.

![](https://raw.githubusercontent.com/medspoke/challenges/challenge-react/assets/imago-sceenshot.jpg)

## Getting Started

### Installation

1. Clone the project
2. Install all required technologies
3. Install depencencies: `yarn`
4. Start the server: `yarn start`
5. Open app at http://localhost:8080/

### GraphQL API specification

The project uses API which is written in GraphQL and available here: https://challenge-rails-api.herokuapp.com/api/graphql You can find documentation of all available types and queries [under this link](http://react-challenge.medspoke.com/).

#### Resetting the data
During the development you might find yourself in the position where the amount of the data on the server becomes overwhelming and make testing difficult. In that case, you can use the `resetDatabase` mutation to remove all the data from the database and seed it with 90 sample images.

#### Limitations

The _Images_ query has a feature which autopopulates our backend database with new images whenever there's not enough images to fulfil user request. This is done using [Unsplash API](https://unsplash.com/developers). For example, if we have 100 images in our backend db but the user requests 120 images, those 20 missing images will be grabbed from Unsplash and saved on our server, and only after that returned to the user. However, it's important to keep in mind that Unsplash has a limitation of 50 requests per hour and it will return error if the limitation is reached.

### Design specification

#### Interactive prototype

The following InVision prototype shows how the app should look like after you finish this challenge: https://invis.io/4KV1HIMEMCZ#/395490457_image_List 

Please make sure you click through all of the screens carefully to understand what is the required UX/UI specification. You can either use left/right arrow keys to navigate, or click anywhere on a screen to find out where there _navigation hotspots_ are. 

#### Source files

You can download Sketch source with the above prototype here: ![imago_sketch.spec](https://github.com/medspoke/challenges/blob/challenge-react/assets/imago_spec.sketch?raw=true)

#### Frontend framework

We've built the app using [Blueprint](https://blueprintjs.com/docs/) frontend library, so whenever you need any component to finish the tasks below, their docs would be the first place to look.

## Challenges

1. There is a search bar which works, but unfortunately in a quirky way. Let's fix it little bit:
  - it should not send the request right away, but rather wait until input loses the focus or user didn't type anything for  2 seconds
  - if user deletes search it should immediately send the request to get all of the images
  - there should be some visual an indicator of a query being executed (for example: loader in place of the search icon + adding some transperency to container with list of images)

2. Customer has requested a feature which will allow users to upvote the images which they like. Backend is ready, so we only need to add it on the frontend side. Plase follow the designs and add the button to like / unlike images and show number of likes below each image.

3. Currently, the list of images only shows first 10 images returned the server. Implement inifinite scroll solution which will:
  - query & add to the list next 10 images whenever user scrolls to the end of a list
  - show a loader circle below current images list whenever query is being executed (according to the designs)
  - remember current position on the images list. If the user leaves the screen (for example to edit image data) and then comes back, he should still return to exactly the same position on the list and see the same images, as when he was leaving

4. Image view (_/images/IMAGE_ID_) route opens a fullscreen image preview, which contains arrows to go to the next/previous image. However, there is a bug - when user refreshes the page, the arrows disappear. Please debug and fix it, making sure that:
  - it's always possible to go to the next/previous image, even after refreshing the page
  - user has always options to load a next image (similarly as in the infinite scroll from previous point - the images never finish, we query for new ones when necessary) 

5. There is a lot of code repetition among create and edit image forms. Please refactor it according to DRY principles - make sure that both rendering code as well as business logic is reused between components whenever possible. 

6. Both create and edit forms are missing a way to choose image author. Please add a select dropdown, which will:
  - allow to select an author of an image
  - by default load author collection from the server, but allow creating new authors as well

7. The navigation bar contains `Welcome, stranger` text. We are planning to add user accounts support in the near future, but the backend is not ready. Because of that's, let's mock this feature in the frontend side for now as folows:
  - UI should always be in one of two states: logged in / logged out
  - if user is logged out:
    - there is `Welcome, stranger` message shown in the navbar
    - whenever user tries to add a picture or update the picture data, we interrupt and display a modal which prompts for his username. After submitting the modal we save the username in memory/local storage and from now on treat user as logged in 
  - if user is logged in:
    - there is `*icon* *username*` text shown in the navbar, which is clickable and displays popover with two options: _Add image_ and logout
    - clicking logout option simply switches UI to logged out state
    - when user opens new image form, the _Author_ dropdown value should be his username by default
    - when user opens edit image form, the _Author_ dropdown value should allow to choose his username as one of the options

8. Everybody likes the dark theme, right? Not really :) Let's add support for the color theme switcher:
  - add a link next to copyright message in the bottom of the page, which will allow to switch the theme
  - change the position of the copyright component to fixed in the bottom of the screen, so that it work well with infinite loading (otherwise users will never be able to change theme, because of new images being loaded)
  - clicking the link should change the color of the navbar and of the background
    - for the components displayed in the dark version of the navbar, you might consider using dark theme of Blueprint components

9. _[BONUS]_ Implement error handling system:
   - it should handle and display validation errors in the forms
   - if an action error happens, it should inform user about the problem using toast notification
   - if a rendering error happens, it should redirect to an _error page_, where user can see some hints on what happened and how to solve the error (for example: simple text with instructions how to clean up the cache/reload page/contact our support team if problem persists)

## Additional Information

### Tools

Useful tools for development:

- [GraphiQL app](https://electronjs.org/apps/graphiql) ‒ very useful GUI tool for editing and testing GraphQL queries and mutations
- [Postman app](https://www.getpostman.com/downloads/) 

Feel free to use any of the libraries/tools you want and refactor the code when you feel it's done in an inappropriate way. You can even change the structure of the project if you want! Sky's the limit.

## Summary

### What are we looking for?

**Clarity** - We are looking for a code than can be understood right away by every developer in the team

**Simplicity** - We prefer to start from simple, easily-extendable solutions instead of building complex constructions that will never be used. We put a lot of emphasis on having correct components strucutre, since doing it right from the beginning results in a lot less of a headache later on.

**Attention to detail** - Try to think of all possible real-world use cases to prevent number of bugs and improve user exeperience once feature goes live

### Rules

* We prefer fully-baked, correct solutions that will make our engineer souls happy, so please take your time - there is no strict time limit

* At the same time please don't overdo it - if your solution does what is required, and you're happy with it, most probably we will be too

* Communicating with other developers during the challenge is *strictly forbidden* - we would love to know your personal skills, and don't worry if you can't solve some tasks - nobody knows everything!

* Submit the challenges via [git format-patch](https://git-scm.com/docs/git-format-patch) to our development team (dev@medspoke.com)

### What happens after submission?

Once you submit your solution to us via `git format-patch`, our dev team will review the code. It might take us up to 1 week to get back to you with some feedback. If your solution is accepted, we will invite you for a next round of the recruitment process.

## Have a great time coding, and we're looking forward for your submission!

![force](https://media.giphy.com/media/l49JHz7kJvl6MCj3G/giphy.gif)
