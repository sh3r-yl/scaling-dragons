var base = "http://www.dnd5eapi.co/api/";
var randomNumber;

$.ajax({
  url: base + "classes/",
  success: function(data) {
    randomNumber = Math.floor((Math.random() * data.count));
  }
});

function loadHitDie(id) {
  $.ajax({
    url: base + "classes/" + id
  }).then(function(data) {
    if (data != null) {
      $("#hit-die").append(data.hit_die);
    }     
  });
}

function loadSkills(id) {
  $.ajax({
    url: base + "classes/" + id
  }).then(function(data) {
    if (data != null) {
      for (i in data.proficiency_choices) {
        var skills = data.proficiency_choices[i].from;
        for (j in skills) {
          // hotfix for class 6
          if (skills[j].name == undefined) {
            for (x in skills[j].from) {
              $("#classes").append("<span>" + skills[j][x].name + "</span>");
            }
          } else {
            for (x in skills[j]) {
              $("#classes").append("<span>" + skills[j].name + "</span>");
            }
          }
        }
      }
    }      
  });
}

function loadSavingThrows(id) {
  $.ajax({
    url: base + "classes/" + id
  }).then(function(data) {
    if (data != null)
      for (i in data.saving_throws) {
        $("#saving-throws").append("<span>" + data.saving_throws[i].name + "</span>");
      }
  });
}

function loadSubClass(id) {
  $.ajax({
    url: base + "classes/" + id
  }).then(function(data) {
    if (data != null)
      for (i in data.subclasses) {
        $("#subclasses").append("<span>" + data.subclasses[i].name + "</span>");
      }
  });
}

$(document).ready(function() {
  $.ajax({
    url: base + "classes/",
  }).then(function(data) {
    randomNumber = Math.floor((Math.random() * data.count));
    $.ajax({
      url: base + "classes/" + randomNumber,
      success: function(data) {
        $(".class-total").append(data.name);
        var symbol = "<img src='assets/images/" + data.name + "-smol.png'>";
        $("#class-symbol").append(symbol);
        $("#class-name").append(data.name);

        loadHitDie(randomNumber);
        loadSkills(randomNumber);
        loadSavingThrows(randomNumber);
        loadSubClass(randomNumber);
      }
    });
  });
});