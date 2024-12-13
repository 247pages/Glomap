document.addEventListener("DOMContentLoaded", function() {
  var loadingOverlay = document.getElementById("loading-overlay");
  var timeout = setTimeout(function() {
    loadingOverlay.style.display = "none";
  }, 10000); // Fallback after 10 seconds

  window.addEventListener("load", function() {
    clearTimeout(timeout); // Clear fallback
    loadingOverlay.style.display = "none";
  });
});
