import type {ReactNode} from "react";

interface PageContentProps{
    title?: string;
    children?: ReactNode;
}

const PageContent= ({title, children}:PageContentProps) => {
    return(
        <div>
            <h1>{title}</h1>
            {children}
        </div>
    )
}

export default PageContent;