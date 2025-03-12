// category button load
const categoryButtonLoad = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => categoryButtonDisplay(data.categories))
}
categoryButtonLoad();

// category button display
const categoryButtonDisplay = (buttons) => {
    for(let btn of buttons){
        // console.log(btn.category_id);
        const buttonsContainer = document.getElementById('buttonsContainer');
        const div = document.createElement('div');
        div.innerHTML = `<button id='btn-${btn.category_id}' onclick='routeWithCategoryButton(${btn.category_id})' class="btn btn-sm">${btn.category}</button>`;
        buttonsContainer.appendChild(div);
    }
}

//route with category button
const routeWithCategoryButton = (id) => {
    // console.log(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {

        const activeBtn = document.getElementsByClassName('active');
        for(let btn of activeBtn){
            btn.classList.remove('active')
        }

        const clickedBtn = document.getElementById(`btn-${id}`)
        clickedBtn.classList.add('active')
        videoDisplay(data.category);
    })
}


// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//     {
//     "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//     "profile_name": "Olivia Mitchell",
//     "verified": ""
//     }
//     ],
//     "others": {
//     "views": "100K",
//     "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
//     },


// video load
const videoLoad = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => {

        const activeBtn = document.getElementsByClassName('active');
        for(let btn of activeBtn){
            btn.classList.remove('active')
        }

        const allBtn =  document.getElementById('all');
        allBtn.classList.add('active')


        videoDisplay(data.videos);
    })
}


// video display
const videoDisplay = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById('videoContainer');    
    videoContainer.innerHTML = '';

    if(videos.length == 0){
        videoContainer.innerHTML = `<div class="col-span-full flex justify-center items-center flex-col my-15">
            <img src="./images/Icon.png" alt="">
            <h2 class="text-lg font-bold">Oops!! Sorry, There is no content here</h2>
        </div>`;
        return;
    }

    videos.forEach((video)=>{
        const {title,thumbnail} = video;
        const {profile_picture,profile_name,verified} = video.authors[0];
        
        const div = document.createElement('div');
        div.innerHTML = `
                <div class=" overflow-hidden">
            <!-- Thumbnail -->
            <div class="relative">
                <img src="${thumbnail}" alt="Video Thumbnail" class="w-full h-[180px] object-cover rounded-lg">
                <span class="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-80">3hrs 56 min ago</span>
            </div>
            
            <!-- Content -->
            <div class="py-4 flex  gap-4">
                <div class="w- mt-2">
                    <img src="${profile_picture}" class="w-9 h-9 rounded-full" alt="Creator Avatar">
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-900 hover:text-blue-500 transition duration-300 cursor-pointer">
                        ${title}
                    </h3>
                    <div class="flex items-center space-x-2 mt-2">
                        
                        <span class="text-gray-700 font-medium">${profile_name}</span>
                        ${verified ? '<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2Zm-1 14.5-3-3 1.5-1.5L11 13.5l4.5-4.5L17 10Z"/></svg>':''}
                    </div>
                    <p class="text-gray-600 text-sm mt-1">${video.others.views}</p>
                </div>
            </div>
        </div>
        `;
        videoContainer.appendChild(div);
    })
}