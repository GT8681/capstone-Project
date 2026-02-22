import React from "react";


const RoleBadge = ({ role }) => {
    const roleColors = {
        ATT: '#ff4d4f',
        CEN: '#52c41a',
        DIF: '#faad14',
        POR: '#ABCDEF'
    }

    const badgeSyle = {
        background: roleColors[role] || '#d9d9d9',
        color: 'white',
        padding: '4px 8px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '12px',
        marginRight: '5px'
    }
    return (
        <span style={badgeSyle}>
            {role}
        </span>
    )

}
export default RoleBadge
