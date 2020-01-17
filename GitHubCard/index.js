/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/






const cards = document.querySelector(".cards");

axios.get("https://api.github.com/users/N0m0n3y")
  .then(response => {
    console.log(response.data);
    const data = githubCreator(response.data);
  })
  .catch(error => {
    console.log(`NOW LOOK YOU BROKE EVERYTHING!`, error);
  })

// wasnt very pretty or Dynamic
  // const followersArray = [
  //   ' https://api.github.com/users/MicahJank',
  //   "https://github.com/DustinThewind505",
  //   "https://api.github.com/users/lihuang-zheng",
  //   "https://api.github.com/users/tdefriess",
  //   "https://api.github.com/users/MarioR81",
  //   "https://api.github.com/users/Nobro777",
  //   "https://api.github.com/users/kaverndsp",
  //   "https://api.github.com/users/amberlowe1001",
  //   "https://api.github.com/users/dmhabh1992",
  //   "https://api.github.com/users/VodeniZeko",
  //   "https://api.github.com/users/1devhall",
  //   "https://api.github.com/users/darkwolfxj",
  //   "https://api.github.com/users/taylorroebuck",
  //   "https://api.github.com/users/seanaleid",
  //   "https://api.github.com/users/Reikiryo",
  //   "https://api.github.com/users/M-PAW",
  //   "https://api.github.com/users/msinnema33",
  //   "https://api.github.com/users/AlecDye",
  //  ];





  
// Now This Below on the other hand....

  const followers = []; //<~~~~~~~ That rite there, empty array thats Dynamic.


  axios.get("https://api.github.com/users/N0m0n3y/followers")
    .then(response => {
      console.log(response)
      response.data.forEach(el => {
        followers.push(el.login);
      })
      followers.forEach(el => {
        axios.get("https://api.github.com/users/" + el)
        .then(response => {
          const lol = githubCreator(response.data);
      });
      });
    })
  


    function githubCreator(obj){
      // Put div here another div there
       const card = document.createElement("div"),
       cardInfo = document.createElement("div"),
       //h3 
       theName = document.createElement("h3"),
       // anchor
       profileLink = document.createElement("a"),
       //lots of Ps
       username = document.createElement("p"),
       location = document.createElement("p"),
       profile = document.createElement("p"),
       followers = document.createElement("p"),
       following = document.createElement("p"),
       bio = document.createElement("p"),
       //And but of course something for the eyes my friend.
       avitar = document.createElement("img")
    
      
      
    // Without Class we would be savages so below let there be Class
      card.classList.add("card");
      cardInfo.classList.add("card-info");
      theName.classList.add("name");
      username.classList.add("username");
    
     // Dropping some textContent DOWN BELOW ;)
      theName.textContent = obj.name;
      username.textContent = obj.login;
      profile.textContent = `Profile:`
      profileLink.textContent = obj.html_url;
      avitar.src = obj.avatar_url;
      location.textContent = `Location: ${obj.location}`
      profileLink.setAttribute("href", obj.html_url);
      followers.textContent = `Followers: ${obj.followers}`;
      following.textContent = `Following: ${obj.following}`;
      bio.textContent = obj.bio;


      // appending stuff down here
      cards.appendChild(card);
      card.append(avitar, cardInfo);
      cardInfo.append(theName, username, location, profile, followers, following, bio);
      profile.append(profileLink);
    
      return card;
    }
