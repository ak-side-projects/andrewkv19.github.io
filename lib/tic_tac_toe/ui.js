(function (root) {
  var UI = root.UI = (root.UI || {});

  var ttt = UI.ttt = function(game, $element) {
    this.game = game;
    this.$element = $element;
  }

  ttt.prototype.setupBoard = function() {
    var boxInfo = "";
    _.times(3, function(row) {
      _.times(3, function(col) {
        var boxClass = "";
        boxClass += (row + "," + col);
        boxInfo += ("<li data-id='" + boxClass + "'></li>");
      });
    });

    this.$element.append(boxInfo);
  };

  ttt.prototype.bindClickHandler = function() {
    var that = this;
    this.$element.on("click", "li", function(event) {
      that.move($(this));
    });
  };

  ttt.prototype.move = function($box) {
    var pos = $box.data('id').split(',');
    var that = this;
    pos = _.map(pos, function(str){
      return parseInt(str);
    });
		
    if (that.game.move(pos)) {
      $box.addClass(that.game.player);
      var winner = that.game.winner();
			
      if (this.game.over()) {
        this.$element.off('click');
				
        var winner = this.game.winner();
        if (winner) {
          this.$element.addClass('winner-' + that.game.player);
					alert("Player '" + that.game.player.toUpperCase() + "' won!")
        } else {
          this.$element.addClass('over');
					alert("It's a draw!")
        }
      }
    };
  };

  ttt.prototype.run = function() {
    this.setupBoard();
    this.bindClickHandler();
  }

})(this);