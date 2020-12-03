### Project Description
We created a web page where users can customize their own avatars and fetch (randomly) their own Pokemon.
Then, users are able to merge their avatar with elements of the chosen Pokemon to create a new image. Users can also save the image of their own customized avatar and also the merged image.
We chose this project because we wanted to make something that is fun and interesting for users to interact with.

### Functionality
There are severl separate steps in making a desired avatar in our project, each with a different functionality.
1. Random generation of avatar and reset to basic avatar features
2. Basic customization of the avatar - change the avatar's skin color, hair color and/or clothes color
3. More advanced customization of the avatar, using a drag and drop - change the avatar's facial expressions, facial features, and/or head accessories
4. Download and save the avatar the user has created
5. Fetch a random pokemon, using the Pokemon API - users will be shown the Pokemon name, type and image. Each click of the button fetches a different random Pokemon.
6. Using machine learning techniques, merge the customized Avatar with the randomly chosen Pokemon into one single image.
7. Download the merged image.

### Learnings
- JS empowered features/libraries are really ubiquitous and powerful. Consistently amazed by the wide variety of libraries available to make front end projects. For instance, I was aware of the ML style transformation feature but unsure how difficult it would be to implement into our project. It was really eyeopening to learn about new open source communities such as magenta project that holds pretained ML models and implements its front end libraries with tensorflow.js
- Ability to create interesting projects with only frontend code (e.g. Avataaars library), without having to rely on backend. Server side rendering and business logic are great for scalibility, authorization, profile management and most importantly scale up the project exponentially. However, it may not be necessary for every project. The Avataaar project we utilized is a good example of that. Additionally, for our project, the only benefit to have a backend may simply be hosting the pretained ML model on the server. However, the marginal benefit may be only a couple of seconds in latency. Thus, we didn't think that was necessary.
- Seen it done vs. seen it in doc. (e.g. magenta problems in small group maintained cool projects) Many cool open source projects and libraries are maintained by a very small group of individuals and their documentations often are not entirely up to date or went missing. There are several times in the project, this scenario happened and the best solution I found was to look into the issues tabs and also look for other project who've also tried to tackle these issues. The best practice to learn gained from this experience is to gain knowledge from practice vs. learning from books. 
- Laying out frontend components in a way that is aesthetically nice is harder than we thought
- Github is a useful tool for collaboration
- Coordinating across different timezones is tricky
