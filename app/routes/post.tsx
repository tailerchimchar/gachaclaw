import type {Route} from "./+types/post"

// it looks for action and loader in every single component
// loads diff parts of data from the app 
export async function loader({params}: Route.LoaderArgs){
    const postId = params.postId;
    return {postId};
}
// do some sort of action from the component 
export async function action(){}

export default function Post({loaderData}:Route.ComponentProps){
    return (
    <div>
        <p> 
            Post Id: {loaderData.postId}
        </p>
    </div>
    );
}