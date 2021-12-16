import './taskArea.css';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import './task.css'
import api from "../api";
import { useEffect, useState } from "react";



const TaskArea = () => {

    const [titleField, setTitleField] = useState('');
    const [checklists, setChecklists] = useState([]);
    const [priority, setPriority] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [wOn, setWOn] = useState('on');
    const [wOff, setWOff] = useState('off');

    
    


    const getChecklists = async () => {
        setChecklists([])
        let res = await api.get('/');
        let json = res.data;
        setChecklists(json)
    }
    
    const sendTitle = async (e) => {
        e.preventDefault()

        let res = await api.post('/', {
            title: titleField
        })
        let json = res.data
        setTitleField('')
        getChecklists();
    }

    const removeTask = async(id)=>{
        let res = await api.delete(`/${id}`)
        let json = res.data;
        getChecklists()
        
    }

    const deleteAll = async()=>{
        let res = await api.delete('/')
        getChecklists()
    }

    const handleDone = async(done, id)=>{
        if(done == false){
            let res = await api.put(`/${id}`, {done: true})
            getChecklists()
        }else{
            let res = await api.put(`/${id}`, {done: false})
            getChecklists()
        }
    }

    const handlePriority = async(id, priority)=>{
        if(showButtons){
            setShowButtons(false)
        }else{
            setShowButtons(true)
        }
        
        
    }


    useEffect(() => {
        getChecklists()
    }, [])

    return (
        <div className="taskArea">
            <div className="add">
                <form onSubmit={sendTitle}>
                    <div className="addInput">
                        <input type='text' placeholder='O que temos para fazer hoje?' value={titleField} onChange={e => setTitleField(e.target.value)} />
                        <div className="addIcon" onClick={sendTitle}><AddIcon /></div>
                    </div>
                </form>
            </div>
            <div className="day">
                <p>Today</p>
                <div className='line'></div>
            </div>
            <div>
                {checklists.map((item, index) => (
                    <div className='task' key={index}  >
                        {item.done == true && 
                            <>  
                                <p onClick={()=>handleDone(item.done, item._id)}><del>{item.title}</del></p>
                                <div className='removeButton' onClick={()=>removeTask(item._id)}>
                                    <DeleteIcon />
                                </div>
                            </>
                        }
                        {item.done == false &&
                            <>      
                                        {!showButtons &&
                                            <>
                                                <div className={`priorityIcons-${wOn}`} onClick={()=>handlePriority(item._id, item.priority)}>
                                                    <PriorityHighIcon/>
                                                </div>
                                                
                                                <div className={`priorityIcons-${wOff}`}>
                                                    <PriorityHighIcon style={{color: 'red'}}/>
                                                    <PriorityHighIcon style={{color: 'yellow'}}/>
                                                    <PriorityHighIcon style={{color: 'green'}}/>
                                                    
                                                </div>
                                            </>
                                        }
                                        {showButtons &&
                                            <>
                                                <div className={`priorityIcons-${wOff}`} onClick={()=>handlePriority(item._id, item.priority)}>
                                                    <PriorityHighIcon/>
                                                </div>
                                                
                                                <div className={`priorityIcons-${wOn}`} onClick={()=>handlePriority(item._id, item.priority)}>
                                                    <PriorityHighIcon style={{color: 'red'}}/>
                                                    <PriorityHighIcon style={{color: 'yellow'}}/>
                                                    <PriorityHighIcon style={{color: 'green'}}/>
                                                    
                                                </div>
                                            </>
                                        }
                                        
                                        
                                    
                                        
                                    <p onClick={()=>handleDone(item.done, item._id)}>{item.title}</p>
                                    <div className='removeButton' onClick={()=>removeTask(item._id)}>
                                        <DeleteIcon />
                                    </div>
                            </>
                        }
                    </div>
                ))}
            </div>
            <div className="deleteAll" onClick={deleteAll}>Apagar tudo</div>
        </div>
    )

}

export default TaskArea;