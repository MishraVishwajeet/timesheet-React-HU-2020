/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * NewEntrySheet Component - Renders action sheet for adding new entry.
 */
import * as React from 'react';
import './styles.scss';
import crossIcon from '../../assets/cross-icon.svg';
import { Button } from '../Button';
import { taskTypes } from '../../constants/constants';

interface INewEntrySheet {
    onClose: () => void;
    onAdd: (entry: IEntry) => void;
}

export interface IEntry {
    task: string;
    hours: string;
    minutes: string;
    remark: string;
    id: number;
}

export const NewEntrySheet: React.FC<INewEntrySheet> = (props: INewEntrySheet) => {
    const [task, setTask] = React.useState(taskTypes[0]);
    const [hours, setHours] = React.useState('');
    const [minutes, setMinutes] = React.useState('');
    const [remark, setRemarks] = React.useState('');

    const onTaskChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTask(event.target.value);
    };

    const onHoursChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHours(event.target.value);
    };

    const onMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinutes(event.target.value);
    };

    const onRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRemarks(event.target.value);
    }

    const onAddEntry = () => {
        const entry: IEntry = { task, hours, minutes, remark, id : Date.now()}; 
        props.onAdd(entry);
    };
    const onComplete = () => {
        return !(task && hours && minutes && remark);
    };

    return (
        <div className="new-entry-sheet">
            <div className="sheet-header">
                <div className="sheet-title">
                    <span className="title">Add New Entry</span>
                </div>
                <button className="close-sheet-btn" onClick={props.onClose} autoFocus>
                    <img src={crossIcon} alt="close" className="close-icon" />
                </button>
            </div>
            <div className="sheet-body">
                <div className="row">
                    <label className="task-input">
                        Task Type
                        <select className="task-select" onChange={onTaskChange} value={task}>
                            {taskTypes.map((task: string, index) => (   
                                <option value={task} key={index}>{task}</option>
                            ))}
                        </select>
                    </label>
                    <label className="time-input">
                        Time Spent
                        <div className="time-input-fields">
                            <div>
                                <input
                                    type="number"
                                    placeholder="hours"
                                    className="hour-input"
                                    onChange={onHoursChange}
                                    value={hours}
                                />
                                <span className="time-indicator">h</span>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="minutes"
                                    className="minute-input"
                                    onChange={onMinutesChange}
                                    value={minutes}
                                />
                                <span className="time-indicator">m</span>
                            </div>
                        </div>
                    </label>
                    
                </div>
                <div className="row">
                    <label className="remarks-field">
                        Remarks
                        <input type="text"
                         placeholder="Remarks" 
                         className="remarks-input"
                         onChange={onRemarksChange} 
                         value={remark}
                         />
                    </label>
                </div>
            </div>
            <div className="sheet-footer">
                <div className="action-group">
                    <Button color="primary" onClick={onAddEntry} disabled={onComplete()} className="btn btn--primary">
                        Add Entry
                    </Button>
                </div>
            </div>
        </div>
    );
};
