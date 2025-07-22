import PageContent from "../components/PageContent.tsx";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import MainNavigation from "../components/MainNavigation.tsx";

interface ErrorData {
    message: string;
}

const ErrorPage = () => {
    const error = useRouteError();

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (isRouteErrorResponse(error)) {
        if (error.status === 500) {
            const data = error.data as ErrorData;
            message = data.message;
        }
        if (error.status === 404) {
            title = 'Not found!';
            message = 'Could not find resource or page.';
        }
    }

    return (
        <>
            <MainNavigation/>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage;