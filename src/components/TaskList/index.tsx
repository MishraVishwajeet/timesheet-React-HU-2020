/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * TaskList Component - Renders list of task cards of all the tasks entered in timesheet.
 */
import * as React from 'react';
import './styles.scss';
import { IEntry } from '../NewEntrySheet';
import crossIcon from '../../assets/cross-icon.svg';

interface ITaskListProps {
    children: any;
}
interface ITaskCardProps {
    entry: IEntry;
    OnRemove: (id: number) => void;
}

export const TaskList: React.FC<ITaskListProps> = (props: ITaskListProps) => {
    const { children } = props;
    return (
        <div className="task-list">
            {children}
        </div>
    );
};

export const TaskCard: React.FC<ITaskCardProps> = (props: ITaskCardProps) => {
    const {
        entry: { task, hours, minutes, remark, id }, 
        OnRemove,
    } = props;
    const OnDeleteCard = () => OnRemove(id); 
    return (
       
        
            <div className="task-card">
                <button className="remove-task-btn"  onClick={OnDeleteCard} autoFocus> {}
                    <img src={crossIcon} className="remove-task-icon" alt="remove task"/>
                </button>
                <div className="card-header">{}
                    <div className="task-title">{task}</div>
                    <div className="task-time">{`${hours}h ${minutes}m`}</div>
                    
                </div>
                <div className="card-body">
                    <p className="body-text">{remark}</p>
                </div>
                
                
            </div>
            
            
        
    );
};
