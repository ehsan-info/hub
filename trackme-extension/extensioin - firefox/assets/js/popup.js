console.log('popup');

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
    'Misleading':'https://darktracker.xyz/types-pattern/misdirection',
    'Forced Enrollment':'https://darktracker.xyz/types-pattern/forced-continuity',
    'Forced Cookie':'https://darktracker.xyz/types-pattern/force-cookies',
    'Price comparison':'https://darktracker.xyz/types-pattern/price-comparison',
    'Tricky Question':"https://darktracker.xyz/types-pattern/trick",
    'Hard To Cancel':'#'
};

var dark_tracker_ext = localStorage.getItem('dark_tracker_ext');
var dark_tracker_term_condition = localStorage.getItem('dark_tracker_term_condition');


function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

function extractRootDomain(url) {
    var domain = extractHostname(url),
        splitArr = domain.split('.'),
        arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
        domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
        if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
            //this is using a ccTLD
            domain = splitArr[arrLen - 3] + '.' + domain;
        }
    }
    return domain;
}

window.onload = function() {    

    chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {        
        chrome.tabs.sendMessage(tabs[0].id, { message: 'popup_open' });
        // console.log(tabs)
        // console.log(extractRootDomain(tabs[0].url))
        if(typeof tabs[0] != 'undefined'){
            (document.getElementsByClassName('webstie-name')[0]).innerHTML=extractRootDomain(tabs[0].url);
        }
        
        if(dark_tracker_ext!=null){
            if(dark_tracker_ext==1){
                (document.getElementsByClassName('ext-dark-checkbox')[0]).checked = true;
            }else{
                (document.getElementsByClassName('ext-dark-checkbox')[0]).checked = false;
            }
        }else{
            (document.getElementsByClassName('ext-dark-checkbox')[0]).checked = false;
        } 
        if(dark_tracker_term_condition!=null){
            if(dark_tracker_term_condition==1){
                (document.getElementsByClassName('agree-term-condition-checkbox')[0]).checked = true;
            }else{
                (document.getElementsByClassName('agree-term-condition-checkbox')[0]).checked = false;
            }
        }else{
            (document.getElementsByClassName('agree-term-condition-checkbox')[0]).checked = false;
        } 
    });   



    

    (document.getElementsByClassName('analyze-button')[0]).onclick = function () {        
        if(dark_tracker_term_condition==null || dark_tracker_term_condition==0){            
            (document.getElementById('show_manual_button_error')).innerHTML = 'Please agree term and condition first';
            return false;
        }
        (document.getElementById('show_manual_button_error')).innerHTML='';
        chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {    
            // console.log(tabs)        
            // (document.getElementsByClassName('number')[0]).textContent ='<i class="fa fa-spinner fa-pulse"></i> Counting...';
            (document.getElementsByClassName('number')[0]).innerHTML ='<i class="fa fa-spinner fa-pulse"></i> Counting...';
            chrome.tabs.sendMessage(tabs[0].id, { message: 'analyze_site' });
        });
    };

    // (document.getElementsByClassName('link')[0]).onclick = function () {
    //     chrome.tabs.create({url: (document.getElementsByClassName('link')[0]).getAttribute('href')});
    // };

    (document.getElementsByClassName('ext-dark-checkbox')[0]).onchange=function(){
        if((dark_tracker_term_condition==null || dark_tracker_term_condition==0) && this.checked===true){
            console.log('aaa',dark_tracker_term_condition)
            this.checked=false;
            (document.getElementById('show_auto_analyze_error')).innerHTML = 'Please agree term and condition first';            
            return false;
        }
        (document.getElementById('show_auto_analyze_error')).innerHTML='';
        dark_tracker_ext = this.checked?1:0;
        localStorage.setItem('dark_tracker_ext',this.checked?1:0);
    };  
    (document.getElementsByClassName('agree-term-condition-checkbox')[0]).onchange=function(){
        console.log('t',dark_tracker_term_condition,this.checked)
        dark_tracker_term_condition = this.checked?1:0;
        localStorage.setItem('dark_tracker_term_condition',this.checked?1:0);
        console.log('e',dark_tracker_term_condition)
    };

    (document.querySelectorAll('a')).forEach(function(anchor){        
        anchor.onclick = function(){
                 chrome.tabs.create({ url: this.getAttribute('href') });
            };
    });
    
    if(dark_tracker_ext!=null && dark_tracker_ext==1){         
        setTimeout(function(){     
            console.log((document.getElementsByClassName('number')[0]).innerHTML=='n/a');        
            if((document.getElementsByClassName('number')[0]).innerHTML=='n/a'){
                chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {    
                    (document.getElementsByClassName('number')[0]).classList.add('auto-tracking-start');
                    (document.getElementsByClassName('number')[0]).innerHTML ='<i class="fa fa-spinner fa-pulse"></i> Counting...';
                    chrome.tabs.sendMessage(tabs[0].id, { message: 'analyze_site' });
                });        
            }  
        },1000);
    }

 };

 function tooltip_add(){
    console.log((document.getElementsByClassName('darktracker-show-tooltip')));
    (document.querySelectorAll('.darktracker-show-tooltip')).forEach(function(item){
        item.onclick = function(){
                 chrome.tabs.create({ url: this.getAttribute('url') });
            };
    });
 }

 function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message == 'update_current_count') {
            // (document.getElementsByClassName('number')[0]).textContent = request.count;
            var details='';
            if(request.countInfo!=false){
                details = "<table style='width:100%;'>";
                for (var key in request.countInfo) {
                    if (request.countInfo.hasOwnProperty(key)) {
                        // console.log(key + " -> " + request.countInfo[key]);
                        details += "<tr style='font-size:15px;cursor:pointer;' ><td class='darktracker-show-tooltip' url='"+links[capitalizeFirstLetter(key)]+"'><span class='darktracker-show-tooltiptext' >"+descriptions[capitalizeFirstLetter(key)]+"</span>" + capitalizeFirstLetter(key) +"</td><td>:"+request.countInfo[key]+"</td></tr>";
                    }
                }
                details += "</table>";
            }
            (document.getElementsByClassName('number')[0]).innerHTML = "Total Found : " + request.count + details;
            console.log(request,sender,sendResponse);
            if((document.getElementsByClassName('number')[0]).classList.contains('auto-tracking-start')){
                (document.getElementsByClassName('number')[0]).classList.remove('auto-tracking-start');
                (document.getElementsByClassName('number')[0]).classList.add('auto-tracking-complete');
            }
            tooltip_add();
        }
        // else if(request.message == 'get_tracker_setting'){
        //     var dark_tracker_ext = localStorage.getItem('dark_tracker_ext');
        //     chrome.tabs.sendMessage(tabs[0].id, { message: 'tracker_settings',autos_scane:dark_tracker_ext });
        // }
    }
);

