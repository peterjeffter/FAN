document.getElementById('openBtn').addEventListener('click', function() {
  document.getElementById('popupMenu').classList.add('open');
});

document.getElementById('closeBtn').addEventListener('click', function() {
  document.getElementById('popupMenu').classList.remove('open');
});
document.getElementById('openbtnn').addEventListener('click', function() {
  document.getElementById('addlearnermenu').classList.toggle('openn');

});


document.addEventListener('click', function(event) {
  if (!document.getElementById('popupMenu').contains(event.target) &&
      !document.getElementById('openBtn').contains(event.target)) {
    document.getElementById('popupMenu').classList.remove('open');
  }

  if (!document.getElementById('addlearnermenu').contains(event.target) &&
      !document.getElementById('openbtnn').contains(event.target)) {
    document.getElementById('addlearnermenu').classList.remove('openn');
  }

});

document.querySelectorAll('.studentmenu').forEach(function(menuBtn) {
  menuBtn.addEventListener('click', function(event) {
    event.stopPropagation();

    document.querySelectorAll('.minimenu').forEach(function(miniMenu) {
      if (miniMenu !== menuBtn.nextElementSibling) {
        miniMenu.classList.remove('open');
      }
    });

    const miniMenu = menuBtn.nextElementSibling;
    miniMenu.classList.toggle('open');
  });
});

document.addEventListener('click', function(event) {
  document.querySelectorAll('.minimenu').forEach(function(miniMenu) {
    if (!miniMenu.contains(event.target)) {
      miniMenu.classList.remove('open');
    }
  });
});
