// loader
const showLoader = () => {
    document.getElementById('loader').classList.remove('hidden')
    document.getElementById('videoContainer').classList.add('hidden')
}
const hideLoader = () => {
    document.getElementById('loader').classList.add('hidden')
    document.getElementById('videoContainer').classList.remove('hidden')
}

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

// show details
const showDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayShowDetails(data.video))
}


const displayShowDetails = (video) => {
    const modalContainer = document.getElementById('modalContainer');
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="max-w-md bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
        <!-- Thumbnail -->
        <div class="relative">
            <img src="${video.thumbnail}" alt="Shape of You Thumbnail" class="w-full h-52 object-cover">
            <span class="absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md opacity-80">${video.others.views} views</span>
        </div>
        
        <!-- Content -->
        <div class="p-4">
            <h3 class="text-xl font-semibold text-gray-900 hover:text-blue-500 transition duration-300 cursor-pointer">
                ${video.title}
            </h3>
            <p class="text-gray-700 text-sm mt-2">
                ${video.description}
            </p>
            
            <!-- Author Details -->
            <div class="flex items-center space-x-3 mt-4">
                <img src="${video.authors[0].profile_picture}" class="w-10 h-10 rounded-full" alt="Olivia Mitchell">
                <span class="text-gray-800 font-medium">${video.authors[0].profile_name}</span>
            </div>
            
            <!-- Posted Date -->
            <p class="text-gray-500 text-sm mt-2">Posted on: ${video.others.posted_date}</p>
        </div>
    </div>
    `;
    modalContainer.innerHTML = ''
    modalContainer.appendChild(div)
    document.getElementById('my_modal_1').showModal()
    console.log(video);
}


// video load
const videoLoad = (inputValue = '') => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputValue}`)
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
    showLoader()
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
        const {title,thumbnail,video_id} = video;
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
            <button onclick=showDetails('${video_id}') class="btn btn-block">Show Details</button>
        </div>
        `;
        videoContainer.appendChild(div);
        hideLoader()
    })
}


document.getElementById('searchBox').addEventListener('keyup', (e)=>{
    const inputValue = e.target.value;
    videoLoad(inputValue)
})


