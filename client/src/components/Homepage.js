import React, { Fragment, useState } from "react";
import { Form, Input, Button, } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

const Homepage = () => {
    const [form] = Form.useForm();

    const Navigate = useNavigate();

    //CREATING STORY FUNCTION
    const onFinish = async (values) => {
        console.log("values : ", values);
        let result = await fetch("http://localhost:3883/createstory", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                topic: values.topic,
                storyContent: values.storyContent
            }),
        });
        result = await result.json();
        console.log("result :", result);
        if (result.error) {
            console.log(result.error)
        } else {
            form.resetFields();
        }
        Navigate('/story')
        return result
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div
            className="Homepage"
            style={{ padding: '5px', margin: '10px', width: '98%' }}
        >
            <h4>Create Your Story</h4>
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
                                Create
                            </Button>

                            <Button
                                style={{ width: "25%", padding: "5px", marginLeft: "10px" }}
                                htmlType="button"
                                onClick={() => form.resetFields()}
                            >
                                {" "}
                                Reset
                            </Button>
                        </Fragment>
                    )}
                </Form.Item>
            </Form>


        </div>
    );
};
export default Homepage;
