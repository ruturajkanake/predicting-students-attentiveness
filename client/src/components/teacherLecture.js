import React from 'react';

class TeacherSubject extends React.Component {
    render(){
        return (
            <>
                {this.props.location.data.id}
            </>
        )
    }
}

export default TeacherSubject;