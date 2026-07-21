import {Form,Button} from "react-bootstrap";
import {useState} from "react";


const ExpenseForm=({onAddExpense})=>{
    const [money,setMoney]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    

    const submitHandler=async (e)=>{
        e.preventDefault();
      const expense={
        money,description,category
      }
    
      try{
        const response=await fetch("https://advanced-expense-tracker-5cd9d-default-rtdb.firebaseio.com/expense.json",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(expense)
            }
        )
        const data=await response.json();
        if(!response.ok){
            throw new Error(data.error.message)
        }
        onAddExpense({
            ...expense,
            id : data.name,
        })

      }catch(err){
      alert(err.message);
      }

   

    }

    return (
     
        <Form className="d-flex flex-column m-5" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="money">Money(Price)</Form.Label>
          <Form.Control
            id="money"
            type="number"
            placeholder="enter price"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="description">Description</Form.Label>
          <Form.Control
            id="description"
            type="text"
            placeholder="enter description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            required
          />
        </Form.Group>

       <Form.Group className="mb-3">
       <Form.Label htmlFor="category">Category</Form.Label>
        <Form.Select
         value={category}
         id="category"
         onChange={(e) => setCategory(e.target.value)}
         required
         >
         <option value="">Select Category</option>
         <option value="Food">Food</option>
         <option value="Travel">Travel</option>
         <option value="Shopping">Shopping</option>
         <option value="Bills">Bills</option>
         </Form.Select>
         </Form.Group>

          <Button className="mb-3" type="submit">Submit</Button>
        

        </Form>
        
      
      
        
    )



}
export default ExpenseForm;