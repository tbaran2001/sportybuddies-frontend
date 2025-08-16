import {Button} from '@mui/material';
import {NavLink} from 'react-router-dom';

export interface PageItem {
    name: string;
    path: string;
}

interface NavPagesButtonsProps {
    pages: PageItem[];
    onClose?: () => void;
}

export const NavPagesButtons = ({pages, onClose}: NavPagesButtonsProps) => {
    return (
        <>
            {pages.map((page) => (
                <Button
                    key={page.name}
                    component={NavLink}
                    to={page.path}
                    onClick={onClose}
                    sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        '&.active': {
                            fontWeight: 'bold',
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {page.name}
                </Button>
            ))}
        </>
    );
};
