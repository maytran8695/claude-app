import articles from "../articleRegistry";

export default function Sidebar({onSelect}){

    const groups={};

    articles.forEach(a=>{

        if(!groups[a.category]){

            groups[a.category]=[];

        }

        groups[a.category].push(a);

    });

    return (

        <div style={{
            width:280,
            overflow:"auto",
            borderRight:"1px solid #ddd",
            padding:20
        }}>

            <h2>Knowledge Hub</h2>

            {

                Object.entries(groups).map(([category,list])=>(

                    <div key={category}>

                        <h3>{category}</h3>

                        {

                            list.map(article=>(

                                <p
                                    key={article.slug}
                                    style={{cursor:"pointer"}}
                                    onClick={()=>onSelect(article)}
                                >

                                    {article.title}

                                </p>

                            ))

                        }

                    </div>

                ))

            }

        </div>

    );

}