var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shoppingFreeSundaysConfig = ["2018-07-08", "2018-07-15", "2018-07-22", "2018-08-12", "2018-08-19", "2018-09-09", "2018-09-16", "2018-09-23", "2018-10-14", "2018-10-21", "2018-11-11", "2018-11-18", "2018-11-09"];

// var shoppingFreeSundays = shoppingFreeSundaysConfig.map((x, i)=>{
//     return new Date(Date.parse(x));
// });

var shortFormat = function shortFormat(date) {
    return date.toISOString().substring(0, 10);
};

var isShoppingFreeDate = function isShoppingFreeDate(date) {
    var formatedDate = shortFormat(date);
    return shoppingFreeSundaysConfig.indexOf(formatedDate) >= 0;
};

var nextDay = function nextDay(d, dow) {
    d.setDate(d.getDate() + (dow + (7 - d.getDay())) % 7);
    return d;
};

var getNextSunday = function getNextSunday(date) {
    return nextDay(date, 0);
};

var isShoppingSunday = function isShoppingSunday() {
    var d = new Date();
    var isSunday = d.getDay() == 0;

    if (!isSunday) {
        var next = getNextSunday(d);
        var isNextShoppingFree = isShoppingFreeDate(next);
        var formatted = shortFormat(next);
        return isNextShoppingFree ? "Najbliższa będzie niehandlowa (" + formatted + ")" : "Najbliższa będzie handlowa (" + formatted + ")";
    }

    if (isShoppingFreeDate(d)) {
        return "Dzisiaj niehandlowa";
    }

    return "Dzisiaj handlowa";
};

var Info = function (_React$Component) {
    _inherits(Info, _React$Component);

    function Info(props) {
        _classCallCheck(this, Info);

        var _this = _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).call(this, props));

        _this.state = { info: isShoppingSunday() };
        return _this;
    }

    _createClass(Info, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "h3",
                null,
                this.state.info
            );
        }
    }]);

    return Info;
}(React.Component);

var containerStyle = {
    margin: '0 auto',
    width: '90%',
    textAlign: 'center'
};

var App = function (_React$Component2) {
    _inherits(App, _React$Component2);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: containerStyle },
                React.createElement(
                    "h2",
                    null,
                    "Czy niedziela jest handlowa?"
                ),
                React.createElement(Info, null)
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));