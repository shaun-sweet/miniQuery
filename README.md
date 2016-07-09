This was a fun challenge I did to recreate some key elements of jQuery.  I have used the library for my own personal use as well when I don't need the full jQuery.  It has all the standard syntaxual nuance of jQuery.  Up to and including using the $ as a selector.  It has ajax functionality as well.  


# Syntax: $('htmlElementSelected').method()
# Methods
+ html()
+ hide()
+ append() this one also takes full [insertAdjacentHTML syntax by passing the position as the first argument](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)
+ show()
+ addClass(newClass)
+ removeClass(deletedClass)
+ on(listener, callback)
+ trigger(listener)
+ remove()

Additional Functionality
$.ajax({object params})) (just like $.ready(callback) (just like jQuery)
You can also use instead of the $() selector, miniQuery()