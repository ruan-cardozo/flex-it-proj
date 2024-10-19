import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../CustomButton/CustomButton';
import Header from '../Header/Header';
import './LeftSideColumn.css';
import {
    bundleIcon,
    DumbbellFilled,
    DumbbellRegular
  } from "@fluentui/react-icons";
  
const DumbbellIcon = bundleIcon(DumbbellFilled, DumbbellRegular);

function LeftSideColumn() {

    const navigate = useNavigate();

    return (
        <div className="left-side-column">
            <div className="left-side-column-header">
            <Header style={{marginLeft: '10px'}} title='FlexIT'/>
            </div>
            <CustomButton onClick={() => {
                navigate(window.location.pathname = '/treinos');
            }} icon={<DumbbellIcon/>} about='Treinos'/>
        </div>
    );
}

export default LeftSideColumn;
