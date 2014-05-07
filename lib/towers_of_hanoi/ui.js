(function (root) {
  var UI = root.UI = (root.UI || {});

  var Hanoi = UI.Hanoi = function(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  Hanoi.prototype.render = function() {
    var i = 1;
    this.game.towers.forEach(function(tower) {
      var discInfo = "";
      var $tower = $('.tower'+i);
      for(var j = 2; j >= 0; j--) {
	      discInfo += ("<li class='disc' id='disc"+ tower[j] + "'></li>")
      };
      $tower.append(discInfo);
      i += 1;
    });
  };

  Hanoi.prototype.bindClickHandler = function() {
    var that = this;
    var clicks = [];
    that.$el.on("click", "ul", function(event) {
      clicks.push($(event.currentTarget).attr("class"));
			$(event.currentTarget).addClass("clicked");
      if (clicks.length === 2) {
        var fromIdx = parseInt(clicks[0].slice(-1)) - 1;
        var toIdx = parseInt(clicks[1].slice(-1)) - 1;
        if(that.game.move(fromIdx, toIdx)) {
          $('.disc').remove();
          that.render();
          clicks = [];
          if (that.game.isWon()) {
            alert("You won!");
          }
        }
        else {
          alert("Not a valid move.");
          clicks = [];
        };
				$(".tower1").removeClass("clicked")
				$(".tower2").removeClass("clicked")
				$(".tower3").removeClass("clicked")
			};
    });
  };

  //
  Hanoi.prototype.run = function() {
    this.render();
    this.bindClickHandler();
  };

})(this);