/**
 * @author: Tejas Upmanyu (@tejasupmanyu)
 * App Component
 */
import React from 'react';
import './App.scss';
import addIcon from './assets/plus-icon.svg';
import { NewEntrySheet, IEntry } from './components/NewEntrySheet';
import { TaskList, TaskCard } from './components/TaskList'; 
import { storageKey } from './constants/constants';

const App: React.FC = () => {
    const [isEntrySheetOpen, setIsEntrySheetOpen] = React.useState(false);
    const [entries, setEntries] = React.useState<IEntry[]>([]);

    React.useEffect ( () => { 
        getTaskEntries();
    }, []);

    const openEntrySheet = () => {
        setIsEntrySheetOpen(true);
    };

    const closeEntrySheet = () => {
        setIsEntrySheetOpen(false);
    };

    const onAddEntry = (entry: IEntry) => {
        if (entries) {   
            const newTasks = [...entries, entry];
            storeEntries(newTasks);
        }
        else {
            storeEntries([entry]);
        }
        closeEntrySheet();
    };

    const getTaskEntries = () => {
        const entriesString = window.localStorage.getItem(storageKey);
        const entries = entriesString ? JSON.parse(entriesString) : [];
        setEntries(entries);
    };

    const storeEntries = (entries: IEntry[]) => {
        window.localStorage.setItem(storageKey, JSON.stringify(entries));
        getTaskEntries();  
    };

    const progress = () => {
        let currTime = 0;
        let totalTime = 480;
        let recentTime = 0;
        entries.forEach((entry: IEntry) => {
            currTime += parseInt(entry.hours) * 60 + parseInt(entry.minutes);
        });
        recentTime = (currTime / totalTime) * 100;
        recentTime = recentTime > 100 ? 100 : recentTime;
        if (currTime >= totalTime) {
            return { width: `${recentTime}%`, background: `rgb(35,174,124)`};
        }
        else if (currTime < 480 && currTime >= 240){
            return {width: `${recentTime}%`, background: `rgb(237,163,76)`};
        }
        else {
            return {width: `${recentTime}%`, background: `rgb(236,105,76)`};
        }
    };

    const OnDeleteCard = (id: number) => { 
        if (entries) {
            const filteredTask = entries.filter( (entry: IEntry) => entry.id !== id); 
            storeEntries(filteredTask);
        }
    };

    return (
        <div className="app-container">
            <h1>Timesheet</h1>
            <div className="progress-container">
                <div className="progress-bar" style={{ ...progress() }}></div>
            </div>
            <TaskList> 
                {entries.length > 0 ? (
                    entries.map((entry:IEntry,id) => (
                        <TaskCard  key={id} entry={entry} OnRemove={ () => OnDeleteCard(entry.id)}/>
                    ))
                ) : (
                    <p className="empty-text">No entries yet. Add a new entry by clicking the + button.</p>
                )}
            </TaskList>
            <button className="floating-add-entry-btn" onClick={openEntrySheet}>
                <img className="add-icon" src={addIcon} alt="add entry" />
            </button>
            {isEntrySheetOpen && <NewEntrySheet onClose={closeEntrySheet} onAdd={onAddEntry} />}
        </div>
    );
};

export default App;
