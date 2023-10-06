function getPostById (id) {

  const result = {
    id, 
    post: [],
    comments: []
  };

  const posts = document.querySelector(".post");
  
  if (id >= 1 && id <= 100) {

      const ul = document.createElement("ul");
      ul.innerHTML = `
              <li> id:  ${result.post.id} </li>
              <li> userId:  ${result.post.userId}</li>
              <li> title:  "${result.post.title} "</li>
              <li> body:  "${result.post.body}" </li>
          `;
      posts.appendChild(ul);
    
      const button = document.createElement("button")
      button.type = 'button';
      button.innerHTML = 'Comments';
      button.className = 'btn-styled';
      posts.appendChild(button);

      button.onclick = function () {
        const ul = document.querySelector(".comment");

        for (const  comment of result.comments) {
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

  return new Promise((resolve)=> {
     fetch ("https:jsonplaceholder.typicode.com/posts")
      .then(data => data.json())
      .then (posts => {
        result.post= posts.filter(post => post.id === id)
        
        fetch ("https:jsonplaceholder.typicode.com/comments")  
        .then(data => data.json())
        .then (comments => {
          result.comments = comments.filter(comment => comment.postId === id)
          resolve(result);
        })
      })
  });
};



getPostById(1).then(data=> console.log(data))

// document.querySelector(".input").addEventListener("keyup", getPostById)