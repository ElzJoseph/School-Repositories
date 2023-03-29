import "./main_section.css"
import React, {useState, useEffect} from "react"

export default function MainSection(props){

    
    const [state, setState] = useState({
        words : [
                    "spider", 
                    "lion", 
                    "rat", 
                    "tiger", 
                    "cheeta", 
                    "shark", 
                    "gorilla", 
                    "ox", 
                    "camel", 
                    "chameleon", 
                    "dog"
        ],
        manstate : [
            "https://cdn.discordapp.com/attachments/586122410613276681/1086974923945287730/hangmanempty.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465370584731668/pixil-frame-0.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465417409925210/pixil-frame-0_1.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465435537715290/pixil-frame-0_3.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465475526213674/pixil-frame-0_4.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465497206566922/pixil-frame-0_5.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465547810832424/pixil-frame-0_6.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465598448676884/pixil-frame-0_7.png",
            "https://cdn.discordapp.com/attachments/967656993991041094/1088465624025530419/pixil-frame-0_8.png"
        ],
        manstateindex : 0,
        respondArray : ["Your guess is correct!", "Incorrect!", "You Lose", "Winner", "Valid response required"],
        respondText : "Guess the animal",
        word : [],
        remainingLetters : "",
        attemptarray : [],
        answerarray : "",
        guess : "",
        chances : 7,
        vissible : "block",
    });

    function choseRandomWord(word) {
        return word[Math.floor(Math.random() * word.length)]
    }

    function reject(currentchance, manindex){
        currentchance = currentchance - 1;
        manindex = manindex + 1;
        if (state.chances < 1){
            setState({
                ...state,
                guess : "",
                respondText : state.respondArray[2] + ` The answer was ${state.word.toUpperCase()}.`,
                manstateindex : manindex,
                vissible : "none",
            })
        } else {
            setState({
                ...state,
                guess : "",
                respondText : state.respondArray[1],
                chances : currentchance,
                manstateindex : manindex,
            })
        }
    }

    function calculateLength(word){
        return word.length
    }

    function validate(word, amount, response, array){
        for (var i in word) {
            if (word[i].includes(response)){
                amount = amount - 1;
                array[i] = " " + response + " ";
                if (amount === 0) {
                    setState({
                        ...state,
                        guess : "",
                        respondText : state.respondArray[3],
                        remainingLetters : amount,
                        vissible : "none",
                    })
                } else {
                    setState({
                        ...state,
                        guess : "",
                        respondText : state.respondArray[0],
                        remainingLetters : amount,
                    })
                }
            }
        } 
    }

    function startSession(){
        const word = choseRandomWord(state.words);
        const length = calculateLength(word);
        const array = setupAnswer(word);

        setState({
            ...state,
            word : word,
            remainingLetters : length,
            attemptarray : array,
        })
        return [word, length, array]

    }

    function updateResponse(event){
        setState({
            ...state,
            guess : event.target.value
        })
    }

    function setupAnswer(word) {
        let temparray = [];
        for (var i=0; i < word.length; i++){
            temparray[i] = " _ ";
        }
        return temparray;
    }
    
    function inputcheckResponse(event) {

        let response = state.guess.toUpperCase();
        let locword = state.word.toUpperCase().split("");
        let locarray = state.attemptarray;
        let locremain = state.remainingLetters;
        let newchances = state.chances;
        let manindex = state.manstateindex;

        if (event.key === "Enter") {

            let respondValid = locword.includes(response);

            if (respondValid === true) {

                validate(locword, locremain, response, locarray); 
            } else {

                reject(newchances, manindex)

            }

        }

    }

    function buttoncheckResponse(){

        let response = state.guess.toUpperCase()
        let locword = state.word.toUpperCase().split("")
        let locarray = state.attemptarray
        let locremain = state.remainingLetters
        let newchances = state.chances;
        let manindex = state.manstateindex;
        
        let respondValid = locword.includes(response);

        if (respondValid === true) {

            validate(locword, locremain, response, locarray);

        } else {

            reject(newchances, manindex)

        }

    }

    useEffect(() => {
        startSession();
    }, [])

    return (
        <div className="container">
            <h2>Hangman</h2>
            <br></br>
            <img src={state.manstate[state.manstateindex]}></img>
            <br></br>
            <h1>{state.attemptarray}</h1>
            <br></br>
            <input
                style={{
                    'display' : state.vissible
                }} 
                type="text" 
                value={state.guess}
                placeholder="" 
                onChange={updateResponse} 
                onKeyPress={inputcheckResponse}
            />
            <br></br>
            <button onClick={buttoncheckResponse} style={{ 'display' : state.vissible }}>Submit</button>
            <br></br>
            <p>Guesses: {state.chances}</p>
            <br></br>
            <p>{state.respondText}</p>
      </div>


}