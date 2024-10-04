
import Button from '../Button/Button';
import './LeftSideColumn.css';
import Icon from '../../assets/dumbbell.svg';

function LeftSideColumn() {

    return (
        <div className="left-side-column">
            <div className="left-side-column-header">
                <h1>FlexIT</h1>
            </div>
            <div className="left-side-column-content">
                <Button onClick={() => console.log('clicked')} text='Treinos' icon={Icon}/>
            </div>
        </div>
    );
}

export default LeftSideColumn;