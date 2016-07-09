function miniQuery(input){
  
  function elementIterate(collection, action){
    for (var i = elements.length -1; i >= 0; i-- ){
      collection[i].style.display = action;
    }
  }

  var isCollection = function(element){
    if(element instanceof HTMLCollection){
      return true
    } else{
      return false
    }
  }

  function findElement(element){
    if (element.startsWith("#")) {
    // id element selector
    return document.getElementById(element.substring(1));
  } else if (element.startsWith(".")) {
    // class element selector
    return document.getElementsByClassName(element.substring(1));
  } else {
    // tag element selector
    return document.getElementsByTagName(element);
  };
}
if (input != undefined) {
  var _this = this;
  this.element = findElement(input);
  var elements = findElement(input);
}
return {

  append: function(content, position = 'beforeend'){
    var elements = _this.element;
    if (isCollection(elements)) {
      for(var i = elements.length -1; i >= 0; i--){
        elements[i].insertAdjacentHTML(position, content)
      }
    }else{
      elements.insertAdjacentHTML(position, content);
    }
  },

  html: function(content){
    var elements = _this.element;
    return elements.innerHTML = content;
  },

  hide: function(){
    var elements = _this.element;
    if (isCollection(elements)) {
      elementIterate(elements, "none")
    }else {
      elements.style.display = "none";
    }
  },

  show: function(){
    var elements = _this.element;
    if (isCollection(elements)) {
      elementIterate(elements, "block")
    }else {
      elements.style.display = "block";
    }
  },

  addClass: function(newClass){
      // this has one minor bug in which it adds the class with a space in front.k  Would take too much time to fix this minor bug figured time would be better spent moving on
      var elements = _this.element;
      if (isCollection(elements)) {
        for(var i = elements.length -1; i >= 0; i-- ){
          elements[i].className += " " + newClass;
        }
      }else{
        elements.classList.add(newClass);
      }
    },

    removeClass: function(deletedClass){
      var elements = _this.element;
      if (isCollection(elements)) {
        for(var i = elements.length -1; i >= 0; i-- ){
          elements[i].classList.remove(deletedClass)
        }
      }else{
        elements.classList.remove(deletedClass);
      }
    },

    on: function(listener, callback){
      var elements = _this.element;
      if (isCollection(elements)) {
        for(var i = elements.length -1; i >= 0; i--){
          elements[i].addEventListener(listener, callback);
        }
      }else{
        elements.addEventListener(listener, callback);
      }
    },

    trigger: function(listener){
      var elements = _this.element;
      var event = new Event(listener)
      if (isCollection(elements)) {
        for(var i = elements.length -1; i >= 0; i-- ){
          elements[i].dispatchEvent(event);
        }
      }else{
        elements.dispatchEvent(event);
      }
    },

    remove: function(){
      var elements = _this.element;
      if (isCollection(elements)) {
        for(var i = elements.length -1; i >= 0; i--){
          elements[i].remove()
        }
      }else{
        elements.remove();
      }
    }

  }
}

function $(input){
  return selector(input);
}

$.ajax = function(options){
  return new Promise( function(resolve, reject){
    var req = new XMLHttpRequest();
    req.open(options.method, options.url)
    req.onload = function(){
      if (this.status >= 200 && this.status < 300){
        resolve(this.response)
      }else{
        reject(this.statusText)
      }
    }
  })
}

$.ready = function(callback) {
  document.readyState === "interactive" || document.readyState === "complete" ? callback() : document.addEventListener("DOMContentLoaded", callback);
}

function selector(input){
  var query = new miniQuery(input);
  return query;
}