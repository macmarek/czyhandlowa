var shoppingFreeSundaysConfig = [
    "2018-07-08","2018-07-15","2018-07-22",
    "2018-08-12","2018-08-19",
    "2018-09-09","2018-09-16","2018-09-23",
    "2018-10-14","2018-10-21",
    "2018-11-11","2018-11-18",
    "2018-11-09",
    "2018-12-09"
];

var shoppingSundaysConfig = [
    "2019-01-27",
    "2019-02-24",
    "2019-03-31",
    "2019-04-14","2019-04-28",
    "2019-05-26",
    "2019-06-30",
    "2019-07-28",
    "2019-08-25",
    "2019-09-29",
    "2019-10-27",
    "2019-11-24",
    "2019-12-15","2019-12-22","2019-12-29",
];

var shortFormat = (date) => {
    return date.toISOString().substring(0, 10);
};

var ddmmFormat = (date) =>{
    var dd = date.getDate();
    var mm = date.getMonth()+1;

    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    return ""+dd + "."+mm;
};

var shoppingFreeStrategies = {
    selectShoppingFreeSundays : function(formatedDate){
        return shoppingFreeSundaysConfig.indexOf(formatedDate) >= 0;
    },
    selectShoppingSundays : function(formatedDate){
        return shoppingSundaysConfig.indexOf(formatedDate) == -1;
    }
}

var getStrategy = function(date){
    if(date.indexOf("2018") >=0){
        return shoppingFreeStrategies.selectShoppingFreeSundays;
    }
    return shoppingFreeStrategies.selectShoppingSundays;
}

var isShoppingFreeDate = (date) => {
    var formatedDate = shortFormat(date);
    var strategy = getStrategy(formatedDate);
    return strategy(formatedDate);
    
};

var nextDay = function(d, dow){
    d.setDate(d.getDate() + (dow+(7-d.getDay())) % 7);
    return d;
}

var getNextSunday = (date) => {
   return nextDay(date, 0);
};

var addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

var getNextSundays = () => {
    var d = new Date();
    var date = new Date(d.getFullYear(),d.getMonth(),d.getDate(),12);
    var isSunday = date.getDay() == 0;
    var startDate;
    if(isSunday){
        startDate = getNextSunday(addDays(date,1));
    }
    else{
        startDate = getNextSunday(date);
    }
    var nextSundays = [new Date(startDate)];
    for(var i=1;i<5;i++){
        startDate.setDate(startDate.getDate() + 7);
        nextSundays.push(new Date(startDate));
    }
    return nextSundays.map((d, i)=>{
        return {
            date: d,
            isShoppingFree: isShoppingFreeDate(d)
        }
    })
};

var daysInMonth = (month,year) => {
    return new Date(year, month, 0).getDate();
}

class Info extends React.Component {

    render() {
        var d = new Date();
        //var d = new Date(Date.parse("2019-07-08"));
        var isSunday = d.getDay() == 0;

        if(!isSunday){
            var next = getNextSunday(d);
            var isNextShoppingFree = isShoppingFreeDate(next);
            var nextDay = next.getDate()+"-go";
            
            if(isNextShoppingFree){
                return (
                    <div><div>Najbliższa niedziela ({nextDay}) będzie </div>
                    <h1><span class="badge badge-danger">niehandlowa</span></h1></div>
                );
            }
            else{
                return (
                    <div><div>Najbliższa niedziela ({nextDay}) będzie </div>
                    <h1><span class="badge badge-success">handlowa</span></h1></div>
                );
            }

        }

        if(isShoppingFreeDate(d)){
            return (
                <div><div>Dzisiaj jest niedziela</div>
                <h1><span class="badge badge-danger">niehandlowa</span></h1></div>
            );
        }
    
        return (
            <div><div>Dzisiaj jest niedziela</div>
            <h1><span class="badge badge-success">handlowa</span></h1></div>
        );  
    }
}

function InfoNextSundays(props){
    const listItems = props.sundays.map((sunday) =>
        <span 
            className={sunday.isShoppingFree?"badge badge-danger":"badge badge-success"} 
            style={{margin:"3px", minWidth:"20px"}}>{ddmmFormat(sunday.date)}
        </span>
    );
    
    return <div>
            <div>Najbliższe niedziele:</div> 
            <div>{listItems}</div>
        </div>;
}

class Storage {
    constructor() {
        this.isSupported = this.testIsSupported();
    }
    
    testIsSupported = () => {
        var key = "czyhandlowa_test";
        try {
            localStorage.setItem(key, key);
            localStorage.removeItem(key);
            return true;
        } catch(e) {
            return false;
        }
    }

    setItem = (key, value) => {
        if(this.isSupported){
            localStorage.setItem(key, value);
        }    
    }

    getItem = (key) =>{
        if(!this.isSupported){
            return null;
        }
        return localStorage.getItem(key);
    }
}

class CookieInfo extends React.Component {
    
    constructor(props) {
        super(props);
        var cookieConfirmed = this.props.storage.getItem("cookie_confirmed");
        var shouldShow = !(cookieConfirmed === "true")

        this.state = { show: shouldShow };

        this.onClick = () => {
            this.props.storage.setItem("cookie_confirmed", true)
            this.setState({ show: false });
        }
    }

  
    render(){
        if(!this.state.show){
            return(null);
        }
        return(<div class="alert alert-secondary alert-dismissible" role="alert">
            <span style={{fontSize:"0.7em"}}>Ta strona używa Cookies w celu zbierania informacji o odwiedzinach poprzez Google Analytics.</span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={this.onClick}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>);
    }
}

class App extends React.Component{
    render(){
        var nextSundays = getNextSundays();
        let storage = new Storage();

        return(
        <div>
            <div style={{margin: '1em auto',maxWidth:'700px',textAlign:'center', minHeight:"4em"}}>
            <CookieInfo storage={storage}/>  
            </div>
            <div style={{margin: '4em auto',maxWidth:'700px',textAlign:'center'}}>
                <Info/>
                <InfoNextSundays sundays={nextSundays}/>
            </div>
        </div>
        );
    }
}
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
  