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
        var d = new Date();
        var isSunday = d.getDay() == 0;

        if(!isSunday){
            var next = getNextSunday(d);
            var isNextShoppingFree = isShoppingFreeDate(next);
            var formatted = shortFormat(next);
            
            if(isNextShoppingFree){
                return (
                    <h2>Najbliższa będzie <span class="badge badge-danger">niehandlowa</span> ({formatted})</h2>
                );
            }
            else{
                return (
                    <h2>Najbliższa będzie <span class="badge badge-success">handlowa</span> ({formatted})</h2>
                );
            }

        }

        if(isShoppingFreeDate(d)){
            return (
                <h2><span class="badge badge-danger">Dzisiaj niehandlowa</span></h2>
            );
        }
    
        return (
            <h2><span class="badge badge-success">Dzisiaj handlowa</span></h2>
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
    
    return <div>Niedziele: {listItems}</div>;
}

const containerStyle = {
    margin: '10em auto',
    maxWidth:'700px',
    textAlign:'center'
}

class App extends React.Component{
    

    render(){
        var allSundays = getAllSundaysInMonth();

        return(
        <div style={containerStyle}>
            <h1>Czy niedziela jest handlowa?</h1>
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
  