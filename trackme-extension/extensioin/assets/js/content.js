console.log('content')

const server = 'https://darktracker.xyz/';

var scanning = false;
const descriptions = {
    'Sneaking': 'You attempt to purchase something, but somewhere in the purchasing journey the site sneaks an additional item into your basket, often through the use of an opt-out radio button or checkbox on a prior page.',
    'Urgency': 'Urgency promotes action by giving customers an incentive to act quickly. You can create urgency by running time-limited or quantity-limited sales. Customers want free shipping. Use it as a tool to create urgency by offering it only when customers take quick action.',
    'Scarcity': 'Tries to increase the value of something by making it appear to be limited in availability.',
    'Forced Action': 'Forces a user to complete extra, unrelated tasks to do something that should be simple.',
    'Misleading':'Aims to deceptively incline a user towards one choice over the other.',
    'Forced Enrollment':'When your free trial with a service comes to an end and your credit card silently starts getting charged without any warning. In some cases this is made even worse by making it difficult to cancel the membership.',
    'Forced Cookie':'The site invites you to read its “cookie policy,” (which, let’s be honest, you’re not going to do), and it may tell you the tracking is to “enhance” your experience — even though it feels like it’s doing the opposite.',
    'Price comparison':'The retailer makes it hard for you to compare the price of an item with another item, so you cannot make an informed decision.',
    'Tricky Question':"While filling in a form you respond to a question that tricks you into giving an answer you didn't intend. When glanced upon quickly the question appears to ask one thing, but when read carefully it asks another thing entirely.",
    'Hard To Cancel':'Hard to cancel'
};
const links = {
    'Sneaking': 'https://darktracker.xyz/types-pattern/sneak-basket',
    'Urgency': 'https://darktracker.xyz/types-pattern/urgency-scarcity',
    'Scarcity': 'https://darktracker.xyz/types-pattern/urgency-scarcity',
    'Forced Action': '#',
    'Misleading':'#',
    'Forced Enrollment':'https://darktracker.xyz/types-pattern/forced-continuity',
    'Forced Cookie':'https://darktracker.xyz/types-pattern/force-cookies',
    'Price comparison':'https://darktracker.xyz/types-pattern/price-comparison',
    'Tricky Question':"https://darktracker.xyz/types-pattern/trick",
    'Hard To Cancel':'#'
};
var indexArray=[];
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function add_tooltip_dark_tracker(){
    var styles  = '';

    styles +='.darktracker-show-tooltip {position: relative;display: inline-block;border-bottom: 1px dotted black;}';
    styles +='.darktracker-show-tooltip .darktracker-show-tooltiptext {visibility: hidden;width: 215px;background-color: #555;color: #fff;text-align: center;border-radius: 6px;padding: 5px 0;position: absolute;z-index: 1;bottom: 125%;left: 50%;margin-left: -110px;opacity: 0;transition: opacity 0.3s;font-size: 12px;}';
    styles +='.darktracker-show-tooltip .darktracker-show-tooltiptext::after {content: "";position: absolute;top: 100%;left: 50%;margin-left: -5px;border-width: 5px;border-style: solid;border-color: #555 transparent transparent transparent;}';
    styles +='.darktracker-show-tooltip:hover .darktracker-show-tooltiptext {visibility: visible;opacity: 1;}';

    /* Create style element */
    var css = document.createElement('style');
    // css.type = 'text/css';

    if (css.styleSheet) 
        css.styleSheet.cssText = styles;
    else 
        css.appendChild(document.createTextNode(styles));
      
    /* Append style to the head element */
    document.getElementsByTagName("head")[0].appendChild(css);
}

function scrape() {
    indexArray=[];
    // website has already been analyzed
    
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
    

    let url = server+'tracer/check/';
    // post to the web server
    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'items': array })
    })
    .then((resp) => resp.json()) // https://scotch.io/tutorials/how-to-use-the-javascript-fetch-api-to-get-data
    .then(function(data) {
  
        json=data.resp;
        var count = 0;
        var index = 0;
        var key_index='';
        for (var i = 0; i < elements.length; i++) {

            if (typeof json[i] != 'undefined' && json[i] != 0) {
                console.log(json[i]);
                key_index=indexArray[i]           
                if(elements[key_index]){
                    if(categoryListed[json[i]]!=undefined){
                        categoryListed[json[i]]=categoryListed[json[i]]+1;
                    }else{
                        categoryListed[json[i]]=1;
                    }                           
                    highlight(elements[key_index], json[i]);             
                    elements[key_index].style.background = "yellow";
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
            // Cookies
                // Data Privacy
            // Disguis ads


        // Working :
            // Data privacy on cookie
            // https://scamproof.net/


        // Scarcity ::: booking.com
        // Urgency ::: 
                    // [Count-down-timer] https://www.daraz.com.bd/ , 
                    // [limited-time-offer] https://www.samsung.com/in/offer/ , 
                    // [flash-sale] https://evaly.com.bd/campaign
        // Scarcity ::: 
                    // [Low-stock Message] https://www.6pm.com/p/champion-classic-graphic-tee-black/product/9481348/color/3
        // Misdirection ::: [Confirmshaming] https://www.orthofeet.com/ , https://www.fashionnova.com/
        // Pressure selling ::: https://www.pacificcoast.com/cart
        // Confirmshaming ::: [tricky] https://kidz.diligencecoder.com/elementor-1083/ , [Yes/no]https://neilpatel.com/blog/


        // Forced Action :: Forced enrollment : https://www.therealreal.com/
        // Forced Action :: https://www.telegraph.co.uk/finance/personalfinance/7722464/Web-discounts-Online-shoppers-need-to....html

        // Hard to cancel :: https://concerts.livenation.com/rollingstonepromo


        // Force Cookie :: https://www.softpedia.com/dyn-search.php?search_term=photoshop

        // Sneak to basket  ::: https://www.cellularoutfitter.com/collections/samsung-galaxy-a51-5g/products/premium-ultra-edge-sturdy-shockproof-bumper-transparent-case-black-clear-hr-qbbum-5ga51-clrbk
        
        document.querySelectorAll("form[class^='product-form']>[class^='upsale'],form[class^='product-form']>[class^='addon']").forEach(function(elm){            
            elm.style.background = "yellow";  
            if(categoryListed['Sneaking']!=undefined){
                categoryListed['Sneaking']=categoryListed['Sneaking']+1;
            }else{
                categoryListed['Sneaking']=1;
            }
            highlight(elm, "Sneaking"); //Sneak to basket
            count++;
        });

        // Price comparison prevention ::: https://www.sainsburys.co.uk/webapp/wcs/stores/servlet/gb/groceries/fruit-veg/fruitandveg-essentials?storeId=10151&langId=44&krypto=qHUPHxyW6mU%2FzD4%2F6f6w%2BRT%2FvuIMuATQBtusA4mwdTWHl2W1YPqVpWMIVWBJrXkNUaScUzIFfH9s6FrWwR58zXtF%2FUygm4o3GfrqrPjxrXMylyTcSgT75jU1I7E4sLr4NTSrWu7LZjU3hxbRe5FsmeCKxeypUFdrMMRB7cssNpD7CKJIynkj4NrQoIScl2Fo1aigxpaZxVN2xrfcH6V6Vg%3D%3D&ddkey=https%3Agb%2Fgroceries%2Ffruit-veg%2Ffruitandveg-essentials#langId=44&storeId=10151&catalogId=10241&categoryId=474593&parent_category_rn=12518&top_category=12518&pageSize=60&orderBy=TOP_SELLERS%7CSEQUENCING&searchTerm=&beginIndex=0&facet=
        document.querySelectorAll("div[class^='product']>div[class^='additional']").forEach(function(elm){            
            elm.style.background = "yellow";
            if(categoryListed['Price comparison']!=undefined){
                categoryListed['Price comparison']=categoryListed['Price comparison']+1;
            }else{
                categoryListed['Price comparison']=1;
            }
            highlight(elm, "Price comparison");
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
                        if(e.closest('form') && !e.closest('form').classList.contains('dark_tracked')){
                            e.style.background = "yellow";                            
                            if(categoryListed['Tricky Question']!=undefined){
                                categoryListed['Tricky Question']=categoryListed['Tricky Question']+1;
                            }else{
                                categoryListed['Tricky Question']=1;
                            }
                            e.closest('form').classList.add('dark_tracked');
                            highlight(e, "Tricky Question");
                            count++;
                        }                    
                    }
                }
            });
        });
        if(document.querySelectorAll(".dark_tracked_confshm").length>0){
            document.querySelectorAll(".dark_tracked_confshm").forEach(function(evt){
                evt.classList.remove('dark_tracked_confshm');
            });        
        }
        // Confirmshaming
        // https://neilpatel.com/blog/
        document.querySelectorAll('a,button').forEach(function(e){    
            if(e.parentElement.closest('div') && !e.parentElement.closest('div').classList.contains('dark_tracked_confshm')){        
                var text=e.textContent || e.innerText;
                var myRe = new RegExp('yes(, )*i( )*want( )*[a-z]*( )*to( )*do', 'i');
                var myArray = myRe.exec(text);
                if(myArray!=null){
                    // console.log('ttt',e.parentElement.closest('div'));
                    // console.log('chk',e.parentElement.closest('div').querySelectorAll('a,button'));
                    
                    e.parentElement.closest('div').querySelectorAll('a,button').forEach(function(item){
                        // if(!e.parentElement.closest('div').classList.contains('dark_tracked_confshm')){
                            var text2=item.textContent || item.innerText;
                            var myRe2 = new RegExp('no( )*thanks(, )', 'i');
                            var myArray2 = myRe2.exec(text2);
                            if(myArray2!=null){
                                e.style.background = "yellow";                            
                                if(categoryListed['Confirmshaming']!=undefined){
                                    categoryListed['Confirmshaming']=categoryListed['Confirmshaming']+1;
                                }else{
                                    categoryListed['Confirmshaming']=1;
                                }
                                e.parentElement.closest('div').classList.add('dark_tracked_confshm');
                                highlight(e.parentElement.closest('div'), "Confirmshaming");
                                count++;
                            }
                        // } 
                    });
            }

                // var text2=e.parentElement.closest('div').textContent || e.parentElement.closest('div').innerText;
                // var myRe2 = new RegExp('no( )*thanks(, )', 'i');
                // var myArray2 = myRe2.exec(text2);
                // e.style.background = "yellow";                            
                // if(categoryListed['Confirmshaming']!=undefined){
                //     categoryListed['Confirmshaming']=categoryListed['Confirmshaming']+1;
                // }else{
                //     categoryListed['Confirmshaming']=1;
                // }
                // e.parentElement.closest('div').classList.add('dark_tracked_confshm');
                // highlight(e.parentElement.closest('div'), "Confirmshaming");
                // count++;
            }
        });

        //https://concerts.livenation.com/rollingstonepromo
        // Hard to Cancel
        if(document.querySelectorAll(".darkTrackedHard").length>0){
            document.querySelectorAll(".darkTrackedHard").forEach(function(evt){
                evt.classList.remove('darkTrackedHard');                
            });        
        }
        document.querySelectorAll("div,p,span").forEach(function(e){  
            if(e.parentElement.closest('div') && !e.parentElement.closest('div').classList.contains('darkTrackedHard')){
                var text = e.textContent || e.innerText;
                var myRe = new RegExp("you\\s*can\\s*(opt\\s*out\\s*|cancel)\\s*of\\s*the\\s*(subscription|membership|registration)\\s*(benefit)?\\s*at\\s*any\\s*time\\s*by\\s*(contacting|calling)\\s*", 'i');
                var myArray = myRe.exec(text);
                
                if(myArray!=null){
                    e.style.background = "yellow";                            
                    if(categoryListed['Hard To Cancel']!=undefined){
                        categoryListed['Hard To Cancel']=categoryListed['Hard To Cancel']+1;
                    }else{
                        categoryListed['Hard To Cancel']=1;
                    }
                    e.parentElement.closest('div').classList.add('darkTrackedHard');
                    highlight(e.parentElement.closest('div'), "Hard To Cancel");
                    count++;
                }
            }
            
            
        });


        // Force action , Force Enrollment 
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
                                if(categoryListed['Forced Enrollment']!=undefined){
                                    categoryListed['Forced Enrollment']=categoryListed['Force Enrollment']+1;
                                }else{
                                    categoryListed['Forced Enrollment']=1;
                                }
                                highlight(e, "Forced Enrollment");
                                count++;
                            }else{                                
                                if(categoryListed['Forced Action']!=undefined){
                                    categoryListed['Forced Action']=categoryListed['Forced Action']+1;
                                }else{
                                    categoryListed['Forced Action']=1;
                                }                                
                                highlight(e, "Forced Action");
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
                        btn_text.toLowerCase().trim()=='agree and close'||
                        btn_text.toLowerCase().trim()=='accept all cookies' ||
                        btn_text.toLowerCase().trim()=='accept cookies & close'){        
                            b.classList.add('cookie-track-action');                    
                            return false;
                        }else if(btn_text.toLowerCase().trim()=="×" || 
                        btn_text.toLowerCase().trim()=="close" ||
                        btn_text.toLowerCase().trim()=="disagree"){ // More close texts will be added here..
                            hasClose++;
                            return false;
                        }
                    });

                    if(hasClose==0){
                        if(e.querySelector('.cookie-track-action') && !e.querySelector('.cookie-track-action').parentElement.closest('div').classList.contains('darkTrackedCookie')){
                            e.querySelector('.cookie-track-action').parentElement.closest('div').classList.add('darkTrackedCookie');
                            if(categoryListed['Forced Cookie']!=undefined){
                                categoryListed['Forced Cookie']=categoryListed['Forced Cookie']+1;
                            }else{
                                categoryListed['Forced Cookie']=1;
                            }
                            highlight(e, "Forced Cookie");
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

        if(document.querySelector("#insite_count_details")){
            document.querySelector("#insite_count_details").remove();
        }
        var g = document.createElement('div');
        g.id = 'insite_count_details';
        g.value = categoryListed;
        g.style.opacity = 0;
        g.style.position = 'fixed';
        document.body.appendChild(g);


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

function highlight(element, type)
{
    element.classList.add('insite-highlight');
    
        var body = document.createElement("span");
        body.classList.add('insite-highlight-body');
        body.classList.add('dark-tracker-trace');   
            
    
        var header = document.createElement("div");
        header.classList.add('dark-pattern-tracker-header');      
        header.classList.add('darktracker-show-tooltip'); 

        var headerText = document.createElement("span");
        headerText.innerHTML = capitalizeFirstLetter(type) + ' Pattern';
        headerText.setAttribute('onclick',"window.location.href='"+links[capitalizeFirstLetter(type)]+"'")
        header.style.fontSize="13px";
        header.style.lineHeight= '15px';
        header.style.fontWeight="bolder";
        header.style.position="relative";
        header.style.zIndex = "9999999999999999999999999";
        header.style.background = 'red';
        header.style.color = 'white';
        header.style.padding = '5px';
        header.style.borderRadius = '5px';
        header.style.cursor = 'pointer';
        header.appendChild(headerText);
        

        /* content */
        var content = document.createElement('span');
        content.classList.add('darktracker-show-tooltiptext');
        content.innerHTML = descriptions[capitalizeFirstLetter(type)];
        header.appendChild(content);

        body.appendChild(header);

        
    
    if(element.tagName.toLowerCase()=='img'){
        element.closest('div').insertBefore(body, undefined)
    }else{
        element.appendChild(body);
    }

}

function sendDarkPatterns(number,catInfo=false) {
    console.log(catInfo);
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
            var element2 = document.getElementById('insite_count_details');
            if (element && element2) {
                sendDarkPatterns(element.value,element2.value);
            }else if (element) {
                sendDarkPatterns(element.value);
            }
        }        
    }
);


window.onload = function(){
    add_tooltip_dark_tracker();

}
