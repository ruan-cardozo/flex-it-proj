import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../CustomButton/CustomButton';
import Header from '../Header/Header';
import './LeftSideColumn.css';
import {
    AccessibilityRegular,
    bundleIcon,
    DumbbellFilled,
    DumbbellRegular,
    FoodAppleRegular,
    HomeRegular
  } from "@fluentui/react-icons";
import UserComponent from '../UserComponent/UserComponent';
  
const DumbbellIcon = bundleIcon(DumbbellFilled, DumbbellRegular);

function LeftSideColumn() {

    const navigate = useNavigate();

    return (
        <div className="left-side-column">
            <div className="left-side-column-header">
            <Header style={{marginLeft: '10px'}} title='FlexIT'/>
            </div>
            <CustomButton onClick={() => {
                navigate(window.location.pathname = '/inicio');
            }} icon={<HomeRegular />} about='Início'/>
            <br />
            <CustomButton onClick={() => {
                navigate(window.location.pathname = '/treinos');
            }} icon={<DumbbellIcon/>} about='Treinos'/>
            <br />
            <CustomButton onClick={() => {
                navigate(window.location.pathname = '/dietas');
            }} icon={<FoodAppleRegular />} about='Dietas'/>
            <br />
            <CustomButton onClick={() => {
                navigate(window.location.pathname = '/metricas');
            }} icon={<AccessibilityRegular />} about='Métricas'/>
            <div style={{ 
                marginTop: 'auto', 
                marginBottom: '12px',
                marginLeft: '15px'
                }}>
                <UserComponent color='white' />
            </div>
        </div>
    );
}

export default LeftSideColumn;
