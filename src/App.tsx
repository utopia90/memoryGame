import React from 'react';
import './App.css';
import { Board } from './components/Board/Board';
import { CardContainer, TopContainer } from './components/Board/Board.styles';
import monsterOne from '../src/assets/imgs/monster1.jpg'
import monsterTwo from '../src/assets/imgs/monster2.jpg'
import monsterThree from '../src/assets/imgs/monster3.jpg'
import monsterFour from '../src/assets/imgs/monter4.jpg'
import monsterFive from '../src/assets/imgs/monter5.jpg'
import monsterSix from '../src/assets/imgs/monter6.jpg'
import questionMark from '../src/assets/imgs/questionMark.jpg'
import CountdownTimer from './components/CountDown/CountDown';
import { CountDownContainer, RestartContainer } from './components/CountDown/CountDown.styles';


function App() {
  interface Card {
    img: string,
    isActive: boolean
    isMatched:boolean
    }
    
const defaultCards: Card[] = [{img: monsterOne, isActive: false, isMatched: false},{img: monsterTwo, isActive: false, isMatched: false},
  {img: monsterThree, isActive: false, isMatched: false},{img: monsterFour, isActive: false, isMatched: false},{img: monsterFive, isActive: false, isMatched: false},
  {img: monsterSix, isActive: false,isMatched: false},{img: monsterOne, isActive: false, isMatched: false},{img: monsterTwo, isActive: false , isMatched: false},
  {img: monsterThree, isActive: false, isMatched: false},{img: monsterFour, isActive: false, isMatched: false},{img: monsterFive, isActive: false, isMatched: false},
  {img: monsterSix, isActive: false, isMatched: false}]

const [cards, setCards] = React.useState(defaultCards)
const [isGameFinished, setIsGameFinished] = React.useState(false)

 
  const [matches, setMatches] = React.useState(0)
  const [time, setTime] = React.useState(0)
  const [timeFinished, setTimeFinished] = React.useState(false)
  let activeCards = cards.filter((card)=> card.isActive === true && card.isMatched === false)

function shuffleCards(){
  defaultCards.sort(() => Math.random() - 0.5);
  setCards(defaultCards)
}

React.useEffect(() => { shuffleCards()}, [])
React.useEffect(() => { if(matches === 6){
  setIsGameFinished(true)
}
}, [ matches])


const handleCardClick = (idx: number) => {
  if(time === 0) {alert('please, select time') 
  return;
}
const newCards = [...cards]

if(activeCards.length < 2)
 newCards[idx].isActive = true
 setCards( newCards)
}
React.useEffect(() => { if(timeFinished){
  alert("time is finished!!!")
}}, [timeFinished])



React.useEffect(() => {
  let newCards = [...cards]
  let lastActiveCards = newCards.filter((card) => card.isActive === true && card.isMatched === false)
  const firstActiveCard = lastActiveCards[0]
  const secondActiveCard = lastActiveCards[1]

  const timeoutID = window.setTimeout(() => {
     if(lastActiveCards.length === 2){
      const areCardEquals = firstActiveCard.img === secondActiveCard.img 

      lastActiveCards.forEach((card) => {
        if(!areCardEquals){
          card.isActive = false
        }else{
        setMatches(prev => prev + 0.5)
        card.isActive = true
        card.isMatched = true
     }})
       setCards(newCards)
    }
}, 600);

return () => window.clearTimeout(timeoutID );
}, [cards])

const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setTime(+event.target.value);
};

const restartGame = () => {
setCards(defaultCards)
setTime(0)
setMatches(0)
setIsGameFinished(false)
shuffleCards()
}

 
  return (
    <div className="App">
      <TopContainer>
      {time > 0 &&<RestartContainer onClick={restartGame}><div>RESTART GAME</div></RestartContainer>}
      <h2>Time: <select onChange={handleTimeChange} value={time}><option value={0}>Select Time</option><option value={1}>1 minutes</option><option value={3}>3 minutes</option><option value={5}>5 minutes</option><option value={10}>10 minutes</option></select></h2>
      <h2>Matches: {matches}/6</h2>
      </TopContainer>
      {time > 0 && <CountDownContainer><CountdownTimer isGameFinished={isGameFinished} minutes={time} isTimeFinished={setTimeFinished}/></CountDownContainer>}
      <Board>
        {cards && cards.map((card, idx) => <CardContainer key={idx} onClick={() =>handleCardClick(idx)} src={card.isActive ? card.img : questionMark}>
          </CardContainer>)}
      </Board>   
    </div>
  );
}

export default App;
