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
        //var d = new Date(Date.parse("2018-07-08"));
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

class CookieInfo extends React.Component {
    
    state = {
        show : true
    };

    onClick = () => {
        this.setState({ show: false });
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

        return(
        <div>
            <div style={{margin: '1em auto',maxWidth:'700px',textAlign:'center', minHeight:"4em"}}>
            <CookieInfo/>  
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
  