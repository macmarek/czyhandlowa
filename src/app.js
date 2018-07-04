var shoppingFreeSundaysConfig = [
    "2018-07-08","2018-07-15","2018-07-22",
    "2018-08-12","2018-08-19",
    "2018-09-09","2018-09-16","2018-09-23",
    "2018-10-14","2018-10-21",
    "2018-11-11","2018-11-18",
    "2018-11-09"
];

var shortFormat = (date) => {
    return date.toISOString().substring(0, 10);
};

var isShoppingFreeDate = (date) => {
    var formatedDate = shortFormat(date);
    return shoppingFreeSundaysConfig.indexOf(formatedDate) >= 0;
};

var nextDay = function(d, dow){
    d.setDate(d.getDate() + (dow+(7-d.getDay())) % 7);
    return d;
}

var getNextSunday = (date) => {
   return nextDay(date, 0);
};

var getAllSundaysInMonth = () => {
    var d = new Date();
    var getTot = daysInMonth(d.getMonth(),d.getFullYear());
    var sun = new Array();

    for(var i=1;i<=getTot;i++){    
        var newDate = new Date(d.getFullYear(),d.getMonth(),i,12);
        if(newDate.getDay()==0){  
            sun.push({
                date: newDate,
                day: i,
                isShoppingFree: isShoppingFreeDate(newDate)
            });
        }
    }
    return sun;
}

var daysInMonth = (month,year) => {
    return new Date(year, month, 0).getDate();
}

class Info extends React.Component {

    render() {
        //var d = new Date();
        var d = new Date(Date.parse("2018-07-08"));
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

function InfoSundays(props) {
    const listItems = props.allSundays.map((sunday) =>
        <span 
            className={sunday.isShoppingFree?"badge badge-danger":"badge badge-success"} 
            style={{margin:"3px", minWidth:"20px"}}>{sunday.day}
        </span>
    );
    
    return <div>
            <div>Niedziele w tym miesiącu:</div> 
            <div>{listItems}</div>
        </div>;
}

const containerStyle = {
    margin: '8em auto',
    maxWidth:'700px',
    textAlign:'center'
}

class App extends React.Component{
    

    render(){
        var allSundays = getAllSundaysInMonth();

        return(
        <div style={containerStyle}>
            <Info/>
            <InfoSundays allSundays={allSundays}/>
        </div>
        );
    }
}
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
  