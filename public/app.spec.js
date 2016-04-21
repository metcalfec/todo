var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1920, height: 1080 };

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.open("http://localhost:1337/#/todo", function start(status) {
  page.includeJs(
  "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js",
  function() {
    page.evaluate(function() {
      $('#add-input').val('test');
      $('#add').click();
    });
  });

  setTimeout(function() {
    page.render('main.jpeg', {format: 'jpeg', quality: '100'});
    phantom.exit();
  }, 500);
});
