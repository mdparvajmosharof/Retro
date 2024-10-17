const postJson = async (searchTxt) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchTxt}`);
    const data = await res.json();
    const posts = data?.posts;
    console.log(data.posts);
    displayPost(posts);
}
const latestJson = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
  const data = await res.json();
  
  console.log(data);
  displayLatestPost(data);
}



const allPostContainer = document.getElementById('all-post-con');

const displayPost = posts =>{
  allPostContainer.textContent ="";
    posts.forEach(post =>{
        console.log(post);
        const postCard = document.createElement('div');
        postCard.classList=` p-5 bg-slate-300 border border-slate-700 rounded-md`;
        postCard.innerHTML=`
        <div class="flex gap-6">
              <div class="avatar online h-24">
                <div class="w-24  rounded-md">
                  <img
                    src="${post.image}"
                  />
                </div>
              </div>
              <div class="text-black w-full space-y-6">
                <div class="flex items-center justify-between">
                  <p>#${post.category}</p>
                  <p>Author : ${post.author.name}</p>
                </div>
                <div>
                  <p class="font-bold"  id="${post.id}">
                    ${post.title}
                  </p>
                </div>
                <div>
                  <p>
                    ${post.description}
                  </p>
                </div>
                <hr />
                <div class="flex justify-between">
                  <div class="flex gap-2">
                    <div>
                      <i class="fa-regular fa-comment-dots"></i>
                      <span>${post.comment_count}</span>
                    </div>
                    <div>
                      <i class="fa-solid fa-eye"></i>
                      <span id="viw${post.id}">${post.view_count}</span>
                    </div>
                    <div>
                      <i class="fa-solid fa-clock"></i>
                      <span>${post.posted_time} pm</span>
                    </div>
                  </div>
                  <div onclick="openMsg(${post.id})">
                    <i
                      class="fa-solid fa-envelope-open-text text-emerald-600"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
        `;
        allPostContainer.appendChild(postCard);
    });
}



const openMsgId = document.getElementById('openMsgId');
const openMsgArr = [];

const openMsg = (id) =>{
  const postId = document.getElementById(id);
  const postTitle = postId.innerText;
  const postView = document.getElementById(`viw${id}`).innerText;
  openMsgId.innerHTML = "";

  const obj = {"title": postTitle, "postView": postView};
  console.log("ooooo", obj);
  openMsgArr.push(obj);
  console.log(openMsgArr);

  document.getElementById("openMsgNum").innerText = openMsgArr.length;

  for (let i = 0; i < openMsgArr.length; i++){
   
   let element = openMsgArr[i];

   console.log(element);
    openMsgId.innerHTML  += `
  <div class="bg-white text-black p-3 rounded-md flex justify-between items-center mt-5">
                <div class="w-[79%]">
                  ${element.title}
                </div>
                <div >
                  <i class="fa-solid fa-eye"></i>
                        <span>${element.postView}</span>
                </div>
  `
  }
  
}



const latestPostContainer = document.getElementById('latestPoat');
const displayLatestPost = data =>{
     console.log(data);
  data.forEach(latestPost =>{
        console.log(latestPost);
        const latestPostCard = document.createElement('div');
        latestPostCard.classList=` p-5 bg-slate-300 border border-slate-700 rounded-md`;
        latestPostCard.innerHTML=`
        <div class="card card-compact  bg-base-100 shadow-xl">
            <figure><img class="" src="${latestPost.cover_image}" alt="Shoes" /></figure>
            <div class="card-body">
              <div>
                <i class="fa-regular fa-calendar-days"></i>
                <span>${latestPost.author.posted_date}</span>
              </div>
              <h2 class="card-title">${latestPost.title}</h2>
              <p>${latestPost.description}</p>
              <div class="flex items-center gap-5">
                <div ><img class="w-10 h-10 rounded-full" src="${latestPost.profile_image}" alt=""></div>
                <div>
                  <h1>${latestPost.author.name}</h1>
                  <p>${latestPost.author.designation}</p>
                </div>
              </div>
            </div>
          </div>
        `;
      latestPostContainer.appendChild(latestPostCard);
      })
    }

    const search = () =>{
      loading();
      const searchTxt = document.getElementById('search-field').value;
      displayPost([]);
      postJson(searchTxt);
    }
    const loading = ()=> {
      const loadId = document.getElementById('load');
      loadId.classList.remove('hidden')
      setInterval(()=>{
          loadId.classList.add("hidden")
       
      }, 2000

      )
      
    }

    postJson("")
    latestJson()