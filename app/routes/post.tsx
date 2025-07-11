import { Form, Link, redirect, useFetcher, useNavigate, useNavigation } from "react-router";
import type {Route} from "./+types/post"

// example url that works: localhost:5173/post/3

// this is how to get data from a client
// it looks for action and loader in every single component
// loads diff parts of data from the app 
export async function clientLoader({params}: Route.LoaderArgs){
    const postId = params.postId;
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    return await res.json()
}

export async function loader({params}: Route.LoaderArgs){
    
    // an example of how to get info and store inside a db 
    //const product = await db.getProduct(params.id)
    return 0
}

// do some sort of action from the component 
// this action is for mutating, get, post, etc.
// client runs on server only 
export async function clientAction({params} : Route.ClientActionArgs){
    // test deleting the button
    try{
        await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`, {
            method: "DELETE"
        });
        return {isDeleted: true};
    }catch(err){
        return {isDeleted: false};
    }


    // redirects to home page 
    //return redirect("/");
}

export default function Post({loaderData}:Route.ComponentProps){
    const fetcher = useFetcher()
    const navigate = useNavigate()
    const navigation = useNavigation()
    const isNavigating = Boolean(navigation.location)
    if(isNavigating){
        return <p> Navigating...</p>
    }
    const isDeleting = fetcher.state!== "idle";
    const isDeleted = fetcher.data?.isDeleted; // accesses isDeleted 
    return (
    // need to use navigate in order to switch between webpages. 
    // can only use redirect in action/loader components

    <div>
        {!isDeleted && (
        <>
        <p> Title: {loaderData.title} </p>
        <p> Body: {loaderData.body}</p>
        </>
        )}
        
        <Link to = "/about"> About </Link>
        <button onClick={()=> navigate("/")}> Redirect</button>
        <fetcher.Form method="delete">
            <button type = "submit"> Delete</button>
        </fetcher.Form>

        {isDeleting && <p> Deleting post...</p>}
    </div>
    );
}