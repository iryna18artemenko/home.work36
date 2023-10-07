const formElement = document.getElementById('form');

formElement.addEventListener('submit', async function (e)  {
  e.preventDefault();
  const formData = new FormData(formElement);
  const postId = formData.get('value');
  
  if (postId >= 1 && postId <= 100) {  
    
    const responcePost = await fetch (`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const resultPost = await responcePost.json();
     
    const posts = document.querySelector(".post");  
    const ul = document.createElement("ul");
        ul.innerHTML = `
                <li> id:  ${resultPost.id} </li>
                <li> userId:  ${resultPost.userId}</li>
                <li> title:  "${resultPost.title} "</li>
                <li> body:  "${resultPost.body}" </li>
            `;
        posts.appendChild(ul);

      const button = document.createElement("button")
      button.type = 'button';
      button.innerHTML = 'Коментарі';
      posts.appendChild(button);

      button.onclick = async function () {
        
        const responseComment = await fetch (`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        const resultComment = await responseComment.json();

        const ul = document.querySelector(".comment");
        
        for (const  comment of resultComment) {
           
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
});