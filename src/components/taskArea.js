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

    const handleShowButton = ()=>{
        if(!showButtons){
            setShowButtons(true)
        } 
    }
    const setPriorityMax = async(id)=>{
        let res = await api.put(`/${id}`, {priority: 1})
        setShowButtons(false)
        setTimeout(()=>getChecklists(), 300)
    }
    const setPriorityMid = async(id)=>{
        let res = await api.put(`/${id}`, {priority: 2})
        setShowButtons(false)
        setTimeout(()=>getChecklists(), 300)
    }
    const setPriorityMin = async(id)=>{
        let res = await api.put(`/${id}`, {priority: 3})
        setShowButtons(false)
        setTimeout(()=>getChecklists(), 300)
    }
    const setPriorityNone = async(id, priority)=>{
        if(priority == 4){
            setShowButtons(false)
        }else{
            let res = await api.put(`/${id}`, {priority: 4})
            setShowButtons(false)
            setTimeout(()=>getChecklists(), 300)
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
                                {item.priority == 4 &&
                                    <> 
                                        <div className={`priorityIcons`} style={{width: showButtons ? '0px' : '50px'}}
                                            onClick={handleShowButton}>
                                            <PriorityHighIcon/>
                                        </div>
                                        
                                        <div className={`priorityIcons`} style={{width: showButtons ? '120px' : '0px'}}>
                                            <PriorityHighIcon onClick={()=>setPriorityNone(item._id, item.priority)}/>
                                            <PriorityHighIcon style={{color: 'red'}} onClick={()=>setPriorityMax(item._id)}/>
                                            <PriorityHighIcon style={{color: 'yellow'}}onClick={()=>setPriorityMid(item._id)}/>
                                            <PriorityHighIcon style={{color: 'green'}}onClick={()=>setPriorityMin(item._id)}/>    
                                        </div>
                                    </> 
                                }
                                {item.priority == 3 &&
                                    <> 
                                        <div className={`priorityIcons`} style={{width: showButtons ? '0px' : '50px'}}
                                            onClick={handleShowButton}>
                                            <PriorityHighIcon style={{color: 'green'}}/>
                                        </div>
                                        
                                        <div className={`priorityIcons`} style={{width: showButtons ? '120px' : '0px'}}>
                                            <PriorityHighIcon onClick={()=>setPriorityNone(item._id)}/>
                                            <PriorityHighIcon style={{color: 'red'}} onClick={()=>setPriorityMax(item._id)}/>
                                            <PriorityHighIcon style={{color: 'yellow'}}onClick={()=>setPriorityMid(item._id)}/>
                                            <PriorityHighIcon style={{color: 'green'}}onClick={()=>setPriorityMin(item._id)}/>    
                                        </div>
                                    </>
                                }
                                {item.priority == 2 &&
                                    <> 
                                        <div className={`priorityIcons`} style={{width: showButtons ? '0px' : '50px'}}
                                            onClick={handleShowButton}>
                                            <PriorityHighIcon style={{color: 'yellow'}}/>
                                        </div>
                                        
                                        <div className={`priorityIcons`} style={{width: showButtons ? '120px' : '0px'}}>
                                            <PriorityHighIcon onClick={()=>setPriorityNone(item._id)}/>
                                            <PriorityHighIcon style={{color: 'red'}} onClick={()=>setPriorityMax(item._id)}/>
                                            <PriorityHighIcon style={{color: 'yellow'}}onClick={()=>setPriorityMid(item._id)}/>
                                            <PriorityHighIcon style={{color: 'green'}}onClick={()=>setPriorityMin(item._id)}/>    
                                        </div>
                                    </>
                                }
                                {item.priority == 1 &&
                                    <> 
                                        <div className={`priorityIcons`} style={{width: showButtons ? '0px' : '50px'}}
                                            onClick={handleShowButton}>
                                            <PriorityHighIcon style={{color: 'red'}}/>
                                        </div>
                                        
                                        <div className={`priorityIcons`} style={{width: showButtons ? '120px' : '0px'}}>
                                            <PriorityHighIcon onClick={()=>setPriorityNone(item._id)}/>
                                            <PriorityHighIcon style={{color: 'red'}} onClick={()=>setPriorityMax(item._id)}/>
                                            <PriorityHighIcon style={{color: 'yellow'}}onClick={()=>setPriorityMid(item._id)}/>
                                            <PriorityHighIcon style={{color: 'green'}}onClick={()=>setPriorityMin(item._id)}/>    
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