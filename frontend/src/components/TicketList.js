import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const [sortBy, setSortBy] = useState(null);
    const [filterOptions, setFilterOptions] = useState({
        status: '',
        assignedTo: '',
        severity: '',
        type: '',
    });

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/api/support-tickets?sortBy=${sortBy || ''}&` +
                    `status=${filterOptions.status}&assignedTo=${filterOptions.assignedTo}&` +
                    `severity=${filterOptions.severity}&type=${filterOptions.type}`
                );
                //console.log(response.data);
                setTickets(response.data);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            }
        };

        fetchTickets();
    }, [sortBy, filterOptions]);

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleFilterChange = (field, event) => {
        setFilterOptions((prevOptions) => ({
            ...prevOptions,
            [field]: event.target.value,
        }));
    };

    return (
        <div className="card-container">
            <div className="top-container">
                <h1 style={{ textAlign: 'center' }} >All Tickets</h1>
                <label className='head'>
                    Sort By:
                    <select value={sortBy || ''} onChange={handleSortChange} className='pad'>
                        <option value="">None</option>
                        <option value="resolvedOn">Resolved On</option>
                        <option value="dateCreated">Date Created</option>
                        <option value="topic">Topic</option>
                    </select>
                </label>
                <h2>Filter By</h2>
                <label className='head'>
                    Status
                    <select value={filterOptions.status} onChange={(e) => handleFilterChange('status', e)} className='pad'>
                        <option value="">All</option>
                        <option value="New">New</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Resolved">Resolved</option>
                    </select>
                </label>
                <label className='head'>
                    Assigned To
                    {/* Add options based on your application's support agents */}
                    <select value={filterOptions.assignedTo} onChange={(e) => handleFilterChange('assignedTo', e)} className='pad'>
                        <option value="">All</option>
                        {/* <option value="agent1">Agent 1</option>
                    <option value="agent2">Agent 2</option>
                    Add more agents as needed */}
                    </select>
                </label>
                <label className='head'>
                    Severity
                    <select value={filterOptions.severity} onChange={(e) => handleFilterChange('severity', e)} className='pad'>
                        <option value="">All</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </label>
                <label className='head'>
                    Type
                    <select value={filterOptions.type} onChange={(e) => handleFilterChange('type', e)} className='pad'>
                        <option value="">All</option>
                        <option value="Technical">Technical</option>
                        <option value="Email Support">Email Support</option>
                        <option value="Software Support">Software Support</option>
                        <option value="Account Support">Account Support</option>
                        <option value="Hardware Support">Hardware Support</option>
                        {/* Add more types as needed */}
                    </select>
                </label>
           </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Topic</th>
                            <th>Description</th>
                            <th>Date Created</th>
                            <th>Severity</th>
                            <th>Type</th>
                            <th>Assigned To</th>
                            <th>Status</th>
                            <th>Resolved On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket._id}>
                                <td>{ticket.topic}</td>
                                <td>{ticket.description}</td>
                                <td>{new Date(ticket.dateCreated).toLocaleString()}</td>
                                <td>{ticket.severity}</td>
                                <td>{ticket.type}</td>
                                <td>{ticket.assignedTo ? ticket.assignedTo : 'Unassigned'}</td>
                                <td>{ticket.status}</td>
                                <td>
                                    {ticket.status === 'Resolved' && (
                                        <span>{new Date(ticket.resolvedOn).toLocaleString()}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
        </div>
       
        
    );
};

export default TicketList;
