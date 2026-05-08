import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { leadsAPI } from '../services/api';
import { Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];

const KanbanBoard = () => {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await leadsAPI.getLeads();
        const leads = response.data;
        
        // Group by status
        const initialColumns = STAGES.reduce((acc, stage) => {
          acc[stage] = leads.filter(lead => lead.status === stage);
          return acc;
        }, {});
        
        setColumns(initialColumns);
      } catch (err) {
        console.error('Failed to fetch leads for board');
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];
    
    // Move within same column
    if (startColumn === finishColumn) {
      const newItems = Array.from(startColumn);
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);

      setColumns({
        ...columns,
        [source.droppableId]: newItems,
      });
      return;
    }

    // Move to different column
    const startItems = Array.from(startColumn);
    const finishItems = Array.from(finishColumn);
    const [movedItem] = startItems.splice(source.index, 1);
    finishItems.splice(destination.index, 0, movedItem);

    setColumns({
      ...columns,
      [source.droppableId]: startItems,
      [destination.droppableId]: finishItems,
    });

    // Update status in backend
    try {
      await leadsAPI.updateStatus(draggableId, destination.droppableId);
    } catch (err) {
      console.error('Failed to update lead status');
      // Ideally revert UI state here on failure
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="fade-in" style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '2rem' }}>Pipeline Board</h1>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', flex: 1, paddingBottom: '1rem' }}>
          {STAGES.map(stage => (
            <div key={stage} style={{ minWidth: '300px', display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden' }}>
              <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{stage}</h3>
                <span className="badge" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                  {columns[stage]?.length || 0}
                </span>
              </div>
              
              <Droppable droppableId={stage}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ 
                      flex: 1, 
                      padding: '1rem', 
                      overflowY: 'auto',
                      backgroundColor: snapshot.isDraggingOver ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    {columns[stage]?.map((lead, index) => (
                      <Draggable key={lead.id.toString()} draggableId={lead.id.toString()} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              userSelect: 'none',
                              padding: '1rem',
                              margin: '0 0 1rem 0',
                              backgroundColor: 'var(--bg-tertiary)',
                              borderRadius: '8px',
                              border: '1px solid var(--border-color)',
                              boxShadow: snapshot.isDragging ? '0 10px 20px rgba(0,0,0,0.3)' : '0 2px 4px rgba(0,0,0,0.1)',
                              ...provided.draggableProps.style,
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                              <Link to={`/leads/${lead.id}`} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                                {lead.name}
                              </Link>
                              <span style={{ fontSize: '0.85rem', color: 'var(--status-won)', fontWeight: 600 }}>
                                LKR {lead.value?.toLocaleString() || 0}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                              {lead.company || 'No Company'}
                            </div>
                            
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                              {lead.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={12} /> Email</div>}
                              {lead.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={12} /> Phone</div>}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
