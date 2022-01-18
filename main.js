var apiUrl = "https://api.nasa.gov/planetary/apod?count=10&api_key=cgSGSBRzk4rQz4g67hlVMWe4xhuJbjXSNgtw8khW";

var photoDate = "";
var photoTitle = "";
var photoDescription = "";
var photoUrl = "";

var allPhotos = [];
var likedPhotos = [];

function getPhotos(url) {
    fetch(url)
    .then(res => res.json())
    .then(details => setPhotos(details))    
}

getPhotos(apiUrl);

// constructor for each photo 
function Photo(date, title, description, url, liked)
{
    this.date = date; 
    this.title = title; 
    this.description = description; 
    this.url = url;   
    this.liked = liked; 
}

function setPhotos(data)
{
    for(let i = 0; i < data.length; i++) 
    {
        photoDate = data[i].date;
        photoTitle = data[i].title;
        photoDescription = data[i].explanation;
        photoUrl = data[i].url;        

        allPhotos.push(new Photo(photoDate, photoTitle, photoDescription, photoUrl, false));
    }

    displayPhotos(allPhotos);
}

function displayPhotos(photos)
{     
    // clear output div
    var outputDiv = document.getElementById("displayOutput");
    outputDiv.innerHTML = "";

    for(let i = 0; i < photos.length; i++)
    {
        // create div for each post
        var postDiv = document.createElement("div"); 
        postDiv.className = "post"; 
                    
        // create img element for each div                    
        var newImage = document.createElement("img");
        newImage.src = photos[i].url;
        newImage.alt = photos[i].title;
        newImage.className = "postimage";

        // create p elements for photo info
        var postTitle = document.createElement("p");
        postTitle.innerHTML = "Title: " + photos[i].title;

        var postDate = document.createElement("p");
        postDate.innerHTML = "Date: " + photos[i].date;

        var postDescription = document.createElement("p");
        postDescription.innerHTML = "Description: " + photos[i].description;

        // create link to original NASA photo                   
        var imageUrl = document.createElement("a");
        imageUrl.href = photos[i].url;
        imageUrl.innerHTML = "See original photo";

        // add like button
        var likeButton = document.createElement("button");

        // if photo not liked, display like button
        if(photos[i].liked == false)
        {
            likeButton.innerHTML = "Like";
            likeButton.className = "likebutton";
        }
        // if photo liked, change button to unlike
        else if(photos[i].liked == true)
        {
            likeButton.innerHTML = "Unlike";
            likeButton.className = "unlikebutton";
        }

        likeButton.addEventListener("click", function() {            
            if(photos[i].liked == false) 
            {
                // when like button pressed, change photo to liked and add to liked photos array
                photos[i].liked = true;
                displayPhotos(allPhotos);

                likedPhotos.push(new Photo(photos[i].date, photos[i].title, photos[i].description, photos[i].url, true)); 
            }            
            else if(photos[i].liked == true)
            {
                // when unlike button pressed, change photo to unliked and remove from liked photos array
                allPhotos[i].liked = false;
                
                for(let index = 0; index < likedPhotos.length; index++)
                {
                    if(likedPhotos[index].title == photos[i].title)
                    {
                        likedPhotos.splice(index, 1);
                    }
                }

                filterByLike();
            }
        });

        // append image to post div
        postDiv.appendChild(newImage);

        // append info to post div
        postDiv.appendChild(postTitle); 
        postDiv.appendChild(postDate); 
        postDiv.appendChild(postDescription); 

        // append link to post div
        postDiv.appendChild(imageUrl);

        // append like button to post div
        postDiv.appendChild(likeButton);

        // append item div to output div
        outputDiv.appendChild(postDiv);
    }    
}

// filter by like function
function filterByLike()
{
    // get dropdown selection
    var selectedPhotos = document.getElementById("ddFilter").value;

    if (selectedPhotos == "All")
    {
        displayPhotos(allPhotos);
    }
    else if (selectedPhotos == "Liked")
    {
        displayPhotos(likedPhotos);
    }               
}