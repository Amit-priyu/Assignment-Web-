import { useMemo, useState } from "react";

// In this assignment, your task is to create a component that performs an expensive calculation (finding the factorial) based on a user input. 
// Use useMemo to ensure that the calculation is only recomputed when the input changes, not on every render.

export function Assignment1() {
    const [input, setInput] = useState(0);


    // Your solution starts here
    // let expensiveValue = 1;
    // // writing the hard code using for loop..
    // for(let i=1; i<=input; i++){
    //     expensiveValue=expensiveValue*i;
    // }

    // so , whatever the hard code we have written we have to wrap up into use memo
    const expensiveValue=useMemo(()=>{
        // here we have to write the solution.. now
        let ans=1;
        for(let i=1; i<=input; i++){
            ans=ans*i;
        }
        return ans;
    },[input]);
    // Your solution ends here

    return (
        <div>
            <input 
                type="number" 
                value={input} 
                onChange={(e) => setInput(Number(e.target.value))} 
            />
            <p>Calculated Value: {expensiveValue}</p>
        </div>
    );
}