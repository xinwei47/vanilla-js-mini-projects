const postsContainer = document.querySelector('.posts');
const loader = document.querySelector('.loader');
const filterInput = document.querySelector('.search__input');

let limit = 8;
let page = 1;

// fetch data
displayPosts();

async function fetchData() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await response.json();
  //   console.log(data);
  return data;
}

// display posts
async function displayPosts() {
  const posts = await fetchData();
  posts.forEach((post) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <div class="post-number">${post.id}</div>
        <h3 class="post-title">${post.title}</h3>
        <p class="post-body">${post.body}</p>
    `;
    postsContainer.append(postDiv);
  });
}

// show loader fetch more posts
function loading() {
  loader.classList.add('show');

  setTimeout(() => {
    loader.classList.remove('show');
    setTimeout(() => {
      page++;
      displayPosts();
    }, 300);
  }, 1000);
}

// filter posts
function filterPosts(term) {
  console.log(term);
  const posts = document.querySelectorAll('.post');

  posts.forEach((post) => {
    const text = post.innerText.toLowerCase();
    if (text.indexOf(term) <= -1) {
      post.style.display = 'none';
    }
  });
}

window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    loading();
  }
});

filterInput.addEventListener('input', (event) => {
  //   console.log(event.target.value);
  filterPosts(event.target.value.toLowerCase());
});
