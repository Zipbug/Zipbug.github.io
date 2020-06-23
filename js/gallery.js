var galleryArray = [
    {
        "name": "Occupancy App",
        "description": "A joint colaberation between myself and <a href='https://cdeskins.com/#home'>Cody Deskins</a>. Cody saw a need to help small businesses with COVID-19. So we created an easy to use, multi-client counter.",
        "image": "./images/portfolio/tektonica.jpg",
        "link": "https://occupancyapp.com"
    },
    {
        "name": "Tektonika Daas Quiz",
        "description": "Part of the HP blog, I was able to build a custom scrolling quiz page for them with great animations and gifs.",
        "image": "./images/portfolio/tektonica.jpg",
        "link": "https://www.tektonikamag.com/index.php/daas-quiz/"
    },
    {
        "name": "Northrop NOW parallax page",
        "description": "The blog side of Northrop, I built them a custom wordpress post type and template to create animated pages.",
        "image": "./images/portfolio/northrop.jpg",
        "link": "https://now.northropgrumman.com/landing/environmental-tech/"
    },
    {
        "name": "Kindigit",
        "description": "For the popular TV show, I built them a custom scrolling landing page with animations that is fully responsive.",
        "image": "./images/portfolio/kindigit.jpg",
        "link": "https://www.kindigit.com/kindigit-process/"
    },
    {
        "name": "PublicNTP",
        "description": "I was given the privilage to work on this open source project, both the app and the websites. A project to serve up accurate time all over ther world. Click the link to learn more.",
        "image": "./images/portfolio/pntp.jpg",
        "link": "https://publicntp.org/"
    },
    {
        "name": "AllenComm",
        "description": "This was a joint rebuild of the Allen Communications site. I worked alongside Jibe Media to rebuild the site. We were able to reduce the page load from 10 seconds to just over one second. We were also able to improve the mobile experience which made the jump rates drop significantly.",
        "image": "./images/portfolio/allencomm.jpg",
    },
    {
        "name": "Hive Connected",
        "description": "I was contacted to optimize the site for faster load times. I was able to decrease the load time of each page from over 6 seconds to less than 2 across the board. New /images have been uploaded and many changes have been made, current load times may be different from those stated.",
        "image": "./images/portfolio/hive.jpg"
    },
    {
        "name": "Ezekiel Garff",
        "description": "An extremely difficult build, this was completely buit-in WordPress and included many moving parts, parallax effects, flickering lights, movies and many high-resolution /images. Unfortunately a full-size screen shot is impossible due to the parallax effect.",
        "image": "./images/portfolio/zeke_a.jpg",
    },
    {
        "name": "Equitable",
        "description": "I was contracted to design and develop a responsive CMS for equitable. This was tricky because the back-end was created in Cold-Fusion. I learned Cold-Fusion in order to help with development and better understand the functionality.",
        "image": "./images/portfolio/equitable_desktop.jpg"
    },
    {
        "name": "Runningman Dashboard",
        "description": "This was the first real site I designed and developed. This one was difficult because the company had a very specific look they had for years and wanted a combination of the old and the new.",
        "image": "./images/portfolio/runningman_A.jpg"
    }
];

function buildGallery() {
   galleryArray.map(renderGalleryItem.bind(this));
}

function renderGalleryItem(item, index){
    var g_item = '<div class="card">'
                      + '<div class="card-header">'
                      +  '<h3 class="title">' + item.name + '</h3>'
                      +'</div>'
                      +'<div class="card-body">'
                        +'<div class="card-description">'
                           + '<p>' + item.description + '</p>'
                           + (item.link ? '<a class="link-button" href="' + item.link + '" target="_blank" >View Site</a>' : '')
                        +'</div>'
                      +'<img src="'+item.image+'" alt="'+item.name+'"/>'
                      +'</div>'
                +'</div>';

    $('#gallery .container').append(g_item);
}

function GetData(name){
    return galleryArray.filter(
        function(galleryArray) {
          return galleryArray.name == name
        }
    );
}

buildGallery();
