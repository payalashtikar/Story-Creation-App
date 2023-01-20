import React, { Fragment, useState, } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Form, Input, Button, } from "antd";
const { TextArea } = Input;
// /editstory/:id

const UpdateStory = () => {
    const [form] = Form.useForm();
    const params = useParams();
    const Navigate = useNavigate();

    const onFinish = async (values) => {
        let result = await fetch(`http://localhost:3883/editstory/${params.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topic: values.topic,
                storyContent: values.storyContent,
            })
        })
        result = await result.json();
        console.log(result)
        if (result.error) {
            console.log(result.error)
            // Navigate('/')
        } else {
            Navigate('/story')
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log("update story Failed", errorInfo)
    }

    return (
        <div
            className="Homepage"
            style={{ padding: '5px', margin: '10px', width: '98%' }}
        >
            <h4>Update Your Story</h4>
            <Form
                form={form}
                name="basic"
                layout={"vertical"}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ width: '500px', padding: '5px', margin: '0 auto' }}
            >
                <Form.Item
                    label="Topic"
                    name='topic'>
                    <Input placeholder="Basic usage" />
                </Form.Item>

                <Form.Item
                    label="Story Content"
                    name='storyContent'>
                    <TextArea rows={4} />
                </Form.Item>

                <Form.Item shouldUpdate>
                    {() => (
                        <Fragment>
                            <Button
                                style={{ width: "25%", padding: "5px" }}
                                type="primary"
                                htmlType="submit"
                            >
                                Update
                            </Button>

                            <Link to={'/'}>
                                <Button
                                    style={{ width: "25%", padding: "5px", marginLeft: "10px" }}
                                    htmlType="button"
                                    onClick={() => form.resetFields()}
                                >
                                    {" "}
                                    Cancel
                                </Button>
                            </Link>

                        </Fragment>
                    )}
                </Form.Item>
            </Form>


        </div>
    )
}
export default UpdateStory;