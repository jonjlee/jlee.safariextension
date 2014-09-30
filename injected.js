(function() {

console.log('Checking extensions for "' + location.hostname + '"');

var isGoogle = function() {
    if (!(/^(www)|(images)\.google\.com$/).test(location.hostname))
        return false; 
    if (['/','/search','/webhp'].indexOf(location.pathname) == -1)
        return false;
    return true;
}
var isGmail = function() {
    return (/^mail\.google\.com$/).test(location.hostname);
}
var isFirecracker = function() {
    return (/^med\.firecracker\.me$/).test(location.hostname);
}
var isD2L = function() {
    return (/^learn\.ouhsc\.edu$/).test(location.hostname);
}
var isYoutube = function() {
    return (/youtube.com$/).test(location.hostname);
}

if (!(window == top && (isGoogle() || isGmail() || isFirecracker() || isD2L() || isYoutube()))) { 
    return console.log('No extensions for this site.');
}

// Remove Google redirect links for web and image search. Taken from gDirectLinks.
if (isGoogle()) {
    console.log('Detected Google.');
    
    document.addEventListener('mousedown', function (e) {
        var et = e.target, lc = -1;
        while (et && !(et instanceof HTMLAnchorElement) && (3 > lc++))
            et = et.parentElement;
        if (!et || !et.href) 
            return;
        var link = et;
        e.stopPropagation();
        if (link.getAttribute('onmousedown')) {
            link.removeAttribute('onmousedown');
            if (link.pathname === '/url') {
                if ((/[?&]url=[^&]+/).test(link.search)) {
                    link.href = decodeURIComponent(link.search.split(/[?&]url=/)[1].split('&')[0]);
                }
            }
        }
    }, false);

} else {
    
    // keymaster.js
    var keymaster = function() {(function(a){function h(a,b){var c=a.length;while(c--)if(a[c]===b)return c;return-1}function i(a){var b,g,i,j,k;b=a.keyCode;if(b==93||b==224)b=91;if(b in d){d[b]=!0;for(i in f)f[i]==b&&(l[i]=!0);return}if(!l.filter.call(this,a))return;if(!(b in c))return;for(j=0;j<c[b].length;j++){g=c[b][j];if(g.scope==e||g.scope=="all"){k=g.mods.length>0;for(i in d)if(!d[i]&&h(g.mods,+i)>-1||d[i]&&h(g.mods,+i)==-1)k=!1;(g.mods.length==0&&!d[16]&&!d[18]&&!d[17]&&!d[91]||k)&&g.method(a,g)===!1&&(a.preventDefault?a.preventDefault():a.returnValue=!1,a.stopPropagation&&a.stopPropagation(),a.cancelBubble&&(a.cancelBubble=!0))}}}function j(a){var b=a.keyCode,c;if(b==93||b==224)b=91;if(b in d){d[b]=!1;for(c in f)f[c]==b&&(l[c]=!1)}}function k(){for(b in d)d[b]=!1;for(b in f)l[b]=!1}function l(a,b,d){var e,h,i,j;d===undefined&&(d=b,b="all"),a=a.replace(/\s/g,""),e=a.split(","),e[e.length-1]==""&&(e[e.length-2]+=",");for(i=0;i<e.length;i++){h=[],a=e[i].split("+");if(a.length>1){h=a.slice(0,a.length-1);for(j=0;j<h.length;j++)h[j]=f[h[j]];a=[a[a.length-1]]}a=a[0],a=g[a]||a.toUpperCase().charCodeAt(0),a in c||(c[a]=[]),c[a].push({shortcut:e[i],scope:b,method:d,key:e[i],mods:h})}}function m(a){var b=(a.target||a.srcElement).tagName;return b!="INPUT"&&b!="SELECT"&&b!="TEXTAREA"}function n(a){e=a||"all"}function o(){return e||"all"}function p(a){var b,d,e;for(b in c){d=c[b];for(e=0;e<d.length;)d[e].scope===a?d.splice(e,1):e++}}function q(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,function(){c(window.event)})}var b,c={},d={16:!1,18:!1,17:!1,91:!1},e="all",f={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},g={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220};for(b=1;b<20;b++)f["f"+b]=111+b;for(b in f)l[b]=!1;q(document,"keydown",i),q(document,"keyup",j),q(window,"focus",k),a.key=l,a.key.setScope=n,a.key.getScope=o,a.key.deleteScope=p,a.key.filter=m,typeof module!="undefined"&&(module.exports=key)})(this);};
    var bridgejs = 'window.addEventListener("message",function(e){if(e.origin != window.location.origin){return;} if(e.data){eval("("+e.data+")()");}},false); console.log("Bridged.");'
    var bridge = function(fns) {
        console.log('Adding inject hook.');
        document.addEventListener("DOMContentLoaded", function() {      
            // append bridge.js
            var s1 = document.createElement('script');
            var scpt = document.createTextNode(bridgejs);
            s1.appendChild(scpt);
            // s1.src = safari.extension.baseURI + 'bridge.js';
            document.body.appendChild(s1);
            console.log('Injected script.');

            // execute functions
            setTimeout(function() {
                for (var i in fns) {
                    window.postMessage(fns[i].toString(), window.location.origin);
                }
            }, 100);
        }, false);
    };

    if (isGmail()) {
        console.log('Detected GMail');
        var fns = [
            function() { window.document.styleSheets[0].addRule('td.Bu.y3', 'display:none'); },
            function() { console.log('Added GMail shortcuts.'); }
        ];  
        bridge(fns);

    } else if (isFirecracker()) {
        // Shortcuts for firecracker.me
        console.log('Detected firecracker.me.');

        var fns = [
            keymaster,
            function() {
                // Expand all
                key('ctrl+=, ⌥+=', function() {
                    jQuery('.more span').trigger('click');
                });
                // Fix # questions
                key('ctrl+/, ⌥+/', function() {
                    jQuery('#total-question-count').text(jQuery('.question-count').text() - jQuery('.current-question-number').text() + 1);
                });
                // Flag topic
                key('ctrl+enter, ⌥+enter', function() {
                    jQuery('#topic-flag a.btn').trigger('click');
                });
                // Hide quiz header, function() {
                key('ctrl+h', function() {
                    $('h3:contains("Question")').eq(1).toggle();
                    jQuery('hr.title').eq(0).toggle();
                });
            },
            function() {
                // Set page title to topic 
                var title = $('.topic-partial-wrapper #page-title h2').text();
                if (title) { document.title=title+' (FC)'; }
                else if ($('.quiz h3').text()) { document.title='Quiz (FC)'; }
            },
            function() {
                var checkThumbs = function() {
                    // Wait for quiz question to fully load by looking for the highlighted element.
                    var maxWait=3000, wait = 0;
                    if (jQuery('.highlight').length == 0) {
                        if (wait > maxWait) { 
                            console.log('Waited ' + maxWait + 'ms with no .highlight. Aborting.');
                            return;
                        }
                        setTimeout(checkThumbs, 500);
                        wait += 500;
                    } else {
                        // Replace thumbnail with actual image sized down
                        var thumbs=jQuery('.fancybox-button img');
                        if (thumbs) {
                            for (var i in thumbs) {
                                var thumb = thumbs.eq(i);
                                thumb.attr('src', thumb.parent().attr('href')).css('width', '250px');
                            }
                        }

                        // Fix/update remaining number of questions
                        jQuery('#total-question-count').text(jQuery('.question-count').text() - jQuery('.current-question-number').text() + 1);
                    }
                };
                // Check for quiz mode
                if (jQuery('.current-question-number')) {
                    // Show large thumbnails on answers
                    checkThumbs();

                    // Install handler for local navigation between questions
                    (function(history){
                        var pushState = history.pushState;
                        history.pushState = function(state) {
                            if (typeof history.onpushstate == "function") {
                                history.onpushstate({state: state});
                            }
                            // ... whatever else you want to do
                            // maybe call onhashchange e.handler
                            return pushState.apply(history, arguments);
                        }
                    })(window.history);
                    window.history.onpushstate = function() { checkThumbs(); }
                }
            },
            function() { console.log('Added firecracker.me shortcuts.'); }
        ];  
        bridge(fns);
    } else if (isD2L()) {
        console.log('Detected D2L.');

        var fns = [
            keymaster,
            function() {
                selectAnswer = function(choice) {
                    var $=(function(d){return function(e){var t={"#":"getElementById", ".": "getElementsByClassName", "@": "getElementsByName", "=": "getElementsByTagName", "*": "querySelectorAll"}[e[0]], l = d[t](e.slice(1)); return l.length < 2 ? l[0] : l }})(window.frames[0].frames[3].document),
                        answers=$('.d_t');

                    for (var i=0; i < answers.length; i++) { 
                        if (answers[i] && answers[i].querySelectorAll && answers[i].querySelectorAll('input') && answers[i].querySelectorAll('input').length > choice) {
                            answers[i].querySelectorAll('input')[choice].checked = true;
                        }
                    }
                    $('#z_y').click();
                };
                fillAnswer = function() {
                    var choices=prompt('Answers?').toLowerCase().split(/\n|,/).map(function(x) {
                            var c = x.charCodeAt(0);
                            return (c>=48&&c<=57) ? c-48 : ((c>=65&&c<=90) ? c-65 : c-97);
                        }), 
                        $=(function(d){return function(e){var t={"#":"getElementById", ".": "getElementsByClassName", "@": "getElementsByName", "=": "getElementsByTagName", "*": "querySelectorAll"}[e[0]], l = d[t](e.slice(1)); return l.length < 2 ? l[0] : l }})(window.frames[0].frames[3].document),
                        answers=$('.d_t');

                    for (var i=0; i < answers.length; i++) {
                        choice = choices[i] || 0;
                        if (answers[i] && answers[i].querySelectorAll && answers[i].querySelectorAll('input') && answers[i].querySelectorAll('input').length > choice) { 
                            answers[i].querySelectorAll('input')[choice].checked = true;
                        };
                        $('#z_y').click();
                    }
                };
                showCorrect = function() {
                    var numqs=parseInt(prompt('Number of questions?'));
                    var inv = function(n) {
                        np = [];
                        for (var i=1; i<=n; i++) {
                            if (p.indexOf(i) < 0) { np.push(i); }
                        }
                        return np;
                    };
                    qs=window.frames[0].document.querySelectorAll('.dlay_l')
                    p=[];
                    for (var i=0; i<qs.length; i++) {
                        var num = parseInt(qs[i].querySelectorAll('label strong')[0].textContent.slice(-2));
                        p.push(num);
                    }
                    alert(inv(numqs));
                };
                enableClick = function() {
                    d=window.frames[0].frames[3].document;
                    d.oncontextmenu=null;
                    d.onselectstart=null;
                };
            },
            function() { key('⌥+a', function(){ selectAnswer(0); }); },
            function() { key('⌥+b', function(){ selectAnswer(1); }); },
            function() { key('⌥+c', function(){ selectAnswer(2); }); },
            function() { key('⌥+d', function(){ selectAnswer(3); }); },
            function() { key('⌥+e', function(){ selectAnswer(4); }); },
            function() { key('⌥+f', function(){ selectAnswer(5); }); },
            function() { key('⌥+g', function(){ selectAnswer(6); }); },
            function() { key('⌥+h', function(){ selectAnswer(7); }); },
            function() { key('⌥+enter', function(){ fillAnswer(); }); },
            function() { key('⌥+m', function(){ enableClick(); }); },
            function() { key('⌥+/', showCorrect); },
            function() { console.log('Added D2L shortcuts.'); },
        ];
        bridge(fns);
    } else if (isYoutube()) {
        console.log('Detected YouTube.');

        var fns = [
            keymaster,
            function() { key('⌥+1', function(){ setSpeed(1); }  ); },
            function() { key('⌥+2', function(){ setSpeed(1.7); }); },
            function() { key('⌥+3', function(){ setSpeed(2); }  ); },
            function() { key('⌥+r', function(){ setDiv(); }); },
            function() {
                setSpeed = function(rate) {
                    vid = document.getElementsByClassName("video-stream html5-main-video")[0];
                    if(vid) { 
                        vid.playbackRate = rate; 
                        vid.tabIndex = 0;
                        vid.focus(); 
                    }
                };
            },
            function() { 
                var replaceAll = function(input,stringToFind,stringToReplaceWith){myRegExp=new RegExp(stringToFind, 'g');return input.replace(myRegExp, stringToReplaceWith);};
                getVideos = function(){
                    var formats = {
                        5:  {   itag: 5,    resolution: 224,    format: "FLV"},
                        6:  {   itag: 6,    resolution: 270,    format: "FLV"},
                        13: {   itag: 13,   resolution: 144,    format: "3GP"},
                        17: {   itag: 17,   resolution: 144,    format: "3GP"},
                        18: {   itag: 18,   resolution: 360,    format: "MP4"},
                        22: {   itag: 22,   resolution: 720,    format: "MP4"},
                        34: {   itag: 34,   resolution: 360,    format: "FLV"},
                        35: {   itag: 35,   resolution: 480,    format: "FLV"},
                        36: {   itag: 36,   resolution: 240,    format: "3GP"},
                        37: {   itag: 37,   resolution: 1080,   format: "MP4"},
                        38: {   itag: 38,   resolution: 2304,   format: "MP4"},
                        43: {   itag: 43,   resolution: 360,    format: "WebM"},
                        44: {   itag: 44,   resolution: 480,    format: "WebM"},
                        45: {   itag: 45,   resolution: 720,    format: "WebM"},
                        46: {   itag: 46,   resolution: 1080,   format: "WebM"},
                        82: {   itag: 82,   resolution: 360,    format: "MP4"},
                        83: {   itag: 83,   resolution: 240,    format: "MP4"},
                        84: {   itag: 84,   resolution: 720,    format: "MP4"},
                        85: {   itag: 85,   resolution: 520,    format: "MP4"},
                        100:{   itag: 100,  resolution: 360,    format: "WebM"},
                        101:{   itag: 101,  resolution: 480,    format: "WebM"},
                        102:{   itag: 102,  resolution: 720,    format: "WebM"}
                    };
                    var videos = new Array();
                    var flashVarsString = '';

                    try{
                        flashVarsString = document.getElementById('movie_player').attributes.getNamedItem('flashvars').value;
                        flashVarsString = flashVarsString.substring(flashVarsString.indexOf('url_encoded_fmt_stream_map=')+'url_encoded_fmt_stream_map='.length);
                        flashVarsString = flashVarsString.substring(0, flashVarsString.indexOf('&'));
                        flashVarsString = unescape(flashVarsString);
                        var streamFiles = flashVarsString.split(',');
                    }catch(err){
                        return videos;
                    }

                    for(i in streamFiles){
                        try{
                            streamData = streamFiles[i].split('&');
                            var url = '';
                            var sig = '';
                            var itag = 0;
                            for(y in streamData){
                                if(streamData[y].indexOf('itag=') == 0){
                                    itagData = streamData[y].split('=');
                                    itag = itagData[1];
                                }
                                if(streamData[y].indexOf('url=') == 0){
                                    urlData = streamData[y].split('=');
                                    url = unescape(urlData[1]);
                                }
                                if(streamData[y].indexOf('sig=') == 0){
                                    sigData = streamData[y].split('=');
                                    sig = unescape(sigData[1]);
                                }
                                
                            }
                            if(url != '' && itag != 0){
                                var video = {formatObject: formats[itag], url: url+'&signature='+sig};
                                videos.push(video);
                            }
                        }catch(err){
                            console.log(err);
                        }
                    }
                    return videos;
                }
                setDiv = function() {
                    var videos = getVideos();
                    var title = 'saved video';
                    // var titleH1 = document.getElementById('watch-headline-title');
                    // if(titleH1 != null){
                    //     title = titleH1.children[0].innerText;
                    // }
                    title = document.title;
                    var html = '<div style="-moz-border-radius: 5px; -webkit-border-radius: 5px; border-radius: 3px; border: 1px solid #CCC; margin-bottom: 10px; background-color: #fff;">';
                    html = html + '<div style="font-weight: bold; padding: 5px; border-bottom: 1px solid #CCC;">Click on the format to save the video as:</div>';
                    html = html + '<div style="padding: 5px; font-weight: bold;">';
                    var counter = 0;
                    if (videos.length == 0) { 
                        html = html + ' <i>None available</i>';
                    } else {
                        for(i in videos){
                            var video = videos[i];
                            if(video.url != '' && video.url.indexOf('http') == 0){
                                if(counter != 0) html = html + ' | ';
                                if(typeof video.formatObject == 'undefined'){
                                    html = html + '<span><a href="' + video.url + '&title='+replaceAll(title,'"|:','')+'">Unknown Format</a></span>';
                                }else{
                                    html = html + '<span><a href="' + video.url + '&title='+replaceAll(title,'"|:','')+'">' + video.formatObject.resolution + 'p ' + video.formatObject.format + '</a></span>';
                                }
                                counter++;
                            }
                        }
                    }
                    var wpDiv = document.getElementById('watch7-content');
                    if(wpDiv != null){
                        wpDiv.innerHTML = html + wpDiv.innerHTML;
                    }
                }
                setDiv();
            },
            function() { console.log('Added YouTube shortcuts.'); }
        ];  
        bridge(fns);
    }
}

})();