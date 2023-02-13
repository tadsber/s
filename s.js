function e(id) { return document.getElementById(id) }
function show(id) { e(id).style.display = 'block'}
function hide(id) { e(id).style.display = 'none'}
function q(query) { return document.querySelector(query) }
function qa(query) { return document.querySelectorAll(query) }
function qe(el, query) { return el.querySelector(query) }
function qea(el, query) { return el.querySelectorAll(query) }
function t(el, text) { el.innerText = text || '' }
function tg(el) { return el.innerText }
function add(el, child) { el.append(child) }
function sadd(el, child) { el.prepend(child) }
function c(el) { return document.createElement(el) }
function a(el, atr, val) { el.setAttribute(atr, val) }
function ga(el, atr) { el.getAttribute(atr) }
function ao(el, obj) { for(atr in obj) { el.setAttribute(atr, obj[atr].replace(/_/g, '-')) } }
function ar(el, atr) { el.removeAttribute(atr) }
function s(el, key, value) { el.style[key] = value }
function ss(el, style) { el.style = style }
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
function uo(object, key, value) {

    let path = key.split('.')

    if(path.length > 1) {
        for(p in path) {
            if(!object[path[p]]) { object[path[p]] = {} }
            if(p === path.length - 1) {
                object
            }
        }
    }
    
}
function so(obj) {
    var st = ''
    for(s in obj) { st += s + ':' + obj[s] + '; ' }
    return st.replace(/_/g, '-')
}
function ce(obj) { 
    const el = c(obj.e || 'div')
    obj.id ? a(el, 'id', obj.id) : null 
    obj.cl ? a(el, 'class', obj.cl) : null
    obj.t ? t(el, obj.t) : null
    obj.a ? ao(el, obj.a) : null
    obj.so ? ss(el, so(obj.so)) : null
    if(obj.c && obj.c.length) { for(ch of obj.c) { add(el,ce(ch)) } }
    return el
}

function obj(el) {
    var o = {}
    o.e = el.nodeName
    if(el.attributes.length) {
        o.a = {}
        for(attr of el.attributes) {o.a[attr.name] = attr.value}
    }
    if(el.children.length) {
        o.c = []
        for(ch of el.children) {o.c.push(objectify(ch))}
        const cln = el.cloneNode(true)
        const cl = cln.children.length
        for(var i = 0; i < cl; i++) { cln.children[0].remove() }
        if(cln.innerText && cln.innerText.length) { o.t = cln.innerText.trim()}
    }
    else if(el.innerText && el.innerText.length ) { o.t = el.innerText.trim()}
    return o
}

function lw(w) {
    for(i of w.head.items) { add(q('head'), ce(i))}
    var st = ''
    const se = c('style')
    for(s of w.head.styles) { add(se, s.s + '{' + so(s.o) + '}') }
    add(q('head'), se)
    t(q('title'), w.head.title || '')
    a(q('[name=description]'), 'content', w.head.description || '')
    add(document.head, ce(w.head.script))
    add(document.body, ce(w.body.script))
    for(e of w.body.main) { add(q('main'), ce(e))}
}

function mw(document) {
    var w = {
        head: {
            title: document.querySelector('title').innerText,
            description: document.querySelector('[name=description]').getAttribute('content'),
            items: document.head.children,
        },
        body: {
            main: document.querySelector('main').children
        }
    }

    return w
}

function mo(o = {}, objects = []) {
    let ob = o
    //iterate objects from array
    for(let i = 0; i < objects.length; i++) {
        //iterate properties of object
        let object = objects[i]
        for(prop in object) {
            //if property is not an object assign it
            if(typeof object[prop] !== 'object' ) {
                ob[prop] = object[prop]
            }
            else if(Array.isArray(object[prop])) {
                console.log('hooray, an array - what to do?')
            }
            //if it is itterate the object
            else {
                ob[prop] = mo(ob[prop], [object[prop]])
            }
        }
    }

    return ob
}

function coe(obj) {
    const el = ce({
        a: {o: JSON.stringify(obj)},
        t: obj.e
    })
    return el
}
