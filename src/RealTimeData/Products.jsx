import React, { useEffect, useState } from 'react'
import { get, onValue, push, ref, remove, set, update } from "firebase/database";
import { db } from '../RealTimeData/firebase';

const Product = () => {
    const [input, setInput] = useState()
    const [products, setProducts] = useState()
    const [id, setId] = useState()
    const [edit, setEdit] = useState(false)
    console.log(products)

    /*----------data add in fire basre----------*/

    useEffect(() => {
        const productRef = ref(db, 'products');
        onValue(productRef, (snapshot) => {
            const list = []
            snapshot.forEach((childSnapshot) => {
                const id = childSnapshot.key;
                const data = childSnapshot.val();
                const detail = { id, ...data }
                list.push(detail)
            })
            setProducts(list)
        })
    }, [])

    /*if { edited data aa section ma jse update thwa } else{data overwrite nai thai ane list ma bdha print thse te else ma jse}*/

    const handleSubmit = (e) => {
        e.preventDefault()
        if (edit && id) {
            setEdit(false)
            setInput({name : "", email : ""})
            const productRef = ref(db, `products/${id}`)
            update(productRef, input).then(() => {
                console.log('update...')
            })
        } else {
            const productRef = ref(db, 'products')
            const newRef = push(productRef)
            set(newRef, input)
            setInput({name : "", email : ""})
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    /*------------------------delete data ni process ahiya thi----------------*/

    const handleDelete = (id) => {
        const productRef = ref(db, `products/${id}`);
        remove(productRef).then(() => {
            console.log('success...')
        })
    }

    /*------------------------Edit data ni process ahiya thi----------------*/

    const handleEdit = (id) => {
        const productRef = ref(db, `products/${id}`);
        get(productRef).then((item) => {
            var data = item.val()
            setInput({ ...input, ...data })
            setId(id)
            setEdit(true)
        })
    }

    return (
        <>
            <center>
                <form onSubmit={handleSubmit}>
                    <h1>WELCOME TO FIRE BASE</h1>
                    <input type="text" value={input ? input.name : ''} name="name" onChange={handleChange} placeholder="enter your name" />
                    <br />
                    <input type="email" value={input ? input.email : ''} name="email" onChange={handleChange} placeholder="enter your email" />
                    <br />
                    <button>{edit ? 'UpDate' : 'Add data'}</button>
                </form>
            </center>

            <div className="container">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope='col'>ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col">EMAIL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products && products.map((item, id) => {
                                return (
                                    <tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <button className="bg-danger rounded text-light" onClick={() => handleDelete(item.id)}>Delete</button>
                                        <button className="bg-success rounded text-light my-2 mx-2" onClick={() => handleEdit(item.id)}>Edit</button>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Product