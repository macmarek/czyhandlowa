var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var shoppingFreeSundaysConfig = ["2018-07-08", "2018-07-15", "2018-07-22", "2018-08-12", "2018-08-19", "2018-09-09", "2018-09-16", "2018-09-23", "2018-10-14", "2018-10-21", "2018-11-11", "2018-11-18", "2018-11-09", "2018-12-09"];

var shortFormat = function shortFormat(date) {
    return date.toISOString().substring(0, 10);
};

var ddmmFormat = function ddmmFormat(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1;

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return "" + dd + "." + mm;
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

var addDays = function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

var getNextSundays = function getNextSundays() {
    var d = new Date();
    var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12);
    var isSunday = date.getDay() == 0;
    var startDate;
    if (isSunday) {
        startDate = getNextSunday(addDays(date, 1));
    } else {
        startDate = getNextSunday(date);
    }
    var nextSundays = [new Date(startDate)];
    for (var i = 1; i < 5; i++) {
        startDate.setDate(startDate.getDate() + 7);
        nextSundays.push(new Date(startDate));
    }
    return nextSundays.map(function (d, i) {
        return {
            date: d,
            isShoppingFree: isShoppingFreeDate(d)
        };
    });
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
            //var d = new Date(Date.parse("2018-07-08"));
            var isSunday = d.getDay() == 0;

            if (!isSunday) {
                var next = getNextSunday(d);
                var isNextShoppingFree = isShoppingFreeDate(next);
                var nextDay = next.getDate() + "-go";

                if (isNextShoppingFree) {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            null,
                            "Najbli\u017Csza niedziela (",
                            nextDay,
                            ") b\u0119dzie "
                        ),
                        React.createElement(
                            "h1",
                            null,
                            React.createElement(
                                "span",
                                { "class": "badge badge-danger" },
                                "niehandlowa"
                            )
                        )
                    );
                } else {
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "div",
                            null,
                            "Najbli\u017Csza niedziela (",
                            nextDay,
                            ") b\u0119dzie "
                        ),
                        React.createElement(
                            "h1",
                            null,
                            React.createElement(
                                "span",
                                { "class": "badge badge-success" },
                                "handlowa"
                            )
                        )
                    );
                }
            }

            if (isShoppingFreeDate(d)) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        null,
                        "Dzisiaj jest niedziela"
                    ),
                    React.createElement(
                        "h1",
                        null,
                        React.createElement(
                            "span",
                            { "class": "badge badge-danger" },
                            "niehandlowa"
                        )
                    )
                );
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    "Dzisiaj jest niedziela"
                ),
                React.createElement(
                    "h1",
                    null,
                    React.createElement(
                        "span",
                        { "class": "badge badge-success" },
                        "handlowa"
                    )
                )
            );
        }
    }]);

    return Info;
}(React.Component);

function InfoNextSundays(props) {
    var listItems = props.sundays.map(function (sunday) {
        return React.createElement(
            "span",
            {
                className: sunday.isShoppingFree ? "badge badge-danger" : "badge badge-success",
                style: { margin: "3px", minWidth: "20px" } },
            ddmmFormat(sunday.date)
        );
    });

    return React.createElement(
        "div",
        null,
        React.createElement(
            "div",
            null,
            "Najbli\u017Csze niedziele:"
        ),
        React.createElement(
            "div",
            null,
            listItems
        )
    );
}

var Storage = function Storage() {
    var _this2 = this;

    _classCallCheck(this, Storage);

    this.testIsSupported = function () {
        var key = "czyhandlowa_test";
        try {
            localStorage.setItem(key, key);
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    };

    this.setItem = function (key, value) {
        if (_this2.isSupported) {
            localStorage.setItem(key, value);
        }
    };

    this.getItem = function (key) {
        if (!_this2.isSupported) {
            return null;
        }
        return localStorage.getItem(key);
    };

    this.isSupported = this.testIsSupported();
};

var CookieInfo = function (_React$Component2) {
    _inherits(CookieInfo, _React$Component2);

    function CookieInfo(props) {
        _classCallCheck(this, CookieInfo);

        var _this3 = _possibleConstructorReturn(this, (CookieInfo.__proto__ || Object.getPrototypeOf(CookieInfo)).call(this, props));

        var cookieConfirmed = _this3.props.storage.getItem("cookie_confirmed");
        var shouldShow = !(cookieConfirmed === "true");

        _this3.state = { show: shouldShow };

        _this3.onClick = function () {
            _this3.props.storage.setItem("cookie_confirmed", true);
            _this3.setState({ show: false });
        };
        return _this3;
    }

    _createClass(CookieInfo, [{
        key: "render",
        value: function render() {
            if (!this.state.show) {
                return null;
            }
            return React.createElement(
                "div",
                { "class": "alert alert-secondary alert-dismissible", role: "alert" },
                React.createElement(
                    "span",
                    { style: { fontSize: "0.7em" } },
                    "Ta strona u\u017Cywa Cookies w celu zbierania informacji o odwiedzinach poprzez Google Analytics."
                ),
                React.createElement(
                    "button",
                    { type: "button", "class": "close", "data-dismiss": "alert", "aria-label": "Close", onClick: this.onClick },
                    React.createElement(
                        "span",
                        { "aria-hidden": "true" },
                        "\xD7"
                    )
                )
            );
        }
    }]);

    return CookieInfo;
}(React.Component);

var App = function (_React$Component3) {
    _inherits(App, _React$Component3);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var nextSundays = getNextSundays();
            var storage = new Storage();

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { style: { margin: '1em auto', maxWidth: '700px', textAlign: 'center', minHeight: "4em" } },
                    React.createElement(CookieInfo, { storage: storage })
                ),
                React.createElement(
                    "div",
                    { style: { margin: '4em auto', maxWidth: '700px', textAlign: 'center' } },
                    React.createElement(Info, null),
                    React.createElement(InfoNextSundays, { sundays: nextSundays })
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));