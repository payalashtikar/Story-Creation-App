import { Col, Row } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { icons } from 'antd/es/image/PreviewGroup';
import { Link } from 'react-router-dom';

const StoryDisplay = () => {
    const [data, setData] = useState([]);

    async function fetchData() {
        try {
            const response = await axios.get("http://localhost:3883/getallstories")
            // console.log(response, 'response')
            return setData(response?.data?.stories)
        }
        catch (error) {
            console.error(error)
        }
    }
    // console.log(data, 'state')
    useEffect(() => {
        fetchData();
    }, [])


    //DELETING FUNCTION
    const deleteStory = async (id) => {
        let result = await fetch(`http://localhost:3883/detelestory/${id}`, {
            method: 'DELETE',
        });
        result = await result.json();
        return setData("deleted result :", result)
    }

    //EDITING FUNCTION
    // const editStory = async (id) => {
    //     let result = await fetch(`http://localhost:3030/editstory/${id}`, {
    //         method: "PUT",
    //     });
    //     result = await result.json();
    //     return setData("Edited result :", result)
    // }
    // <EditOutlined
    //     style={{ float: 'right', cursor: 'pointer', padding: '5px', marginBottom: "10px" }}
    //     onClick={() => editStory(data._id)}
    //  />
    return (
        <div className="StoryDisplay"
            style={{ padding: '5px', margin: '20px', width: '98%', }}
        >
            <i style={{ marginBottom: '5' }}>List of Stories</i>
            <div className='story-card' >
                {data && data.length > 0 && data.map((data, index) => {
                    return (
                        <div
                            style={{
                                width: '25%',
                                padding: '15px',
                                margin: '5px',
                                marginLeft: '',
                                background: 'whitesmoke',
                                alignItems: 'center',
                                display: 'inline-block',
                                verticalAlign: 'top'
                            }}
                        // icons={<DeleteOutlined />}
                        >
                            <div  >
                                <Link to={"/editstory/" + data._id}>
                                    <EditOutlined style={{ float: 'right', cursor: 'pointer', padding: '5px', marginBottom: "10px" }} />
                                </Link>
                                <DeleteOutlined
                                    style={{ float: 'right', cursor: 'pointer', padding: '5px', marginBottom: "10px" }}
                                    onClick={() => deleteStory(data._id)}
                                />
                            </div>
                            <div className='story-topic'>{data.topic}</div>
                            <div className='story-content'>{data.storyContent}</div>
                        </div>
                    )
                })}
            </div>
            <br></br>
        </div>
    )
}
export default StoryDisplay;
