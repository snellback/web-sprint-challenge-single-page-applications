import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'

const yupForm = yup.object().shape({
    name: yup.string().required('name is required').min(2, 'name must be at least 2 characters'),
    size: yup.string().oneOf(['Small', 'Medium', 'Large']),
    special: yup.string(),
    cheese: yup.boolean(),
    pineapples: yup.boolean(),
    pepperoni: yup.boolean(),
    olives: yup.boolean(),
    instructions: yup.string(),
})

const defaultVal = {
    name: "",
    sauce: "",
    size: "",
    special: "",
    cheese: false,
    pineapples: false,
    pepperoni: false,
    olives: false,
    instructions: "",
}

export default function OrderForm() {
    

    const [isValid, setIsValid] = useState(true);

    const [form, setForm] = useState(defaultVal);

    const [errorState, setError] = useState({
        name: "",
        size: "",
        special: "",
        cheese: "",
        pineapples: "",
        pepperoni: "",
        instructions: "",
    })

    useEffect(() => {
        yupForm.isValid(form)
            .then(valid => {
            });
    }, [form]);


    const validate = (e) => {
        yup.reach(yupForm, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setError({
                    ...errorState,
                    [e.target.name]: ""
                })

            })
            .catch(error => {
                console.log(error.errors)
                setError({
                    ...errorState,
                    [e.target.name]: error.errors[0]
                })
            })
    };

    const onChange = e => {
        e.persist();
        validate(e)

        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value
        setForm({ ...form, [e.target.name]: value });
    };

    const onSubmit = e => {
        e.preventDefault();
        axios.post(`https://reqres.in/api/orders`, form)
            .then(res => { console.log('RES', res) })
            .catch(err => console.log(err.response));
        setForm(defaultVal)
    };

    return (
        <form id="pizza-form" onSubmit={onSubmit}>
            <label htmlFor='Name'>What is your name?</label>
                <input
                    id="name-input"
                    type='text'
                    name='name'
                    value={form.name || ""}
                    onChange={onChange}
                />
                {errorState.name.length > 1 ? <p className="error">{errorState.name}</p> : null}
            
                <p>
                <label htmlFor="toppings">Toppings</label>
                </p>
                <p>
                    <input
                        id="toppings"
                        type="checkbox"
                        checked={form.sauce}
                        onChange={onChange}
                        name="sauce"
                    />sauce
                    <input
                        id="toppings"
                        type="checkbox"
                        checked={form.cheese}
                        onChange={onChange}
                        name="cheese"
                    />cheese
                    <input
                        id="toppings"
                        type="checkbox"
                        checked={form.pepperoni}
                        onChange={onChange}
                        name="pepperoni"
                    />pepperoni
                    <input 
                        id="toppings"
                        type="checkbox"
                        checked={form.meat}
                        onChange={onChange}
                        name="meat"
                    />meat

                </p>
                <p><label htmlFor="size-dropdown">Pick your size!! </label>
                    <select 
                    id="size-dropdown" 
                    name="size" 
                    value={form.size} 
                    onChange={onChange}>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </p>

                <p><label htmlFor="instructions">Special Instructions: </label>
                    <textarea
                        name="instructions"
                        id="special-text"
                        value={form.instructions}
                        onChange={onChange}
                    /></p>

                <button 
                name="order-button" 
                id="order-button" 
                type="submit">
                    Place Order
                </button>
        </form>
    )
}