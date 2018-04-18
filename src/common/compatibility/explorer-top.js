var userAgent = navigator.userAgent,
    rMsie = /(msie\s|trident.*rv:)([\w.]+)/,
    rFirefox = /(firefox)\/([\w.]+)/,
    rOpera = /(opera).+version\/([\w.]+)/,
    rChrome = /(chrome)\/([\w.]+)/,
    rSafari = /version\/([\w.]+).*(safari)/;
var browser;
var version;
var staticHost = 'https://biding365-v1.oss-cn-hangzhou.aliyuncs.com/static/resource/';
var ua = userAgent.toLowerCase();

function uaMatch(ua) {
    var match = rMsie.exec(ua);
    if (match != null) {
        return { browser: "IE", version: match[2] || "0" };
    }
    var match = rFirefox.exec(ua);
    if (match != null) {
        return { browser: match[1] || "", version: match[2] || "0" };
    }
    var match = rOpera.exec(ua);
    if (match != null) {
        return { browser: match[1] || "", version: match[2] || "0" };
    }
    var match = rChrome.exec(ua);
    if (match != null) {
        return { browser: match[1] || "", version: match[2] || "0" };
    }
    var match = rSafari.exec(ua);
    if (match != null) {
        return { browser: match[2] || "", version: match[1] || "0" };
    }
    if (match != null) {
        return { browser: "", version: "0" };
    }
}

var browserMatch = uaMatch(userAgent.toLowerCase());
if (browserMatch.browser) {
    browser = browserMatch.browser;
    version = browserMatch.version;
}

function appendHtml() {
    var _bodyHeight = document.documentElement.clientHeight;
    var browserCompatibility = document.createElement("div");
    browserCompatibility.className = "browserCover";
    // browserCompatibility.style.height=_bodyHeight+"px";
    browserCompatibility.innerHTML = '<div class="exp-container">\
        <div class="pt120 pb112">\
            <p class="notice_title">Sorry,您使用的浏览器不兼容！</p>\
            <p class="notice_browser">浏览器类型：' + userAgent + '</p>\
        </div>\
        <p class="notice_cont">友情提醒：您所使用的浏览器太古老，为保证流畅使用，请升级浏览器！</p>\
        <P id=please>建议您点击下载以下浏览器使用...</P>\
        <div class="browsers-box clearFix">\
            <div class="browsers">\
                <div class=br1></div>\
                <a href="http://sw.bos.baidu.com/sw-search-sp/software/5fdb87edfe7cb/ChromeStandalone_60.0.3112.113_Setup.exe">Chrome下载</a>\
            </div>\
            <div class="browsers">\
                <div class=br2></div>\
                <a href="http://sw.bos.baidu.com/sw-search-sp/software/bbb6ad68388ae/Firefox-55.0.3.6445-setup.exe">Firefox下载</a>\
            </div>\
            <div class="browsers">\
                <div class=br3></div>\
                <a href="http://dlsw.baidu.com/sw-search-sp/soft/d3/12966/Safari_5.34.57.2.1417745549.exe">Safari下载</a>\
            </div>\
            <div class="browsers">\
                <div class=br4></div>\
                <a href="http://sw.bos.baidu.com/sw-search-sp/software/df4994e4a5afd/EOIE10-WindowsXP-x86.exe">IE10下载</a>\
            </div>\
            <div class="browsers">\
                <div class=br5></div>\
                <a href="http://sw.bos.baidu.com/sw-search-sp/software/b19156745c115/QQBrowser_Setup_9.6.12190.400.exe">QQ下载</a>\
            </div>\
            <div class="browsers">\
                <div class=br6></div>\
                <a href="http://sw.bos.baidu.com/sw-search-sp/software/501487d58cea4/360aqllq_9.1.0.356.exe">360下载</a>\
            </div>\
            <div class="browsers">\
                <div class=br7></div>\
                <a href="http://sw.bos.baidu.com/sw-search-sp/software/ab32e5ef13e6b/sogou_explorer_7.1.5.25639.exe">Sogou下载</a>\
            </div>\
        </div>\
        <a id="exit_item" href="javascript:void(0)">退出系统</a>\
    </div>';

    var browserCss = document.createElement("link");
    browserCss.rel = 'stylesheet';
    browserCss.href = staticHost + 'explorer-compatible/explorer.css?t=' + new Date().getTime();
    // browserCss.href = './src/common/compatibility/explorer.css?t=' + new Date().getTime();
    // browserCss.href ='explorer.css?t='+new Date().getTime();
    document.getElementsByTagName('head')[0].appendChild(browserCss);
    document.body.height = _bodyHeight + "px";
    document.body.style.overflow = "hidden";
    document.body.appendChild(browserCompatibility);
    var oExitItem = document.getElementById("exit_item");
    oExitItem.onclick = function() {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") != -1) {
            window.close();
            window.location.href = "about:blank";
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        };
    }
}

function judgeBrowser(newBrowserV) {
    var explorerelease = {
        ie: 9,
        firefox: 48,
        chrome: 52,
        opera: 38,
        safari: 8
    }
    if (newBrowserV) {
        var _explorerelease = newBrowserV;
        for (var prop in _explorerelease) {
            explorerelease[prop] = _explorerelease[prop];
        }
    }
    if (browser == 'IE') {
        if (parseInt(version) < explorerelease.ie) {
            appendHtml()
        }
        return
    } else if (browser == 'firefox') {
        if (parseInt(version) < explorerelease.firefox) {
            appendHtml()
        }
        return
    } else if (browser == 'chrome') {
        if (parseInt(version) < explorerelease.chrome) {
            appendHtml()
        }
        return
    } else if (browser == 'opera') {
        if (parseInt(version) < explorerelease.opera) {
            appendHtml()
        }
        return
    } else if (browser == 'safari') {
        if (parseInt(version) < explorerelease.safari) {
            appendHtml()
        }
        return
    } else {
        appendHtml()
    }
}
window.judgeBrowser = judgeBrowser;