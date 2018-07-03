var shoppingFreeSundaysConfig = [
    "2018-07-08","2018-07-15","2018-07-22",
    "2018-08-12","2018-08-19",
    "2018-09-09","2018-09-16","2018-09-23",
    "2018-10-14","2018-10-21",
    "2018-11-11","2018-11-18",
    "2018-11-09"
];

var shoppingFreeSundays = shoppingFreeSundaysConfig.map((x, i)=>{
    return new Date(Date.parse(x));
});

var shortFormat = (date) => {
    return date.toISOString().substring(0, 10);
};

var isShoppingFreeDate = (date) =>{
    var formatedDate = shortFormat(date);
    return shoppingFreeSundaysConfig.indexOf(formatedDate) > 0;
};

var nextDay = function(d, dow){
    d.setDate(d.getDate() + (dow+(7-d.getDay())) % 7);
    return d;
}

var getNextSunday = (date) => {
   return nextDay(date, 0);
};

var isShoppingSunday = () => {
    var d = new Date();
    var isSunday = d.getDay() == 0;

    if(!isSunday){
        var next = getNextSunday(d);
        var isNextShoppingFree = isShoppingFreeDate(next);
        var formatted = shortFormat(next);
        return isNextShoppingFree ? 
            "Najbliższa będzie niehandlowa ("+formatted+")": 
            "Najbliższa będzie handlowa ("+formatted+")";
    }

    if(isShoppingFreeDate(d)){
        return "Dzisiaj niehandlowa";
    }
    
    return "Dzisiaj handlowa";
};

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = { info: isShoppingSunday() };
      }
    
    render() {
        return (
            <h3>{this.state.info}</h3>
      );
    }
}

const containerStyle = {
    margin: '0 auto',
    width:'90%',
    textAlign:'center'
}

 class App extends React.Component{

    render(){
         return(
            <div style={containerStyle}>
                <h2>Czy niedziela jest handlowa?</h2>
                <Info/>
            </div>
         );
     }
 }
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
);
  