
async function getPostById (id) {
 
  const responcePost = await fetch ("https://jsonplaceholder.typicode.com/posts");
  const responseResultPost = await responcePost.json();
  
  const responseComment = await fetch ("https://jsonplaceholder.typicode.com/comments");
  const responseResultComment = await responseComment.json(); 

  if (id >= 1 && id <= 100) {

      const postsRes= responseResultPost.filter(post => post.id === id);
      
      for (const  post of postsRes) {
        const posts = document.querySelector(".post");
        const ul = document.createElement("ul");
        ul.innerHTML = `
                <li> id:  ${post.id} </li>
                <li> userId:  ${post.userId}</li>
                <li> title:  "${post.title} "</li>
                <li> body:  "${post.body}" </li>
            `;
        posts.appendChild(ul);
      }
      
      const button = document.createElement("button")
      button.type = 'button';
      button.innerHTML = 'Коментарі';
      posts.appendChild(button);

      button.onclick = function () {
        const ul = document.querySelector(".comment");
        const commentsRes = responseResultComment.filter(comment => comment.postId === id);
        
        for (const  comment of commentsRes) {
            const li = document.createElement("li");
            li.innerHTML=`
                postId: ${comment.postId},
                id:  ${comment.id},
                name:  "${comment.name}",
                email:  "${comment.email}",
                body: "${comment.body}"
            `;
            ul.appendChild(li);
        }
      }
  } 

};

getPostById(18)

const formElement = document.getElementById('form');

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(formElement);
  const postId = formData.get('value');
  getPostById(postId)
});