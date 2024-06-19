'use strict'

const
    Utils = require('./utils'),
    request = require('request'),
    UIDGenerator = require('uid-generator'),
    uidgen = new UIDGenerator(),
    path = require('path'),
    fs = require('fs')
;

const {createPool} = require('mysql2');
const conn = createPool({
    host:"localhost",
    user:"root",
    password:"Chance17121157!",
    database:"soccerdrills",
    port:3306,
});
  

module.exports = class Admin extends Utils{

    getToken(callback){
        if (typeof callback!='function') callback = function(){};
        uidgen.generate((err, uid) => {
            if (err) throw err;
            callback(uid);
        });
    }

    lets_test_socketIO(options,callback){
        if (typeof callback!='function') callback = function(){};

        return callback(options);
    }

    get_user_information(options,callback){
        if (typeof callback!='function') callback = function(){};

        let url = 'https://ip.nf/me.json';
        request(url,(error, response, body)=>{
            // console.log(response);
            // console.log(body);
            let motherData = {};
            let userInfo = JSON.parse(response.body);

            return callback(userInfo);
            /** -----> Needed for YELP Api
             * Client ID: oaOwNTt9uIT5DXPzhrjhwA
             * API Key: 1HqRCD2Nedx90EHJDRMTLqqHgGaWjkVcosjXFZMwighBv2bx2Nuy0bKCYwRLDFMw-Icba-BQ_8J1d530WmGc_2oXXHR68aS67sYjExHSAHLKgae5aNEOUh7mof4JYHYx
             * 
             * latitude
             * longitude
             * 
             */
            // -----> Resturants: https://api.yelp.com/v3/businesses/search?&latitude=${userInfo.ip.latitude}&longitude=${userInfo.ip.longitude}&categories=restaurants,all
            // -----> Activities: https://api.yelp.com/v3/businesses/search?&latitude=${userInfo.ip.latitude}&longitude=${userInfo.ip.longitude}&categories=active,all
            // -----> Misc: 
            let options = {
                'method': 'GET',
                'url': `https://api.yelp.com/v3/businesses/search?&latitude=${userInfo.ip.latitude}&longitude=${userInfo.ip.longitude}&categories=restaurants,all`,
                'headers': {
                  'Authorization': 'Bearer 1HqRCD2Nedx90EHJDRMTLqqHgGaWjkVcosjXFZMwighBv2bx2Nuy0bKCYwRLDFMw-Icba-BQ_8J1d530WmGc_2oXXHR68aS67sYjExHSAHLKgae5aNEOUh7mof4JYHYx'
                }
            };
            // console.log(options.url);
            request(options,(error, response, body)=>{
                if (error) throw new Error(error);
                // console.log(response.body);
                let resultFood = JSON.parse(response.body);
                motherData.food = resultFood;

                options.url = `https://api.yelp.com/v3/businesses/search?&latitude=${userInfo.ip.latitude}&longitude=${userInfo.ip.longitude}&categories=active,all`
                // console.log(options.url);
                request(options,(error, response, body)=>{
                    if (error) throw new Error(error);
                    // console.log(response.body);   
                    let resultFun = JSON.parse(response.body);
                    motherData.activities = resultFun;

                    // console.log(JSON.stringify(motherData));

                    return callback(motherData);
                });
            });
        });
    }

    register_user(options,callback){
        let self=this;
        if (typeof callback!='function') callback = function(){};
        
        var registered_ppl;
        // -----> Give me the list off registered ppl
        fs.readFile(path.resolve('registered.json'), function (error, content) {
            if(error){
                // console.log(error);
                return callback(self.simpleFail('Error registering'));
            }
            registered_ppl = JSON.parse(content);

            // To add or not to add
            if(!registered_ppl[options.email]){
                registered_ppl[options.email] = options;
            }
            else{
                return callback(self.simpleFail('Already registered'));
            }

            // -----> Register them peeps
            var jsonContent = JSON.stringify(registered_ppl);
            fs.writeFile(path.resolve('registered.json'), jsonContent, 'utf8', function (err) {
                if (err) {
                    // console.log(err);
                    return callback(self.simpleFail('Error registering'));
                }
                return callback(self.simpleSuccess('Registration request complete',options));
            });    
        });

    }


    store_user_blog_post(postData,callback){
        let self=this;
        if (typeof callback!='function') callback = function(){};

        // -----> Give me the list of blog posts
        fs.readFile('blogPosts.json', function (error, content) {
            if(error){
                // console.log(error);
                return callback(self.simpleFail('Error reading blog post',postData));
            }
            let blog_posts_data = JSON.parse(content);
            console.log(blog_posts_data);
            
            //find max id of blog list data
            let maxId = 0;
            for(let posts in blog_posts_data){
                let post= blog_posts_data[posts]
                console.log(posts);
                console.log("posts");

                if(posts > maxId){
                    maxId = posts;
                }

                for(let postInfo in post){
                    console.log(postInfo)
                    console.log("postInfo");
                    console.log(post[postInfo])
                    console.log("post value");
                }
                
            }
            console.log(maxId);
            console.log("maxID");
            // giving post a correct id
            postData.id = parseInt(maxId) +1;
            blog_posts_data[parseInt(maxId)+1] = postData;
            console.log(blog_posts_data);
            console.log("blog posts");

            

            //-----> Register them peeps
            console.log("made it to admin.js");
            var jsonContent = JSON.stringify(blog_posts_data);
            fs.writeFile('blogPosts.json', jsonContent, 'utf8', function (err) {
                if (err) {
                    console.log(err); 
                    return callback(self.simpleFail('Error storing blog posts'));
                }
                console.log("wahhhooooo")
                return callback(self.simpleSuccess('Successfully stored blog posts',postData));
            });    
        });

    };

    load_users_blog_posts(callback){
        let self=this;
        console.log("made it to load_users_blog_posts")
        if (typeof callback!='function') callback = function(){};

         // -----> Give me the list of blog posts
         fs.readFile('blogPosts.json', function (error, content) {
            if(error){
                // console.log(error);
                return callback(self.simpleFail('Error reading blog posts',postData));
            }
            let blog_posts_data = JSON.parse(content);
            console.log(blog_posts_data);
           return callback(self.simpleSuccess("Successfully got blog posts",blog_posts_data)); 
           
        });

    };

    load_drills_dropdown(callback){
        let self=this;
        console.log("made it to load_drills_dropdown")
        if (typeof callback!='function') callback = function(){};
         conn.query('select * from code',(err,result,fields)=>{
            if(err){
                return callback(self.simpleFail('Error loading drills ',err));
            }
            //console.log(result);
            return callback(self.simpleSuccess("Successfully got drills ",result));
        });   

    };
}
