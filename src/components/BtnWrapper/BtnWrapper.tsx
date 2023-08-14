import css from './BtnWrapper.module.scss';

import { FC, ReactNode } from 'react';

interface IBtnWrapperProps {
    children: ReactNode;
    // eslint-disable-next-line
    handler?: (e: any) => void;
    wrapperStyles?: object;
    // spanContent?: string;
    // spanStyles?: object;
}

const BtnWrapper: FC<IBtnWrapperProps> = ({
    wrapperStyles,
    handler,
    children,
    // spanStyles,
    // spanContent,
}) => {
    return (
        <div onClick={handler} className={css.btnWrapper} style={wrapperStyles}>
            {children}
            {/* <span style={spanStyles}>{spanContent}</span> */}
        </div>
    );
};
export default BtnWrapper;
