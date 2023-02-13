//returns element by ID
function e(id) { return document.getElementById(id) }

//changes elements display property
function show(id, d = 'block') { e(id).style.display = d }

//changes elements display property to none
function hide(id) { e(id).style.display = 'none' }

function q(query) { return document.querySelector(query) }

function qa(query) { return document.querySelectorAll(query) }

function qe(el, query) { return el.querySelector(query) }
function qea(el, query) { return el.querySelectorAll(query) }
function t(el, text) { el.innerText = text || '' }
function add(el, child) { el.append(child) }
function sadd(el, child) { el.prepend(child) }
function c(el) { return document.createElement(el) }
function ce(obj) { 
    const el = c(obj.e || 'div')
    obj.id ? a(el, 'id', obj.id) : null 
    obj.c ? a(el, 'class', obj.c) : null
    obj.t ? t(el, obj.t) : null
    obj.a ? ao(el, obj.a) : null
    obj.so ? ss(el, so(obj.so)) : null
    return el
}

function a(el, atr, val) { el.setAttribute(atr, val) }
function ao(el, obj) { for(atr in obj) { el.setAttribute(atr, obj[atr].replace(/_/g, '-')) } }
function ar(el, atr) { el.removeAttribute(atr) }

function s(el, key, value) { el.style[key] = value }
function ss(el, style) { el.style = style }
function so(obj) {
	var st = ''
	for(s in obj) { st += s + ':' + obj[s] + '; ' }
	return st.replace(/_/g, '-')
}

function ca(el, clas) { el.classList.add(clas) }
function cr(el, clas) { el.classList.remove(clas) }
function ct(el, clas) { el.classList.toggle(clas) }

function ih(el, html) {el.innerHTML = html}
function oh(el, html) {el.outerHTML = html}

function ds(key, value) { window.localStorage.setItem(key, value)}
function dg(key) { return window.localStorage.getItem(key)}
function dso(key, obj) { window.localStorage.setItem(key, JSON.stringify(obj))}
function dgo(key) { return JSON.parse(window.localStorage.getItem(key))}

function p(el) { return el.parentNode }
function si(el) { return p(el).children }

function obj(el) {
    var o = {}
    o.e = el.nodeName

    if(el.attributes.length) {
        o.a = {}
        for(attr of el.attributes) {
            o.a[attr.name] = attr.value
        }
    }

    if(el.children.length) {
        o.c = []
        for(ch of el.children) {
            o.c.push(objectify(ch))
        }

        const cln = el.cloneNode(true)

        const cl = cln.children.length

        for(var i = 0; i < cl; i++) {
            cln.children[0].remove()
        }
        
        if(cln.innerText && cln.innerText.length) {
            o.t = cln.innerText.trim()
        }

    }
    else if(el.innerText && el.innerText.length ) { 
        o.t = el.innerText.trim()
    }

    return o
}
