import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Manoj extends Component {
    constructor() {
        super();
        this.state = { items: [] };
    }

    componentDidMount() {
        fetch(`http://localhost:3000/game/distribute/123`)
            .then(result => {
                return result.json()
            })
            .then(result => {
                console.log(result)
                this.setState({ items: result });
            });
    }

    render() {
        return (<div>
            <div>Items:</div>
            {this.state.items.map((p) => {
                return <ul>
                    {p.cards.map((card) => {
                        return <Card cardnumber={card.card}></Card>
                    })}
                </ul>
            })}
        </div>)
    }
}


class Card extends Component {
    constructor() {
        super();
        this.state = { items: [] };
        this.state.symbolStructure = {
            "2": [1, 1, 0],
            "3": [1, 1, 1],
            "4": [2, 2, 0],
            "5": [2, 1, 2],
            "6": [2, 2, 2],
            "7": [2, 3, 2],
            "8": [3, 2, 3],
            "9": [3, 3, 3],
            "10": [3, 4, 3]
        }
    }

    render() {
        let cardSymbols = "", value = this.props.cardnumber.value;


        return (<div className="card">
            <div className={"name-top " + (value === 'JOCKER' ? 'jocker-name' : '')}>
                {this.props.cardnumber.value}
                <div className={"symbol " + this.props.cardnumber.category + (value === 'JOCKER' ? ' display-none' : '')}></div>
            </div>
            <div className={"symbol-container " + (value === 'JOCKER' ? 'jocker-symbol' : '')}>{(() => {
                if (["A", "K", "Q", "J", "JOCKER"].indexOf(value) > -1) {
                    switch (value) {
                        case "A": return <div className=""></div>
                        case "K": return <img className="central-image" src="images/symbols/king.png" />
                        case "Q": return <img className="central-image" src="images/symbols/queen.png" />
                        case "J": return <img className="central-image" src="images/symbols/jockey.png" />
                        case "JOCKER": return <img className="central-image" src="images/symbols/joker.png" />
                    }
                } else {
                  return <div className="symContain">{ ( this.state.symbolStructure[value].map((val,index) => {

                            let symbolCols=[];
                                for (let i = 0; i < val; i++) {
                                   symbolCols.push(<div className={"symbol " + this.props.cardnumber.category}></div>)
                                }
                            return <div  className={(val===0 ? 'display-none' : '') +" symgroup sym" + index}>{symbolCols} </div>

                    }))}
                    </div>
                }
            })()}</div>
            <div className={"name-bottom float-right " + (value === 'JOCKER' ? 'jocker-name joker-name-bottom' : '')}>
                <div className={"symbol  " + this.props.cardnumber.category + (value === 'JOCKER' ? ' display-none' : '')}></div>
                {this.props.cardnumber.value}
            </div>
        </div>)
    }
}
ReactDOM.render(
    <Manoj />,
    document.getElementById('root')
);
