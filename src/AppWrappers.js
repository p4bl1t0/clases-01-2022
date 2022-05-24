import App from "./App";
import AuthContextProvider from "./components/context/AuthContextProvider";

// REVIEW: 4. por qué tengo que wrappear?
export default function AppWrappers () {
    return (
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    )
}