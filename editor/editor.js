/* Run once when the page is loaded */
function initialize() {
  // Get page data from the URL and load it into the boxes
  if (window.location.hash) {
    var b64  = window.location.hash.slice(1);
    var json = window.atob(b64);
    var data = JSON.parse(json);

    document.getElementById("css").value = data["css"];
    document.getElementById("javascript").value = data["js"];
    document.getElementById("html").value = data["html"];
  }

  update();
}


/* Return the HTML string for the page */
function getHTML(data) {
  // Generate an HTML page from the contents of each <textarea>
  var pageData =
`
<!DOCTYPE html>
<head>
<style>
${data["css"]}
</style>
<script type="text/javascript">
${data["js"]}
</scr` +
// This has to be broken up because otherwise it is recognized as the main
// document's end script tag
`ipt>
</head>
<body>
${data["html"]}
</body>
`;

  return pageData;
}


/* Return a link to view the page */
function getViewLink(pageData) {
  return `../#${window.btoa(encodeURIComponent(pageData))}`;
}


/* Run each time a key is pressed on a text box */
function update() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  var html = getHTML(data);

  // Save encoded page data to the URL
  window.location.hash = "#" + window.btoa(JSON.stringify(data));

  // Update the URL for the "Get Link" button
  document.getElementById("getLinkLink").href = getViewLink(html);

  // Update the <iframe> to display the generated page
  window.frames[0].location.replace(`data:text/html,${encodeURIComponent(html)}`);
}

/* Show a prompt with the HTML so the user can copy the code */
function showCopyCodePrompt() {
  var data = {
    "css" : document.getElementById("css").value,
    "js" : document.getElementById("javascript").value,
    "html" : document.getElementById("html").value
  };

  var html = getHTML(data);

  window.prompt("Copy to clipboard: ", html)
}