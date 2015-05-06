var React = require('react');
var Router = require('react-router');
var Constants = require('../Constants');

var RadarBackground = React.createClass({displayName: "RadarBackground",
  mixins: [ Router.Navigation ],
  componentDidMount: function() {
    // なぜかonClick属性でイベントリスなを登録できなかったため、ここでラベルクリックをハンドルする
    document.body.addEventListener('click', this._onCategoryClick, false);
  },
  componentWillUnmount: function() {
    document.body.removeEventListener('click', this._onCategoryClick);
  },
  _onCategoryClick: function(e) {
    if (e.target.tagName.toUpperCase() !== 'TEXT' || this.props.isChildCategory) return;
    var categoryId = e.target.getAttribute('data-categoryid');
    this.transitionTo(Constants.ROOT_PATH + 'radarScope/category/' + categoryId + '/' + this.props.yearMonth);
  },
  _categoryName: function() {
    var _this = this;
    return this.props.categories.map(function(category, i) {
      var textStyle = {
        fontSize: '14px',
        fontFamily: 'Arial',
        textAnchor: 'middle'
      };
      if (!_this.props.isChildCategory) textStyle.cursor = 'pointer';
      var translate = 'translate(' + Constants.RADER_CENTER_X + ',' + Constants.RADER_CENTER_Y + ')';
      var arc = 360 / _this.props.categories.length;
      var radian = arc * i + arc / 2;
      var rotate = 'rotate(' + radian + ')';
      var transform = translate + ' ' + rotate;
      // 下側に来たラベルは180度回転させる
      var labelRot = radian > 90 && radian < 270 ? 180 : 0;
      return (
        React.createElement("g", {key: 'category-label-group-' + i, transform: transform}, 
          React.createElement("text", {key: 'category-label-' + i, className: "category-label", "data-categoryid": category.id, transform: 'rotate(' + labelRot + ',0,-300)', y: "-300", stroke: "none", fill: "#666666", style: textStyle}, category.displayName)
        )
      );
    });
  },
  _circles: function() {
    var circles = [];
    for (var i = 0; i < 4; i++) {
      circles.push(React.createElement("circle", {key: "circle-" + i, cx: Constants.RADER_CENTER_X, cy: Constants.RADER_CENTER_Y, r: (i + 1) * Constants.RADER_SPACING, fill: Constants.RADER_FILL, stroke: Constants.RADER_COLOR}));
    }
    return circles;
  },
  _borders: function() {
    var borders = [];
    for (var i = 0, len = this.props.categories.length; i < len; i++) {
      var seta = (2 * Math.PI / len) * i;
      var y = Constants.RADER_RADIUS * Math.sin(seta - Math.PI / 2);
      var x = Constants.RADER_RADIUS * Math.cos(seta - Math.PI / 2);
      borders.push(React.createElement("path", {key: "borders-" + i, fill: Constants.RADER_FILL, stroke: Constants.RADER_COLOR, d: 'M320,330l' + x + ',' + y + 'z'}));
    }
    return borders;
  },
  _ranks: function() {
    var ranks = [];
    for (var i = 1; i <= 4; i++) {
      var y = Constants.RADER_CENTER_Y - (Constants.RADER_SPACING * i) + (Constants.RADER_SPACING / 2);
      ranks.push(React.createElement("text", {key: "ranks-" + i, className: "rank-text", x: Constants.RADER_CENTER_X, y: y, font: "10px Arial"}, 5 - i));
    }
    return ranks;
  },
  render: function() {
    return (
      React.createElement("g", null, 
         this._circles(), 
         this._borders(), 
         this._ranks(), 
         this._categoryName() 
      )
    );
  },

});

module.exports = RadarBackground;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmFkYXJCYWNrZ3JvdW5kLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3JDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFeEMsSUFBSSxxQ0FBcUMsK0JBQUE7RUFDdkMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUMvQixFQUFFLGlCQUFpQixFQUFFLFdBQVc7O0lBRTVCLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUN2RTtFQUNELG9CQUFvQixFQUFFLFdBQVc7SUFDL0IsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7R0FDbkU7RUFDRCxnQkFBZ0IsRUFBRSxTQUFTLENBQUMsRUFBRTtJQUM1QixJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxPQUFPO0lBQ3BGLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLHNCQUFzQixHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztHQUMzRztFQUNELGFBQWEsRUFBRSxXQUFXO0lBQ3hCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixPQUFPLElBQUksQ0FBQyxL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QSxFQUFDLENBQUUsU0FBUyxDQUFDLGNBQWMsRUFBQyxDQUFDLENBQUEsRUFBQyxDQUFFLENBQUMsRUFBQyxDQUFDLElBQUEsRUFBSSxDQUFDLFlBQWEsQ0FBQSxFQUFDLENBQUMsR0FBRyxDQUFTLENBQUEsQ0FBQyxDQUFDO0tBQ2hJO0lBQ0QsT0FBTyxLQUFLLENBQUM7R0FDZDtFQUNELE1BQU0sRUFBRSxXQUFXO0lBQ2pCO01BQ0Usb0JBQUEsR0FBRSxFQUFBLElBQUMsRUFBQTtRQUNBLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFBLENBQUU7UUFDbEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUEsQ0FBRTtRQUNsQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBQSxDQUFFO1FBQ2hCLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBSTtNQUN0QixDQUFBO01BQ0o7QUFDTixHQUFHOztBQUVILENBQUMsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDIiwiZmlsZSI6ImNvbXBvbmVudHMvUmFkYXJCYWNrZ3JvdW5kLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKTtcbnZhciBDb25zdGFudHMgPSByZXF1aXJlKCcuLi9Db25zdGFudHMnKTtcblxudmFyIFJhZGFyQmFja2dyb3VuZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbWl4aW5zOiBbIFJvdXRlci5OYXZpZ2F0aW9uIF0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAvLyDjgarjgZzjgYtvbkNsaWNr5bGe5oCn44Gn44Kk44OZ44Oz44OI44Oq44K544Gq44KS55m76Yyy44Gn44GN44Gq44GL44Gj44Gf44Gf44KB44CB44GT44GT44Gn44Op44OZ44Or44Kv44Oq44OD44Kv44KS44OP44Oz44OJ44Or44GZ44KLXG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2F0ZWdvcnlDbGljaywgZmFsc2UpO1xuICB9LFxuICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuX29uQ2F0ZWdvcnlDbGljayk7XG4gIH0sXG4gIF9vbkNhdGVnb3J5Q2xpY2s6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b1VwcGVyQ2FzZSgpICE9PSAnVEVYVCcgfHwgdGhpcy5wcm9wcy5pc0NoaWxkQ2F0ZWdvcnkpIHJldHVybjtcbiAgICB2YXIgY2F0ZWdvcnlJZCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jYXRlZ29yeWlkJyk7XG4gICAgdGhpcy50cmFuc2l0aW9uVG8oQ29uc3RhbnRzLlJPT1RfUEFUSCArICdyYWRhclNjb3BlL2NhdGVnb3J5LycgKyBjYXRlZ29yeUlkICsgJy8nICsgdGhpcy5wcm9wcy55ZWFyTW9udGgpO1xuICB9LFxuICBfY2F0ZWdvcnlOYW1lOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJldHVybiB0aGlzLnByb3BzLmNhdGVnb3JpZXMubWFwKGZ1bmN0aW9uKGNhdGVnb3J5LCBpKSB7XG4gICAgICB2YXIgdGV4dFN0eWxlID0ge1xuICAgICAgICBmb250U2l6ZTogJzE0cHgnLFxuICAgICAgICBmb250RmFtaWx5OiAnQXJpYWwnLFxuICAgICAgICB0ZXh0QW5jaG9yOiAnbWlkZGxlJ1xuICAgICAgfTtcbiAgICAgIGlmICghX3RoaXMucHJvcHMuaXNDaGlsZENhdGVnb3J5KSB0ZXh0U3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgdmFyIHRyYW5zbGF0ZSA9ICd0cmFuc2xhdGUoJyArIENvbnN0YW50cy5SQURFUl9DRU5URVJfWCArICcsJyArIENvbnN0YW50cy5SQURFUl9DRU5URVJfWSArICcpJztcbiAgICAgIHZhciBhcmMgPSAzNjAgLyBfdGhpcy5wcm9wcy5jYXRlZ29yaWVzLmxlbmd0aDtcbiAgICAgIHZhciByYWRpYW4gPSBhcmMgKiBpICsgYXJjIC8gMjtcbiAgICAgIHZhciByb3RhdGUgPSAncm90YXRlKCcgKyByYWRpYW4gKyAnKSc7XG4gICAgICB2YXIgdHJhbnNmb3JtID0gdHJhbnNsYXRlICsgJyAnICsgcm90YXRlO1xuICAgICAgLy8g5LiL5YG044Gr5p2l44Gf44Op44OZ44Or44GvMTgw5bqm5Zue6Lui44GV44Gb44KLXG4gICAgICB2YXIgbGFiZWxSb3QgPSByYWRpYW4gPiA5MCAmJiByYWRpYW4gPCAyNzAgPyAxODAgOiAwO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGcga2V5PXsnY2F0ZWdvcnktbGFiZWwtZ3JvdXAtJyArIGl9IHRyYW5zZm9ybT17dHJhbnNmb3JtfT5cbiAgICAgICAgICA8dGV4dCBrZXk9eydjYXRlZ29yeS1sYWJlbC0nICsgaX0gY2xhc3NOYW1lPVwiY2F0ZWdvcnktbGFiZWxcIiBkYXRhLWNhdGVnb3J5aWQ9e2NhdGVnb3J5LmlkfSB0cmFuc2Zvcm09eydyb3RhdGUoJyArIGxhYmVsUm90ICsgJywwLC0zMDApJ30geT1cIi0zMDBcIiBzdHJva2U9XCJub25lXCIgZmlsbD1cIiM2NjY2NjZcIiBzdHlsZT17dGV4dFN0eWxlfT57Y2F0ZWdvcnkuZGlzcGxheU5hbWV9PC90ZXh0PlxuICAgICAgICA8L2c+XG4gICAgICApO1xuICAgIH0pO1xuICB9LFxuICBfY2lyY2xlczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNpcmNsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgY2lyY2xlcy5wdXNoKDxjaXJjbGUga2V5PXtcImNpcmNsZS1cIiArIGl9IGN4PXtDb25zdGFudHMuUkFERVJfQ0VOVEVSX1h9IGN5PXtDb25zdGFudHMuUkFERVJfQ0VOVEVSX1l9IHI9eyhpICsgMSkgKiBDb25zdGFudHMuUkFERVJfU1BBQ0lOR30gZmlsbD17Q29uc3RhbnRzLlJBREVSX0ZJTEx9IHN0cm9rZT17Q29uc3RhbnRzLlJBREVSX0NPTE9SfT48L2NpcmNsZT4pO1xuICAgIH1cbiAgICByZXR1cm4gY2lyY2xlcztcbiAgfSxcbiAgX2JvcmRlcnM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBib3JkZXJzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMucHJvcHMuY2F0ZWdvcmllcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgdmFyIHNldGEgPSAoMiAqIE1hdGguUEkgLyBsZW4pICogaTtcbiAgICAgIHZhciB5ID0gQ29uc3RhbnRzLlJBREVSX1JBRElVUyAqIE1hdGguc2luKHNldGEgLSBNYXRoLlBJIC8gMik7XG4gICAgICB2YXIgeCA9IENvbnN0YW50cy5SQURFUl9SQURJVVMgKiBNYXRoLmNvcyhzZXRhIC0gTWF0aC5QSSAvIDIpO1xuICAgICAgYm9yZGVycy5wdXNoKDxwYXRoIGtleT17XCJib3JkZXJzLVwiICsgaX0gZmlsbD17Q29uc3RhbnRzLlJBREVSX0ZJTEx9IHN0cm9rZT17Q29uc3RhbnRzLlJBREVSX0NPTE9SfSBkPXsnTTMyMCwzMzBsJyArIHggKyAnLCcgKyB5ICsgJ3onfT48L3BhdGg+KTtcbiAgICB9XG4gICAgcmV0dXJuIGJvcmRlcnM7XG4gIH0sXG4gIF9yYW5rczogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJhbmtzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gNDsgaSsrKSB7XG4gICAgICB2YXIgeSA9IENvbnN0YW50cy5SQURFUl9DRU5URVJfWSAtIChDb25zdGFudHMuUkFERVJfU1BBQ0lORyAqIGkpICsgKENvbnN0YW50cy5SQURFUl9TUEFDSU5HIC8gMik7XG4gICAgICByYW5rcy5wdXNoKDx0ZXh0IGtleT17XCJyYW5rcy1cIiArIGl9IGNsYXNzTmFtZT1cInJhbmstdGV4dFwiIHg9e0NvbnN0YW50cy5SQURFUl9DRU5URVJfWH0geT17eX0gZm9udD1cIjEwcHggQXJpYWxcIj57NSAtIGl9PC90ZXh0Pik7XG4gICAgfVxuICAgIHJldHVybiByYW5rcztcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGc+XG4gICAgICAgIHsgdGhpcy5fY2lyY2xlcygpIH1cbiAgICAgICAgeyB0aGlzLl9ib3JkZXJzKCkgfVxuICAgICAgICB7IHRoaXMuX3JhbmtzKCkgfVxuICAgICAgICB7IHRoaXMuX2NhdGVnb3J5TmFtZSgpIH1cbiAgICAgIDwvZz5cbiAgICApO1xuICB9LFxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBSYWRhckJhY2tncm91bmQ7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=