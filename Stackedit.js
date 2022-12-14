// ==UserScript==
// @name         Stackeditit
// @namespace    https://stackedit.io/app#providerId=githubWorkspace&owner=snowsum&repo=snowsum.github.io&branch=master&path=_posts%2F
// @version      0.1
// @description  Run a script when the URL matches https://stackedit.io/app#providerId=githubWorkspace&owner=snowsum&repo=snowsum.github.io&branch=master&path=_posts%2F
// @author       You
// @match        https://stackedit.io/*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Override the XMLHttpRequest class
    window.XMLHttpRequest = class MyXMLHttpRequest extends window.XMLHttpRequest {
        open(...args) {
            if (args[1].startsWith("https://api.github.com/user?access_token=")) {
                // apply fix as described by github
                // https://developer.github.com/changes/2020-02-10-deprecating-auth-through-query-param/#changes-to-make
                const segments = args[1].split("?");
                args[1] = segments[0]; // remove query params from url
                const token = segments[1].split("=")[1]; // save the token
                const ret = super.open(...args);
                this.setRequestHeader("Authorization", `token ${token}`); // set required header
                return ret;
            } else {
                return super.open(...args);
            }
        }
    }
})();
console.log("400 PAtched");




