import { useState } from "react";

import Sidebar from "./components/Sidebar";

import ArticlePage from "./components/ArticlePage";

export default function App(){

    const [selected,setSelected]=useState(null);

    return(

        <div style={{

            display:"flex",

            height:"100vh"

        }}>

            <Sidebar onSelect={setSelected}/>

            <div style={{

                flex:1,

                overflow:"auto",

                padding:30

            }}>

                {

                    selected

                    ?

                    <ArticlePage loader={selected.loader}/>

                    :

                    <h1>Select an article</h1>

                }

            </div>

        </div>

    );

}