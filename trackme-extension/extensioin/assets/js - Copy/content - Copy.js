console.log('content')

const server = 'https://darktracker.xyz/';
// const server = 'http://127.0.0.1:8000/';
var scanning = false;
const descriptions = {
    'Sneaking': 'Coerces users to act in ways that they would not normally act by obscuring information.',
    'Urgency': 'Places deadlines on things to make them appear more desirable',
    'Misdirection': 'Aims to deceptively incline a user towards one choice over the other.',
    'Social Proof': 'Gives the perception that a given action or product has been approved by other people.',
    'Scarcity': 'Tries to increase the value of something by making it appear to be limited in availability.',
    'Obstruction': 'Tries to make an action more difficult so that a user is less likely to do that action.',
    'Forced Action': 'Forces a user to complete extra, unrelated tasks to do something that should be simple.',

    'misleading':'some test text for misleading contents'
};
var indexArray=[];
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function scrape() {
    indexArray=[];
    // website has already been analyzed
    
    // if (document.getElementById('insite_count')) {
    //     return;            
    // }

    if(scanning)return;
    scanning=true;

    if(document.querySelectorAll(".dark-tracker-trace").length>0){
        document.querySelectorAll(".dark-tracker-trace").forEach(function(evt){
            evt.remove();
        });        
    }
    if(document.querySelector("#insite_count"))document.querySelector("#insite_count").remove();

    var categoryListed={};

    // aggregate all DOM elements on the page
    var elements = segments(document.body);

    // adding image alter 
    var imgs = document.images,alts=[];
    for (var j=0;i<imgs.length;j++) {
        if(imgs[j].getAttribute("alt"))elements.push(imgs[j]);
    }


    var array = [];

    for (var i = 0; i < elements.length; i++) {
        // console.log(elements[i].innerText)
        if (typeof elements[i].innerText == 'undefined' || elements[i].innerText.trim().length == 0) {
            if(elements[i].getAttribute("alt")){
                array.push(elements[i].getAttribute("alt").trim().replace(/\t/g, ' ')); 
                indexArray.push(i);
            }
            continue;
        }             
        array.push(elements[i].innerText.trim().replace(/\t/g, ' ')); 
        indexArray.push(i);

    }
    
// console.log(array,indexArray,elements)
// return false;
    // console.log('scraped data',array);
// data to be sent to the POST request


// console.log(document.querySelector("[class^='upsale']"));product-form
// console.log('we here',document.querySelectorAll("form[class^='product-form']>[class^='upsale'],form[class^='product-form']>[class^='addon']"));
// document.querySelectorAll("form[class^='product-form']>[class^='upsale'],form[class^='product-form']>[class^='addon']").forEach(function(elm){
//     console.log(elm);
// });
// return;

    // return false;
    let url = server+'tracer/check/';
    // post to the web server
    // console.log(elements);  
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'items': array })
    })
    .then((resp) => resp.json()) // https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
    .then(function(data) {
        // console.log(data.resp);
        // console.log(elements);    
        json=data.resp;
        var count = 0;
        var index = 0;
        var key_index='';
        for (var i = 0; i < elements.length; i++) {
            // if (typeof elements[i].innerText!='undefined' && elements[i].innerText.trim().length == 0) {
            //     continue;
            // }

            if (typeof json[i] != 'undefined' && json[i] != 0) {
                console.log(json[i]);
                key_index=indexArray[i]
                // console.log(i,elements[i],json[i])
                // highlight(elements[key_index], json[i]); 
                // console.log(key_index,elements[key_index]);               
                if(elements[key_index]){
                    // console.log(elements[key_index]);
                    if(categoryListed[json[i]]!=undefined){
                        categoryListed[json[i]]=categoryListed[json[i]]+1;
                    }else{
                        categoryListed[json[i]]=1;
                    }
                    // if(elements[key_index].tagName.toLowerCase()=='img'){
                    //     var content = document.createElement("DIV");
                    //     content.classList.add('dark-tracker-trace');
                    //     content.style.fontSize="10px";
                    //     content.style.fontWeight="bolder";

                    //     content.style.zIndex = "9999999999999999999999999";
                    //     content.style.position = 'absolute';
                    //     content.style.background = 'red';
                    //     content.style.color = 'white';
                    //     content.style.padding = '5px';
                    //     content.style.borderRadius = '5px';
                    //     content.style.cursor = 'pointer';

                    //     content.innerHTML=capitalizeFirstLetter(json[i]);
                    //     content.setAttribute("data-darkDefinition", descriptions[json[i]]);
                    //     // elm.prepend(content);
                    //     elements[key_index].closest('div').insertBefore(content, undefined)
                    // }else{
                    //     var content = document.createElement("DIV");
                    //     content.classList.add('dark-tracker-trace');

                    //     content.classList.add('show-dark-popup');

                    //     content.style.fontSize="10px";
                    //     content.style.fontWeight="bolder";

                    //     content.style.zIndex = "9999999999999999999999999";
                    //     content.style.position = 'absolute';
                    //     content.style.background = 'red';
                    //     content.style.color = 'white';
                    //     content.style.padding = '5px';
                    //     content.style.borderRadius = '5px';
                    //     content.style.cursor = 'pointer';

                    //     content.innerHTML=capitalizeFirstLetter(json[i]);
                    //     content.setAttribute("data-darkDefinition", descriptions[json[i]]);

                    //     highlight(elements[key_index], json[i]); 
                        
                    //     // elm.prepend(content);
                    //     elements[key_index].insertBefore(content, undefined)
                    // }        
                    highlight(elements[key_index], json[i]);             
                    elements[key_index].style.background = "yellow url('img_tree.png') no-repeat right top";
                    count++;
                }
            }
            index++;
        }

        

        //https://webtransparency.cs.princeton.edu/dark-patterns/

        // skipped : 
            // Misdirection
                // [popup => Confirmshaming = > Don’t leave! Stay and get an additional discount from RadioShack!] https://www.radioshack.com/collections/hot-products/products/3-band-amped-stereo-listener
                // Visual Interference              
                
            // Social proof
                // Activity Messages
                // Testimonials of Uncertain Origin
            // Obstruction
                // Hard to Cancel [https://www.1800flowers.com/About-Us-Terms-of-Use,]            
            // Forced Action
                // Forced enrollment [https://www.therealreal.com/]
            // Cookies
                // Data Privacy
            // Disguis ads


        // Working :
            // Data privacy on cookie
            // https://scamproof.net/


        // Misleading ::: booking.com
        // Urgency ::: 
                    // [Count-down-timer] https://www.daraz.com.bd/ , 
                    // [limited-time-offer] https://www.samsung.com/in/offer/ , 
                    // [flash-sale] https://evaly.com.bd/campaign
        // Scarcity ::: 
                    // [Low-stock Message] https://www.6pm.com/p/champion-classic-graphic-tee-black/product/9481348/color/3
        // Misdirection ::: [Confirmshaming] https://www.orthofeet.com/
        // Pressure selling ::: https://www.pacificcoast.com/cart
        // Confirmshaming ::: [tricky] https://kidz.diligencecoder.com/elementor-1083/


        // Forced Action :: Forced enrollment : https://www.therealreal.com/
        // Forced Action :: https://www.telegraph.co.uk/finance/personalfinance/7722464/Web-discounts-Online-shoppers-need-to....html


        // Force Cookie :: https://www.softpedia.com/dyn-search.php?search_term=photoshop

        // Sneak to basket  ::: https://www.cellularoutfitter.com/collections/samsung-galaxy-a51-5g/products/premium-ultra-edge-sturdy-shockproof-bumper-transparent-case-black-clear-hr-qbbum-5ga51-clrbk
        
        document.querySelectorAll("form[class^='product-form']>[class^='upsale'],form[class^='product-form']>[class^='addon']").forEach(function(elm){            
            elm.style.background = "yellow url('img_tree.png') no-repeat right top";
            var content = document.createElement("DIV");
            content.classList.add('dark-tracker-trace');
            content.style.fontSize="10px";
            content.style.fontWeight="bolder";
            content.innerHTML="Sneak to basket";

            if(categoryListed['Sneak to basket']!=undefined){
                categoryListed['Sneak to basket']=categoryListed['Sneak to basket']+1;
            }else{
                categoryListed['Sneak to basket']=1;
            }

            // elm.prepend(content);
            elm.insertBefore(content, undefined)
            count++;
        });

        // Price comparison prevention ::: https://www.sainsburys.co.uk/webapp/wcs/stores/servlet/gb/groceries/fruit-veg/fruitandveg-essentials?storeId=10151&langId=44&krypto=qHUPHxyW6mU%2FzD4%2F6f6w%2BRT%2FvuIMuATQBtusA4mwdTWHl2W1YPqVpWMIVWBJrXkNUaScUzIFfH9s6FrWwR58zXtF%2FUygm4o3GfrqrPjxrXMylyTcSgT75jU1I7E4sLr4NTSrWu7LZjU3hxbRe5FsmeCKxeypUFdrMMRB7cssNpD7CKJIynkj4NrQoIScl2Fo1aigxpaZxVN2xrfcH6V6Vg%3D%3D&ddkey=https%3Agb%2Fgroceries%2Ffruit-veg%2Ffruitandveg-essentials#langId=44&storeId=10151&catalogId=10241&categoryId=474593&parent_category_rn=12518&top_category=12518&pageSize=60&orderBy=TOP_SELLERS%7CSEQUENCING&searchTerm=&beginIndex=0&facet=
        document.querySelectorAll("div[class^='product']>div[class^='additional']").forEach(function(elm){            
            elm.style.background = "yellow url('img_tree.png') no-repeat right top";
            var content = document.createElement("DIV");
            content.classList.add('dark-tracker-trace');
            content.style.fontSize="10px";
            content.style.fontWeight="bolder";
            content.innerHTML="Price comparison";
            if(categoryListed['Price comparison']!=undefined){
                categoryListed['Price comparison']=categoryListed['Price comparison']+1;
            }else{
                categoryListed['Price comparison']=1;
            }
            // elm.prepend(content);
            elm.insertBefore(content, undefined)
            count++;
        });


        // Confirmshaming Tricky 
        if(document.querySelectorAll(".dark_tracked").length>0){
            document.querySelectorAll(".dark_tracked").forEach(function(evt){
                evt.classList.remove('dark_tracked');
            });        
        }
        document.querySelectorAll('form').forEach(function(e){            
            e.querySelectorAll('label,div,span,p').forEach(function(e){
                if(e.querySelector('input[type="checkbox"]')){
                    var text=e.textContent || e.innerText;
                    if(text.toLowerCase().search("please do not send")!=-1 && text.toLowerCase().search("please send me")!=-1){
                        console.log(e.closest('form'));
                        if(e.closest('form') && !e.closest('form').classList.contains('dark_tracked')){
                            e.style.background = "yellow url('img_tree.png') no-repeat right top";
                            var content = document.createElement("DIV");
                            content.classList.add('dark-tracker-trace');
                            content.style.fontSize="10px";
                            content.style.fontWeight="bolder";
                            content.innerHTML="Tricky Question";
                            if(categoryListed['Tricky Question']!=undefined){
                                categoryListed['Tricky Question']=categoryListed['Tricky Question']+1;
                            }else{
                                categoryListed['Tricky Question']=1;
                            }
                            e.closest('form').classList.add('dark_tracked')
                            e.insertBefore(content, undefined)
                            count++;
                        }                    
                    }
                }
            });
        });


        // Force action , Force Enrollment :: Hard to Cancel
        if(document.querySelectorAll(".darkTrackedForced").length>0){
            document.querySelectorAll(".darkTrackedForced").forEach(function(evt){
                evt.classList.remove('darkTrackedForced');
            });        
        }
        document.querySelectorAll("body>[class*='modal'],body>[class*='popup'],body>[class*='overlay']").forEach(function(e){
            if(e.querySelectorAll('a,button').length>0){
                if(e.parentElement.tagName=="BODY"){                  
                
                    var hasClose=0;
                    e.querySelectorAll('a,button').forEach(function(b){
                        var text = b.textContent || b.innerText;
                        // More close texts will be added here..
                        if(text.toLowerCase().trim()=="×" || 
                        text.toLowerCase().trim()=="close"|| 
                        text.toLowerCase().trim()=="disagree"){
                            hasClose++;
                            return false;
                        }                    
                    });
                    if(hasClose==0){
                        if(!e.classList.contains('darkTrackedForced')){
                            e.classList.add('darkTrackedForced');
                            if(e.querySelector('form')){
                                // console.log(e,e.querySelector('form'));
                                // console.log(e,e.parentNode,e.parentElement,e.parentElement.tagName);
                                e.style.background = "yellow url('img_tree.png') no-repeat right top";
                                var content = document.createElement("DIV");
                                content.classList.add('dark-tracker-trace');
                                content.style.fontSize="10px";
                                content.style.fontWeight="bolder";
                                content.innerHTML="Force Enrollment";
                                if(categoryListed['Force Enrollment']!=undefined){
                                    categoryListed['Force Enrollment']=categoryListed['Force Enrollment']+1;
                                }else{
                                    categoryListed['Force Enrollment']=1;
                                }
                                e.insertBefore(content, undefined);
                                count++;
                            }else{

                                e.style.background = "yellow url('img_tree.png') no-repeat right top";
                                var content = document.createElement("DIV");
                                content.classList.add('dark-tracker-trace');
                                content.style.fontSize="10px";
                                content.style.fontWeight="bolder";
                                content.innerHTML="Force Action";
                                if(categoryListed['Force Action']!=undefined){
                                    categoryListed['Force Action']=categoryListed['Force Action']+1;
                                }else{
                                    categoryListed['Force Action']=1;
                                }
                                e.insertBefore(content, undefined);
                                count++;

                            }   
                        }                 
                    }

                }
            }
        });

        // Cookies
        if(document.querySelectorAll(".darkTrackedCookie").length>0){
            document.querySelectorAll(".darkTrackedCookie").forEach(function(evt){
                evt.classList.remove('darkTrackedCookie');
            });        
        }
        document.querySelectorAll("body div").forEach(function(e){
            if(e.parentElement.tagName=='BODY'){
                var text=e.textContent || e.innerText;
                if(text.toLowerCase().search("cookies")!=-1){
                    var hasClose=0;
                    e.querySelectorAll("a,button").forEach(function(b){
                        var btn_text=b.textContent || b.innerText;
                        if(btn_text.toLowerCase().trim()=='accept & close' || 
                        btn_text.toLowerCase().trim()=='accept and close' || 
                        btn_text.toLowerCase().trim()=='agree & close' || 
                        btn_text.toLowerCase().trim()=='agree and close'){
                            return false;
                        }else if(btn_text.toLowerCase().trim()=="×" || 
                        btn_text.toLowerCase().trim()=="close" ||
                        btn_text.toLowerCase().trim()=="disagree"){ // More close texts will be added here..
                            hasClose++;
                            return false;
                        }
                    });

                    if(hasClose==0){
                        if(!e.classList.contains('darkTrackedCookie')){
                            e.classList.add('darkTrackedCookie');
                            e.style.background = "yellow url('img_tree.png') no-repeat right top";
                            var content = document.createElement("DIV");
                            content.classList.add('dark-tracker-trace');
                            content.style.fontSize="10px";
                            content.style.fontWeight="bolder";
                            content.style.color='black';
                            content.innerHTML="Force Cookie";
                            if(categoryListed['Force Cookie']!=undefined){
                                categoryListed['Force Cookie']=categoryListed['Force Cookie']+1;
                            }else{
                                categoryListed['Force Cookie']=1;
                            }
                            e.style.color="black";
                            e.insertBefore(content, undefined);
                            count++;                            
                        }                 
                    }

                }
            }
        });
        
        // store number of dark patterns
        if(document.querySelector("#insite_count")){
            document.querySelector("#insite_count").remove();
        }
        var g = document.createElement('div');
        g.id = 'insite_count';
        g.value = count;
        g.style.opacity = 0;
        g.style.position = 'fixed';
        document.body.appendChild(g);

        // sendDarkPatterns(g.value);          


        const item = { url: window.location.href, count:count, category:JSON.stringify(categoryListed) };

        sendDarkPatterns(count,categoryListed); 

        fetch(server+'tracer/saveTrack/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'items': item })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          scanning=false;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        

    })
    .catch(function (error) {
        console.log('POST: ' + error);
        // alert('POST: ' + error);
    });
    
}

function addToolTipItem(){
    document.querySelectorAll("div.show-dark-popup").forEach(function(elm){
        elm.onmouseover=function(evt){
            var content = document.createElement("DIV");
            content.classList.add('dark-tracker-trace-popup');
            content.style.position = 'absolute';
            content.style.background = 'white';
            content.style.color = 'black';
            content.style.padding = '5px';
            content.style.borderRadius = '5px';
            content.style.left = '0';
            content.style.border='1px solid red';
            content.innerHTML=elm.getAttribute("data-darkDefinition");
            elm.appendChild(content);
        };
        elm.onmouseout=function(evt){
            if(elm.querySelector('.dark-tracker-trace-popup')){
                elm.querySelector('.dark-tracker-trace-popup').remove();
            }
        };
    });
}

function highlight(element, type)
{
    element.classList.add('insite-highlight');
    
        var body = document.createElement("span");
        body.classList.add('insite-highlight-body');
        body.classList.add('dark-tracker-trace');
    
        var header = document.createElement("div");
        header.classList.add('dark-pattern-tracker-header');      
        header.classList.add('show-dark-popup');  
        var headerText = document.createElement("span");
        headerText.innerHTML = capitalizeFirstLetter(type) + ' Pattern';
        header.style.fontSize="10px";
        header.style.fontWeight="bolder";
        header.style.zIndex = "9999999999999999999999999";
        header.style.background = 'red';
        header.style.color = 'white';
        header.style.padding = '5px';
        header.style.borderRadius = '5px';
        header.style.cursor = 'pointer';
        header.setAttribute("data-darkDefinition", descriptions[type]);
        header.appendChild(headerText);
        body.appendChild(header);
    
        // /* content */
        // var content = document.createElement('div');
        // content.classList.add('modal-content');
        // content.innerHTML = descriptions[type];
        // body.appendChild(content);

    if(element.tagName.toLowerCase()=='img'){
        element.closest('div').insertBefore(body, undefined)
    }else{
        element.appendChild(body);
    }

    // var body = document.createElement("span");
    // body.classList.add('insite-highlight-body');

    // /* header */
    // var header = document.createElement("div");
    // header.classList.add('modal-header');
    // var headerText = document.createElement("h1");
    // headerText.innerHTML = type + ' Pattern';
    // header.appendChild(headerText);
    // body.appendChild(header);

    // /* content */
    // var content = document.createElement('div');
    // content.classList.add('modal-content');
    // content.innerHTML = descriptions[type];
    // body.appendChild(content);

    // element.appendChild(body);
}

function sendDarkPatterns(number,catInfo=false) {
    chrome.runtime.sendMessage({
        message: 'update_current_count',
        count: number,
        countInfo:catInfo
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == 'analyze_site') {            
            scrape();
        }
        else if (request.message == 'popup_open') {
            var element = document.getElementById('insite_count');
            if (element) {
                sendDarkPatterns(element.value);
            }
        }
        // else if (request.message == 'tracker_settings') {
        //     console.log(request);
        // }
    }
);


// window.onload = function(){
//     var dark_tracker_ext = localStorage.getItem('dark_tracker_ext');
//     console.log('sending tracker')
//     chrome.runtime.sendMessage({
//         message: 'get_tracker_setting'
//     });

// }
