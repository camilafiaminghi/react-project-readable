# Frontend
This is a web application that shows posts and comments. The users can create a new post, add comments to the post, vote in posts and comments anonymously. The list of posts may be filtered by category and ordered by highest score or by created date.

## Installation
To install and start the web application, run the following commands in this directory:

* `npm install`
* `npm start`

## Views
This web application has four views: Home, Category View, Post Details and Create Post.

### Home
The home view displays a list of posts ordered by higher votes pontuation. It shows a list of links categories and a link to create a new post anonymously. There is also the possibility to order the list by highest score or by created date.    

### Category
The category view has the same requirements founds in Home, but the list of posts displayed is filtered by the specific category.

### Post Details
The post details view shows the complete information of each post that includes: title, author, body, created date, vote scores and comments ordered by most voted. Users can remove or edit the post and can add a new comment. The comments listed have individual controls to edition and removal.

### Create/Edit Post
The create view displays a input form with fields: author name, title, body and a component to choose a category. All fields are required.
Users can edit post title and post body, these fields are displayed by default with the current value. 
