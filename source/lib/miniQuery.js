/*!
 * minQuery
 */

 class minQuery {

  constructor(selector){
    this.findSelector(selector)
  }

  findSelector(selector) {
    if (selector.constructor == HTMLDocument){
      this.element = selector
    } else {
      if (this.findElement(selector)){
        this.element = this.findElement(selector)
      }
      this.findAttr(selector)
    }
  }

  findElement(selector){
    if (selector.charAt(0) !== '.' || selector.charAt(0) !== '#') {
      var tag = selector.replace(/[.].*|[#].*/g, '')
      return document.getElementsByTagName(tag)
    } else {
      return false
    }

  }

  findAttr(selector) {
    if (selector.includes('#')){
      var id = selector.replace(/\S*[#]/g, '')
      for (var i = 0; i<this.element.length; i++){
        if (this.element[i].id == id) {
          this.element = this.element[i]
        }
      }
    } else if (selector.includes('.')) {
      var klass = selector.replace(/\S*[.]/g, '')
      var matching = new Array
      for (var i = 0; i<this.element.length; i++){
        if (this.element[i].className == klass) {
          matching.push(this.element[i])
        }
      }
      this.element = matching
    } else {
      this.element = document.getElementsByTagName(selector)
    }
  }

}

// functions on selectors
HTMLElement.prototype.hide = function(){
  this.style.display = "none"
}

HTMLElement.prototype.show = function(){
  this.style.display = "initial"
}

HTMLElement.prototype.addClass = function(className){
  this.setAttribute('class', className)
}

HTMLElement.prototype.removeClass = function(className){
  this.removeAttribute('class', className)
}

HTMLElement.prototype.on = function(){
  var callback = arguments[1]
  this.addEventListener(arguments[0], callback)
}

HTMLElement.prototype.trigger = function(){
  var event = new Event(arguments[0])
  this.dispatchEvent(event)
}

HTMLDocument.prototype.ready = function(callback){
  if (this.readyState) {
    console.log('READYREADY')
    callback()
  } else {
    console.error('Error in the DOM!')
  }
}

// DOLLAR SIGN SELECTOR
function $(selector){
  var listener = new minQuery(selector)
  if (listener.element.constructor == Array && listener.element.length == 1){
    if (listener.element.length == 1){
      return listener.element[0]
    }
  } else {
    return listener.element
  }
}

$.ajax = function(http){
  var promise = new Promise( function(resolve, reject){
    var req = new XMLHttpRequest()
    req.open(http.type, http.url)
    req.send()

    req.onload = function() {
      if (this.status >= 200 && this.status < 300){
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
    req.onerror = function() {
      reject(this.statusText)
    }
  });
  promise.done = promise.then
  promise.fail = promise.catch
  return promise;
}


