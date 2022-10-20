/**
 * Event handelers that call certain methods when certain assets
 * are clicked or certain events are complete
 */
function initHandlers(){
    $('.btnPost').click(onPostClicked);
    $('.btnClear').click(onClearClicked);
    
}



/**
 * Logic what to do once submit is clicked
 */
function onPostClicked(){
    var name = document.getElementsByName('txtName')[0].value
    var post = document.getElementsByName('comments')[0].value
    var errorFlag = false;
    var errorMsg = "";

    //checks to see if a name was typed in 
    if(name == "")
    {
        errorFlag = true;
        errorMsg = "Please type in your name! ";
    }else
    {
        //loops through name to make sure its not just spaces
        for(let i = 0; i < name.length; i++) 
        {
            if(name[i] == " ")
            {
                errorFlag = true;
                errorMsg = "Please type in your name! "; 
            //breaks out when character is found
            }else                                           
            {
                errorFlag = false;
                break;          
            }
        }
        if(errorFlag == false)
        {
            //checks the post
            if(post == "")                                      
            {
                errorFlag = true;
                errorMsg = "Please type your post! ";
            }else
            {
                //loops through the post making sure its not just spaces
                for(let i = 0; i < post.length; i++)            
                {
                    if(post[i] == " ")
                    {
                        errorFlag = true;
                        errorMsg = "Please type your post! ";
                    }else
                    {
                        errorFlag = false;
                        break;
                    }

                }
            }
                
        }
    }

    // post error message if there is no name or post
    if(errorFlag == true)
    {
        alert(errorMsg);
    }else //posts the post on the blog page
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
        document.getElementsByName('txtName')[0].value = "";
        document.getElementsByName('comments')[0].value = "";
    }
    
}

function onClearClicked(){
    //clears textbox and textarea
    document.getElementsByName('txtName')[0].value = "";
    document.getElementsByName('comments')[0].value = "";
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