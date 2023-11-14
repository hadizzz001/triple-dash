
"use client"
import Link from "next/link";
import React, { useState } from "react"; 
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";




    async function getData() {
        const res = await fetch("http://localhost:3000/api/order");
        if (!res.ok) {
            throw new Error("Failed to fetch data")
        }
        return res.json(); 
 
    } 







const page = async () => {  
    const { push } = useRouter();

 
    const handleDeletePost = (id) => {

        const confirmed = window.confirm('Are you sure you want to delete?');

        if (confirmed) {
            axios
            .delete(`/api/order/${id}`)
            .then((res:any) => {
                console.log(res);
            })
            .catch((err:any) => {
                console.log(err);
            })
            .finally(() => { 
                push("/reservation");
            }); 
        } else {  }
        
    }

    const posts = await getData();
 

        process.on('uncaughtException', function (err) {
            console.log("errrrrrrrrrrrrrrrrrrrrrrrrrr");
            console.log(err);
        }); 






    return (
        <>
        <Link href='/dashboard'>
          <button type="button" className="text-white rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2" style={{background:"#6c3429"}}>
          <img src="https://res.cloudinary.com/dixtwo21g/image/upload/v1699388330/next/dmhmwrpyxkjzjzk5iurq.png" width={14} style={{ color: "white" }} alt="" />
          </button>
          Return Home
        </Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Type</th>
                        <th scope="col">Message</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        posts.map((post: any, index: any) => (
                            <tr>
                                <td>{index+1}</td>
                                <td>{post.firstname}</td>
                                <td>{post.lastname}</td>
                                <td>{post.email}</td>
                                <td>{post.phone}</td>
                                <td>{post.type}</td>
                                <td>{post.message}</td>
                                <td><button onClick={() => handleDeletePost(post.id)} className="text-red-700 mr-3">Delete</button></td> 
                            </tr>
                        ))
                    }
 
                </tbody>
            </table>
        </>

    )
}

export default page