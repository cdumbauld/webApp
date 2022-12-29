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
        errorMsg = "errorName";
    }else
    {
        //loops through name to make sure its not just spaces
        for(let i = 0; i < name.length; i++) 
        {
            if(name[i] == " ")
            {
                errorFlag = true;
                errorMsg = "errorName"; 
            //breaks out when character is found
            }else                                           
            {
                errorFlag = false;
                document.getElementById("errorName").style.visibility = "hidden";
                break;          
            }
        }
        if(errorFlag == false)
        {
            //checks the post
            if(post == "")                                      
            {
                errorFlag = true;
                errorMsg = "errorPost";
            }else
            {
                //loops through the post making sure its not just spaces
                for(let i = 0; i < post.length; i++)            
                {
                    if(post[i] == " ")
                    {
                        errorFlag = true;
                        errorMsg = "errorPost";
                    }else
                    {
                        errorFlag = false;
                        document.getElementById("errorPost").style.visibility = "hidden";
                        break;
                    }

                }
            }
                
        }
    }

    // post error message if there is no name or post
    if(errorFlag == true)
    {
        document.getElementById(errorMsg).style.visibility = "visible";
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
        document.getElementById(errorMsg).style.visibility = "hidden";
    }
    
}

function onClearClicked(){
    //clears textbox and textarea
    document.getElementsByName('txtName')[0].value = "";
    document.getElementsByName('comments')[0].value = "";
    document.getElementById("errorName").style.visibility = "hidden";
    document.getElementById("errorPost").style.visibility = "hidden";
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