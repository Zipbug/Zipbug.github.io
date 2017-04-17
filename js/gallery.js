var galleryArray = [
    {
        "name": "AllenComm",
        "desription": "This was a joint rebuild of the Allen Communications site. I worked alongside Jibe Media to rebuild the site. We were able to reduce the page load from 10 seconds to just over one second. We were also able to improve the mobile experience which made the jump rates drop significantly.",
        "image": "/images/portfolio/allencomm.jpg",
        "link": "http://www.allencomm.com/"
    },
    {
        "name": "Ken Garff Kornerstone",
        "desription": "This was a custom WordPress build for the Ken Garff's KornerStone Administrative Services project..",
        "image": "/images/portfolio/kornerstone.jpg",
        "link": "http://www.kornerstoneadmin.com/"
    },
    {
        "name": "Hive Connected",
        "desription": "I was contacted to optimize the site for faster load times. I was able to decrease the load time of each page from over 6 seconds to less than 2 across the board. New /images have been uploaded and many changes have been made, current load times may be different from those stated.",
        "image": "/images/portfolio/hive.jpg",
        "link": "http://hiveconnected.com/home/"
    },
    {
        "name": "Veteran Mothers Association",
        "desription": "This was a custom WordPress build for the Utah veteran mothers, they were a pleasure to work with and it was a great project.",
        "image": "/images/portfolio/vaMoms_A.jpg",
        "link": "http://www.veteranmothers.org/"
    },
    {
        "name": "Aetna Get Feds Mail Campaign",
        "desription": "Created as a landing page for Aetna's mail campaign; I was the Front-End developer for the page.",
        "image": "/images/portfolio/getFeds_A.jpg",
        "link": "http://www.aetnafeds.com/tools.php"
    },
    {
        "name": "Ezekiel Garff",
        "desription": "An extremely difficult build, this was completely buit-in WordPress and included many moving parts, parallax effects, flickering lights, movies and many high-resolution /images. Unfortunately a full-size screen shot is impossible due to the parallax effect.",
        "image": "/images/portfolio/zeke_a.jpg",
    },
    {
        "name": "Integrated Welfare Management",
        "desription": "I was contracted to build a responsive landing page for IWM (Integrated Welfare Management). The design for the desktop view was delivered, but not the mobile versions. I adapted the given design to fit across all devices.",
        "image": "/images/portfolio/IWM_A.jpg"
    },
    {
        "name": "Aetna Mail Handlers",
        "desription": "A interesting landing page with quite a bit of variables, this page was a custom email landing page for Aetna.",
        "image": "/images/portfolio/mhbp_A.jpg",
    },
    {
        "name": "Paintball Addicts",
        "desription": "I was contracted to rebuild Paintball Addicts WordPress theme to suit their needs. But they never implemented the new theme.",
        "image": "/images/portfolio/pbAddicts_a.jpg"
    },
    {
        "name": "Redbeards",
        "desription": "Another custom WordPress build, this one was a theme that they bought but didn't have most of the functionality they were looking for so I was contacted to help get the site to where it needed to be.",
        "image": "/images/portfolio/redbeards.jpg"
    },
    {
        "name": "Equitable",
        "desription": "I was contracted to design and develop a responsive CMS for equitable. This was tricky because the back-end was created in Cold-Fusion. I learned Cold-Fusion in order to help with development and better understand the functionality.",
        "image": "/images/portfolio/equitable_desktop.jpg"
    },
    {
        "name": "Equitable Tablet",
        "desription": "The tablet version of the site, for more images check out my Behance portfolio",
        "image": "/images/portfolio/equitable_tablet.jpg"
    },
    {
        "name": "Runningman Dashboard",
        "desription": "This was the first real site I designed and developed. This one was difficult because the company had a very specific look they had for years and wanted a combination of the old and the new.",
        "image": "/images/portfolio/runningman_A.jpg"
    },
    {
        "name": "Concept Mobile App",
        "desription": "This was a design I made for a mobile application a few years back that never came to fruition.",
        "image": "/images/portfolio/RM_mobile_A.jpg"
    }
];

function buildGallery(item, index) {
   galleryArray.map(renderGalleryItem.bind(this));
     $('.gallery-hex').hover(function () {
            $(this).find('.overlay').animate({
                opacity: 0
            }, 300);
        },
        function () {
            $(this).find('.overlay').animate({
                opacity: 1
            }, 300);
    }).click(function(){
         var name = $(this).find('.title').text();
         var data = GetData(name); 
        
         openLightbox(data);
     });
}

function renderGalleryItem(item, index){
     var svgFile = '<svg viewBox="0 0 348.14 402">' +
                        '<clipPath id="hex">' +
                            '<polygon points="174.07 0 348.14 100.5 348.14 301.5 174.07 402 0 301.5 0 100.5 174.07 0" />' +
                        '</clipPath>' +
                        '<image x="-80" y="0" width="630" height="430" xlink:href="' + item.image + '" clip-path="url(#hex)" alt="' + item.name + '"></image>' +
                        '<polygon class="overlay" points="174.07 0 348.14 100.5 348.14 301.5 174.07 402 0 301.5 0 100.5 174.07 0" />' +
                    '</svg>';
    
    var hex = '<div class="gallery-hex">' +
                    svgFile +
                    ' <div class="hover-hide">' +
                        '<h3 class="title" text-anchor="middle" x="175" y="95">' + item.name + '</h3>' +
                    '</div>' +
                '</div>';

    $('#gallery .container').append(hex);
}

function GetData(name){
    return galleryArray.filter(
        function(galleryArray) {
          return galleryArray.name == name
        }
    );
}

function openLightbox(data){ 
    var link = data[0].link ? '<a class="link-button" href="' + data[0].link + '" target="_blank" >View Site</button>' : "<p>Link unavailable</p>";
    var lightbox = '<div class="lightbox fade-in-fast"><div class="lightbox-content"><button class="close-lightbox">X</button>' +
                        '<img src="'+ data[0].image +'" />' +
                        '<div class="text-content">' +
                            '<h2>' + data[0].name + '</h2>' +
                            '<p>' + data[0].desription + '</p>'+
                            link +
                        '</div>' +
                    '</div></div>';
    
  $('#gallery').append(lightbox);  
  $('.close-lightbox').click(function(){
        var lightbox = $('#gallery').find('.lightbox');
        lightbox.remove();
  });
}

buildGallery();

