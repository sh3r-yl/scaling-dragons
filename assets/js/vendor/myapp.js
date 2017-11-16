var base = "http://www.dnd5eapi.co/api/";
var randomNumber;

$.ajax({
  url: base + "classes/",
  success: function(data) {
    randomNumber = Math.ceil((Math.random() * data.count));
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
              $("#skills").append("<li>" + skills[j][x].name + "</li>");
              console.log(skills[j][x].name);
            }
          } else {
            $("#skills").append("<li>" + skills[j].name + "</li>");
          }
        }
      }
    }      
  });
}

function loadProficiencies(id) {
  $.ajax({
    url: base + "classes/" + id
  }).then(function(data) {
    if (data != null)
      for (i in data.proficiencies) {
        $("#proficiencies").append("<span>" + data.proficiencies[i].name + "</span>");
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

function loadEquipment(id) {
  $.ajax({
    url: base + "startingequipment/" + id
  }).then(function(data) {
    if (data != null)
      for (i in data.starting_equipment) {
        $("#starting-eq").append("<span>" + data.starting_equipment[i].item.name + "</span>");
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

function newClass() {
  $.ajax({
    url: base + "classes/",
    success: function(data) {
      randomNumber = Math.floor((Math.random() * data.count));
      init();
    }
  });
}

function init() {
  $.ajax({
    url: base + "classes/" + randomNumber,
    success: function(data) {
      if (data == null) {
        location.reload();
      }
      $("#class-total").append(data.name);
      var symbol = "<img src='assets/images/" + data.name + "-smol.png'>";
      $("#class-symbol").append(symbol);
      $("#class-name").append(data.name);

      loadHitDie(randomNumber);
      loadSkills(randomNumber);
      loadProficiencies(randomNumber);
      loadEquipment(randomNumber);
      loadSavingThrows(randomNumber);
      loadSubClass(randomNumber);
    }
  });
}

function resetData() {
  $("#class-total").empty();
  $("#class-symbol").empty();
  $("#class-name").empty();
  $("#subclasses").empty();
  $("#starting-eq").empty();
  $("#saving-throws").empty();
  $("#proficiencies").empty();
  $("#skills").empty();
  $("#hit-die").empty();
  newClass();
}

$(document).ready(function() {
  newClass();
  $("#reload").on("click", resetData);
});