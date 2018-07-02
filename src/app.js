class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = { info: Info.isShoppingSunday() };
      }
    
    render() {
        return (
            <h3>{this.state.info}</h3>
      );
    }
}

Info.isShoppingSunday = function(){
    var d = new Date();
    var n = d.getDay();

    var isSunday = n == 6;

    if(!isSunday){
        return "Dzisiaj nie jest niedziela";
    }

    return "Jeszcze nie wiem, ale sie dowiem niedługo";
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
  