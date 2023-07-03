let blog_posts_data = {};

/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){
    //socket calls
    socket.emit("load blog posts");
    socket.on("blog post stored",onBlogPostStored);
    socket.on("blog posts loaded",onBlogPostsLoaded);

    $('.btnPost').click(onPostClicked);
    $('.btnClear').click(onClearClicked);
    $('.btnContact').click(onContactClicked);
    $('.btnCancel').click(onCancelClicked);
    $('.btnSend').click(onSendClicked);
    
}

function onBlogPostsLoaded(data){
    console.log("blog posts loaded");
    console.log(data);
    blog_posts_data = data.data;

    renderBlogPosts()
}
function onBlogPostStored(data){
    console.log("blog post stored response");
    console.log(data);
}

// opens modal
function onContactClicked(){
    let modal = document.getElementById("popup");

    modal.classList.add("open-modal");

}


function onSendClicked(){
    var name = document.getElementsByName('contactName')[0].value;
    var email = document.getElementsByName('contactEmail')[0].value;
    var message = document.getElementsByName('emailMessage')[0].value;
    var nameErrorFlag = false;
    var emailErrorFlag = false;
    var messageErrorFlag = false;
    var nameErrorMsg = "Please enter in your name!";
    var emailErrorMsg = "Please enter in a valid Email!";
    var messageErrorMsg = "Please type in a message!"; 

    nameErrorFlag = textboxErrorHandler(name);
    messageErrorFlag = textareaErrorHandler(message);

    if(nameErrorFlag == true){
        console.log("enter in your name");

    }else if(messageErrorFlag == true){
        console.log("type your message");
    }else if(nameErrorFlag == false && messageErrorFlag == false){
        console.log("Sent!")
    }



}

// closes modal
function onCancelClicked(){
    let modal = document.getElementById("popup");

    modal.classList.remove("open-modal");
}

/**
 * Logic what to do once submit is clicked
 */
function onPostClicked(){
    var name = document.getElementsByName('blogName')[0].value;
    var post = document.getElementsByName('blogPost')[0].value;
    var nameErrorFlag = false;
    var postErrorFlag = false;
    var nameErrorMsg = "Please enter in your name!";
    var postErrorMsg = "Please type in a post!";

    nameErrorFlag = textboxErrorHandler(name);
    postErrorFlag = textareaErrorHandler(post);


    // post error message if there is no name
    if(nameErrorFlag == true)
    {
        document.getElementById("formError").innerText = nameErrorMsg;
        document.getElementById("formError").style.visibility = "visible";

    }else if(postErrorFlag == true){
        document.getElementById("formError").innerText = postErrorMsg;
        document.getElementById("formError").style.visibility = "visible";

    }else if(nameErrorFlag == false && postErrorFlag == false)//posts the post on the blog page
    {
        $(".blog-container").prepend(
            `<div class="blogPost">` +
                `<div class="postName">`+
                    `<p>${name}</p>`+
                `</div>`+
                `<div class="post">`+
                    `<p>${post}</p>`+
                `</div>`+
            `</div>`
        );
        document.getElementsByName('blogName')[0].value = "";
        document.getElementsByName('blogPost')[0].value = "";
        document.getElementById("formError").style.visibility = "hidden";

        // validation succesfull sending post to server to store in file
        let postData = {
            name:name,
            post:post
        };
        socket.emit("store blog post",postData);
    }
    
}

function textboxErrorHandler(textboxValue){
    var errorFlag = false;
    var name = textboxValue;

    //checks to see if a name was typed in 
    if(name == "")
    {
        errorFlag = true;
        
    }else
    {
        //loops through name to make sure its not just spaces
        for(let i = 0; i < name.length; i++) 
        {
            if(name[i] == " ")
            {
                errorFlag = true; 
            //breaks out when character is found
            }else                                           
            {
                errorFlag = false;
                // document.getElementById("formError").style.visibility = "hidden";
                break;          
            }
        }
    }
    
    return errorFlag

}

function textareaErrorHandler(textareaValue){
    var errorFlag = false;
    var post = textareaValue;
    
    //checks the post
    if(post == "")                                      
    {
        errorFlag = true;
        errorMsg = "Please enter in a post!";
    }else
    {
        //loops through the post making sure its not just spaces
        for(let i = 0; i < post.length; i++)            
        {
            if(post[i] == " ")
            {
                errorFlag = true;
                errorMsg = "Please enter in a post!";
            }else
            {
                errorFlag = false;
                // document.getElementById("formError").style.visibility = "hidden";
                break;
            }

        }
    }

    return errorFlag

}


function onClearClicked(){
    //clears textbox and textarea
    document.getElementsByName('blogName')[0].value = "";
    document.getElementsByName('blogPost')[0].value = "";
    document.getElementById("formError").style.visibility = "hidden";
    
}

function renderBlogPosts(){
    let html = "";
    for(let posts in blog_posts_data){
        let post= blog_posts_data[posts]
        console.log(posts);
        console.log("posts");
        let name = post.name;
        let postBody = post.post;

        // for(let postInfo in post){
        //     console.log(postInfo)
        //     console.log("postInfo");
        //     console.log(post[postInfo])
        //     console.log("post value");

            html = `<div class="blogPost">` +
                        `<div class="postName">`+
                            `<p>${name}</p>`+
                        `</div>`+
                        `<div class="post">`+
                            `<p>${postBody}</p>`+
                        `</div>`+
                    `</div>` + html;
        // }
        
    }

    $(".blog-container").prepend(html);
}

/**
 * All the page requirements that need to be loaded from the start
 */
function init(){
    initHandlers();
}



/**
 * Setup everything on page loaded
 */
$(document).ready(function(){
     init();
});