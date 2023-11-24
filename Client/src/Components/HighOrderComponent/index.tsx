import React, { useContext, } from 'react';
import { Context } from '../..';
import './index.scss';
import { observer } from 'mobx-react-lite';


const WrapperComponent = observer(({ children }: {
    children: React.ReactNode
}) => {
    const { store } = useContext(Context);
    return (
        <div className="wrapper">
            {store.isLoading &&
                <div className='loader-container'>
                    <span className='loader' />
                </div>
            }
            <div className="wrapper-container">
                {children}
            </div>
        </div>
    )

});
export default WrapperComponent;