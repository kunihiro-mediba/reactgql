import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { FC } from "react";
import { createRoot } from "react-dom/client";

import { NoticeList } from "./components/notice";

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(),
});

const App: FC = () => {
    return (
        <ApolloProvider client={client}>
            <NoticeList />
        </ApolloProvider>
    );
};

const container = document.getElementById("container");
if (container) {
    createRoot(container).render(<App />);
}
