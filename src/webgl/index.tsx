import { Unity, useUnityContext } from "react-unity-webgl";
import type PongGame from "~/routes/pong-game";

const PongGameWebGLBuild = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/webgl/PongGameWebGL.loader.js",
    dataUrl: "build//webgl/PongGameWebGL.data.unityweb",
    frameworkUrl: "build/webgl/PongGameWebGL.framework.js.unityweb",
    codeUrl: "build/webgl/PongGameWebGL.wasm.unityweb",
  });

  return (
    <div>
        <Unity unityProvider={unityProvider} />
    </div>
  );
}

export default PongGameWebGLBuild;