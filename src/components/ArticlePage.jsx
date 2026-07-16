import { useEffect, useState } from "react";

export default function ArticlePage({ loader }) {

    const [Component,setComponent]=useState(null);

    useEffect(()=>{

        loader().then(module=>{

            setComponent(()=>module.default);

        });

    },[loader]);

    if(!Component){

        return <h2>Loading...</h2>;

    }

    return <Component/>;

}