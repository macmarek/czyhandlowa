var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shoppingFreeSundaysConfig = ["2018-07-08", "2018-07-15", "2018-07-22", "2018-08-12", "2018-08-19", "2018-09-09", "2018-09-16", "2018-09-23", "2018-10-14", "2018-10-21", "2018-11-11", "2018-11-18", "2018-11-09"];

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

var getAllSundaysInMonth = function getAllSundaysInMonth() {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth(), d.getFullYear());
    var sun = new Array();

    for (var i = 1; i <= getTot; i++) {
        var newDate = new Date(d.getFullYear(), d.getMonth(), i, 12);
        if (newDate.getDay() == 0) {
            sun.push({
                date: newDate,
                day: i,
                isShoppingFree: isShoppingFreeDate(newDate)
            });
        }
    }
    return sun;
};

var daysInMonth = function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
};

var Info = function (_React$Component) {
    _inherits(Info, _React$Component);

    function Info() {
        _classCallCheck(this, Info);

        return _possibleConstructorReturn(this, (Info.__proto__ || Object.getPrototypeOf(Info)).apply(this, arguments));
    }

    _createClass(Info, [{
        key: "render",
        value: function render() {
            var d = new Date();
            var isSunday = d.getDay() == 0;

            if (!isSunday) {
                var next = getNextSunday(d);
                var isNextShoppingFree = isShoppingFreeDate(next);
                var formatted = shortFormat(next);

                if (isNextShoppingFree) {
                    return React.createElement(
                        "h2",
                        null,
                        "Najbli\u017Csza b\u0119dzie ",
                        React.createElement(
                            "span",
                            { "class": "badge badge-danger" },
                            "niehandlowa"
                        ),
                        " (",
                        formatted,
                        ")"
                    );
                } else {
                    return React.createElement(
                        "h2",
                        null,
                        "Najbli\u017Csza b\u0119dzie ",
                        React.createElement(
                            "span",
                            { "class": "badge badge-success" },
                            "handlowa"
                        ),
                        " (",
                        formatted,
                        ")"
                    );
                }
            }

            if (isShoppingFreeDate(d)) {
                return React.createElement(
                    "h2",
                    null,
                    React.createElement(
                        "span",
                        { "class": "badge badge-danger" },
                        "Dzisiaj niehandlowa"
                    )
                );
            }

            return React.createElement(
                "h2",
                null,
                React.createElement(
                    "span",
                    { "class": "badge badge-success" },
                    "Dzisiaj handlowa"
                )
            );
        }
    }]);

    return Info;
}(React.Component);

function InfoSundays(props) {
    var listItems = props.allSundays.map(function (sunday) {
        return React.createElement(
            "span",
            {
                className: sunday.isShoppingFree ? "badge badge-danger" : "badge badge-success",
                style: { margin: "3px", minWidth: "20px" } },
            sunday.day
        );
    });

    return React.createElement(
        "div",
        null,
        "Niedziele: ",
        listItems
    );
}

var containerStyle = {
    margin: '10em auto',
    maxWidth: '700px',
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
            var allSundays = getAllSundaysInMonth();

            return React.createElement(
                "div",
                { style: containerStyle },
                React.createElement(
                    "h1",
                    null,
                    "Czy niedziela jest handlowa?"
                ),
                React.createElement(Info, null),
                React.createElement(InfoSundays, { allSundays: allSundays })
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));